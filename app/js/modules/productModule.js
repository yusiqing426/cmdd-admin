'use strict'

var productModule = angular.module('productModule', ['ngTable', 'checklist-model'])

productModule.controller('productListController', [ '$http','$scope', 'ProductService', 'ngTableParams', '$filter','DataUtilService','CategoryService','ImageService',
	function ($http,$scope, ProductService, ngTableParams, $filter,DataUtilService,CategoryService,ImageService) {						
		
	$scope.Is_EnableModel=DataUtilService.Is_EnableModel;
					
		CategoryService.list({},
			function(response){
				if(!response.code==200){
				alert('获取类别失败');
				return;
			}
			$scope.CategoryModel=response.msg;			
		})
						
		$scope.listFilter = {};
		/*处理解析图片*/

	$scope.getProductList = function(){
		ProductService.list().$promise.then(function (response) {
			/*是否需要封装装对象*/
    		$scope.dataUrlForepart=apiHost + '/image/';
  			
			$scope.tableParams = new ngTableParams(
					{
						page: 1,
						count: 25,
						sorting: {},
						filter: $scope.listFilter
					}, {
							total: 0,
							getData: function ($defer, params) {
								var filteredData = $filter('filter')(response.msg, $scope.listFilter);
								var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
								$scope.productList = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
								$scope.totalLength = sortedData.length
								params.total(sortedData.length)
								$defer.resolve($scope.product)
							}
						}
			)
		})
	}
	$scope.getProductList();

	$scope.deleteItem=function(itemId,index){
		console.log(ProductService);
		ProductService.delete({id:itemId},
			function(response){
				if(response.code!=200){
					alert("删除失败");
					return;
				}
				$scope.productList.slice(index,1);						
			},
			function(err){
				alert("--productListController--deleteItem-->err");
			}
		)	
	}

	$scope.change = function(item){
		$("#"+(item-1)).attr('disabled',false);
		$("#"+item).attr('type','hidden')
		$("#"+(item+1)).attr('type','button')
	}
	$scope.comfirmChange = function(item,product){
		$("#"+(item-2)).attr('disabled',true);
		$("#"+(item-1)).attr('type','button')
		$("#"+item).attr('type','hidden');

		var sort = $("#"+(item-2)).val();
		var productId = item -2;
		var product = {
						'id':productId,
						'sort':sort,
						'shop_id':localStorage.getItem('id')
						}	
		ProductService.update(product,
			function(response){
		        if(response.code!=200){
		        	alert(response.msg)
		        	location.reload()
					return;
		        }else{
					alert("修改成功")
		        }
		   	}
		) 
	}
			
}])

productModule.controller('productCreateController', [ '$http','$scope', '$location', 'ProductService','DataUtilService','CategoryService','ImageService',
function ($http,$scope, $location, ProductService,DataUtilService,CategoryService,ImageService) {

	$scope.YesNoModel  = DataUtilService.YesNoModel;

	$scope.addImage = function (files) {
    	ImageService.generateThumb(files[0])
    	$scope.imageFile = files[0]
    }

	CategoryService.list({},
		function(response){
			if(!response.code==200){
				alert('获取类别失败');
				return;
			}
			$scope.CategoryModel=response.msg;			
	})

	$scope.isPromotion = function(){
		if($scope.product.is_promotion==1){
			$("#promotion_price").attr("disabled",false);
		}else if($scope.product.is_promotion==0){
			$("#promotion_price").attr("disabled",true);
			$scope.product.promotion_price = "";
		}
	}

	$scope.isUseMemberPrice = function(){
		if($scope.product.isUseMemberPrice==1){
			$("#memberPrice").attr("disabled",false);
		}else if($scope.product.isUseMemberPrice==0){
			$("#memberPrice").attr("disabled",true);
			$scope.product.memberPrice = "";
		}
	}

	$scope.create = function () {
		var reg = /^\d+(\.\d+)?$/;
		if(!reg.test($scope.product.unit_price)){
			alert("菜品单价格式不正确")
			return;
		}
		if(!reg.test($scope.product.promotion_price)&&$scope.product.is_promotion==1){
			alert("促销价格式不正确")
			return;
		}
		if(!reg.test($scope.product.memberPrice)&&$scope.product.isUseMemberPrice==1){
			alert("会员价格式不正确")
			return;
		}
		//$scope.product.is_upload = syncStatus+1;
		ImageService.uploadImageToServer('/image', $scope.imageFile).then(
     	 	function(ress){
        		$scope.logo_id = ress.data.msg.image_id;
        		$scope.product.shop_id=localStorage.getItem("shop_id");
				$scope.product.logo_id = $scope.logo_id;
        		ProductService.create($scope.product,
		   			function(response){
		         		if(!response.code==200){
							alert(response.msg)
							return;
		         		}else{
							alert("创建成功")
		        			$location.path('/dataentry/product');
		         		}
	   				}
	   			)
        		
      		}
     	)
     	
	   
	}

}])

productModule.controller('productController',['$scope','$location','ProductService','$routeParams','DataUtilService','ImageService','CategoryService',
	function($scope,$location,ProductService,$routeParams,DataUtilService,ImageService,CategoryService){
	$scope.YesNoModel  = DataUtilService.YesNoModel;
	
	var imageChanged = false;
	
	var productId=$routeParams.id;
	ProductService.view({id:productId},function(response){
		/*product 集合形式构造 */
		$scope.product=response.msg;
		$scope.isPromotion();
		$scope.isUseMemberPrice();
		var img = {
    		'dataUrl': apiHost + '/image/' + $scope.product.logo_id
    	}
    	$scope.imageFile = img				
	})
	
	CategoryService.list({},
		function(response){
			if(!response.code==200){
				alert('获取类别失败');
				return;
			}
			$scope.CategoryModel=response.msg;			
	})

	$scope.isPromotion = function(){
		
		if($scope.product.is_promotion==1){
			$("#promotion_price").attr("disabled",false);
		}else if($scope.product.is_promotion==0){
			$("#promotion_price").attr("disabled",true);
			$scope.product.promotion_price = "";
		}
	}

	$scope.isUseMemberPrice = function(){
	
		if($scope.product.isUseMemberPrice==1){
			$("#memberPrice").attr("disabled",false);
		}else if($scope.product.isUseMemberPrice==0){
			$("#memberPrice").attr("disabled",true);
			$scope.product.memberPrice = "";
		}
	}

	var updateProduct = function(){
		var reg = /^\d+(\.\d+)?$/;
		if(!reg.test($scope.product.unit_price)){
			alert("菜品单价格式不正确")
			return;
		}
		if(!reg.test($scope.product.promotion_price)&&$scope.product.is_promotion==1){
			alert("促销价格式不正确")
			return;
		}
		if(!reg.test($scope.product.memberPrice)&&$scope.product.isUseMemberPrice==1){
			alert("会员价格式不正确")
			return;
		}
		ProductService.update($scope.product,
			function(response){
			        if(!response.code==200){
			        	alert(response.msg)
						return;
			        }else{
						alert("修改成功")
			        	$location.path('/dataentry/product');
			        }
		   	}
		) 		
	}
	
	/*处理解析图片*/
	$scope.addImage = function (files) {
    	ImageService.generateThumb(files[0]);
    	$scope.imageFile = files[0];
    	imageChanged= true;
    }		
	$scope.update=function(){
		if($scope.imageFile == null || imageChanged==false){			
			updateProduct();
			//if($scope.product.is_upload!=syncStatus+1){
			 //	$scope.product.is_upload = syncStatus+2;
			//}
		}else{		
			ImageService.uploadImageToServer('/image?id='+$scope.product.logo_id,$scope.imageFile).then(
					function(ress){
						$scope.product.logo_id = ress.data.msg.image_id;
						updateProduct();
					}
			)
		}
	}
}])

	





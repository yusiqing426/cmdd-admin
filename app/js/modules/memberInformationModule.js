'use strict'

var memberInformationModule = angular.module('memberInformationModule', ['ngTable', 'checklist-model'])

memberInformationModule.controller('memberInformationListController', [ '$scope','$location','staffInformationService','memberInformationService', 'ngTableParams', '$filter',
  function ($scope,$location, staffInformationService,memberInformationService,ngTableParams, $filter) {
  
    $scope.listFilter = {};
	$scope.phone = '';
	$scope.searchPhone = '';
	$scope.search = function(){
		$scope.searchPhone = $scope.phone;
	}

	var getMemberInformationList = function(){
		  memberInformationService.list({id: localStorage.getItem('shop_id')}).$promise.then(function (response) {
			
			$scope.tableParams = new ngTableParams({
				page: 1,
				count: 25,
				sorting: {},
				filter: $scope.listFilter
			  }, {
			  total: 0,
			  getData: function ($defer, params) {
				var filteredData = $filter('filter')(response.msg, $scope.listFilter);
				var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

				$scope.dataList = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
				$scope.totalLength = sortedData.length
				params.total(sortedData.length)
				$defer.resolve($scope.dataList)
			  }
			})
		  })
	}

	getMemberInformationList();

} ])


memberInformationModule.controller('memberInformationCreateController', [ '$scope', '$location', 'memberInformationService','DataUtilService',
  function ($scope, $location, memberInformationService,DataUtilService) {

  $scope.MaleOrFemale = DataUtilService.MaleOrFemale;
  $scope.OpenOrClose = DataUtilService.OpenOrClose;

  $scope.warnMessage = "";

    memberInformationService.memberCardList({id:localStorage.getItem('shop_id')},function(response){
      $scope.memberCardList = response.msg;
    })

   $('#datetimepicker1').datetimepicker({  
        format: 'yyyy-mm-dd',
		pickerPosition: "bottom-left",
		autoclose: true,
		language: 'zh-CN',
		minView: 2
    }); 

    $scope.create = function () {
        //$scope.member.sync_status = syncStatus + 1;
    	if ($scope.member.pay_password.length < 6) {


    		$scope.errorMessage = '密码至少6个字符'
      return
    }

    if ($scope.member.pay_password != $scope.member.confirm_password) {
      $scope.errorMessage = "两次输入的密码不一致"
      return
    }

	  $scope.member.balance = 0;
      $scope.member.shop_id = localStorage.getItem('shop_id');
        //$scope.member.sync_status = syncStatus + 1;
       memberInformationService.create($scope.member,
         function(response){
       			console.log(response)
               if(response.code!=200){

                 alert(response.msg)
                 $scope.warnMessage = response.msg;
               }else{
                $location.path('/memberDataentry/memberInformation/recharge/'+response.msg.member_id)
               }
          }
       )
    }

}])

memberInformationModule.controller('memberInformationController', [ '$scope', '$location', 'memberInformationService', '$routeParams','DataUtilService',
  function ($scope, $location, memberInformationService, $routeParams,DataUtilService) {
    $scope.MaleOrFemale = DataUtilService.MaleOrFemale;
    $scope.OpenOrClose = DataUtilService.OpenOrClose;
    var memberInformationId = $routeParams.id;
   $('#datetimepicker1').datetimepicker({  
        format: 'yyyy-mm-dd',
		pickerPosition: "bottom-left",
		autoclose: true,
		language: 'zh-CN',
		minView: 2
    }); 
    memberInformationService.memberCardList({id:localStorage.getItem('shop_id')},function(response){
      $scope.memberCardList = response.msg;
    })
    memberInformationService.view({id:memberInformationId},function(response){
      $scope.member=response.msg;
    })


    $scope.update=function(){

      memberInformationService.update($scope.member,
          function(response){
            if(response.code!=200){
              alert("更新失败");
            }
            alert("修改成功");
            $location.path("/memberDataentry/memberInformation");
          }
      )
      
    }

}])

memberInformationModule.controller('memberRechargeController', [ '$scope', '$location', 'memberInformationService', '$routeParams','DataUtilService','PrinterService',
  function ($scope, $location, memberInformationService, $routeParams,DataUtilService,PrinterService) {
    $scope.MaleOrFemale = DataUtilService.MaleOrFemale;
    $scope.OpenOrClose = DataUtilService.OpenOrClose;
    var memberInformationId = $routeParams.id;

    memberInformationService.memberCardList({id:localStorage.getItem('shop_id')},function(response){
      $scope.memberCardList = response.msg;
    })
    memberInformationService.view({id:memberInformationId},function(response){
      $scope.member=response.msg;
    })
  
    $scope.update=function(){

		if(isNaN($scope.member.amount)){
			alert('充值金额不合法！');
			return;
		}

		var amount = $scope.member.amount;
		$scope.member.amount = parseFloat($scope.member.giveAmount)+parseFloat($scope.member.amount);
		$scope.member.balance += parseFloat($scope.member.amount);
		console.log($scope.member)
		memberInformationService.update(
			$scope.member,
			function(response){
				if(response.code!=200){
				  alert("充值失败");
				}
				$location.path("/memberDataentry/memberInformation");
			}
		)
		 var rechargeData = {
			member_id: $scope.member.id,
			amount: amount,
			pay_type: $scope.member.pay_type,
			shop_id: localStorage.getItem('shop_id'),
			now_balance: $scope.member.balance,
			giveAmount:$scope.member.giveAmount,
			tradeIntegral: 0,
			integral: $scope.member.integral,
			category: 1,
			type: 11//,
			 //sync_status:syncStatus+1
		};
		memberInformationService.recharge(rechargeData,
			 function(response){
				if(response.code!=200){
				  alert("充值失败");
				}
				alert("充值成功");
				$location.path("/memberDataentry/memberInformation");
				//--------------------------------------
				//if(type=='print'){
				
					var nowTime = DataUtilService.getNowTime();
					var orderCount= $scope.orderLogList;
					PrinterService.getPrinterByPrinter_type(
						{printer_type:999},
						function(response){
							
							if (response.code==200) {
								var printer=response.msg;
								console.log(printer)
								if(printer==null){
									alert("未查询到对应打印机");
									return;
								}

								var LODOP = getCLodop();
								LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");							
								LODOP.PRINT_INITA(1,1,700,600,'商铺_'+localStorage.getItem('shop_id')+"_订单统计报表"+nowTime);
								
								var printer_name = printer.name;

								var pageWidth = printer.page_width;
								if(pageWidth == null||pageWidth==0){
									alert("打印机名称:"+printer.category_name+"-对应打印机纸张宽度设置不符合要求,请在打印设置中重新设置");
									return;
								}


				               	LODOP.SET_PRINT_PAGESIZE(3, pageWidth+'mm',"","");

								var flag  = LODOP.SET_PRINTER_INDEXA(printer_name);	
								if(!flag){
									alert("设置打印设备不存在");	
									return;									
								}

								LODOP.SET_PRINT_PAGESIZE(3,pageWidth+'mm',0,'');

								var top = 1;
								LODOP.ADD_PRINT_TEXT(top+"mm","10mm","40mm","8mm","     充值凭证");
								LODOP.SET_PRINT_STYLEA(0,"Bold",1);
								LODOP.SET_PRINT_STYLEA(0,"Horient",2);
								
								top+=6;																	
								LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","操作员:"+localStorage.getItem("name"));

								top+=6;																	
								LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","打印时间:"+nowTime);

								top+=6;
								LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm", $scope.member.phone+"  充值  "+$scope.member.amount+" 元");
								

								top+=6;																	
								LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","可用余额:"+$scope.member.balance);

								top+=5;
								LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - -  - - - -- - - - - -- - - - -");
								
						
								//LODOP.PREVIEW();
								LODOP.PRINT();
							
							}else{
								alert('打印充值凭证失败!');
							}
						}
					)									  				
						
				//}
				//--------------------------------------
			}
		 )

	}

}])

memberInformationModule.controller('memberExchangeController', [ '$scope', '$location', 'memberInformationService', '$routeParams','DataUtilService',
  function ($scope, $location, memberInformationService, $routeParams,DataUtilService) {
    $scope.MaleOrFemale = DataUtilService.MaleOrFemale;
    $scope.OpenOrClose = DataUtilService.OpenOrClose;
    $scope.cutIntegral = "";
    $scope.give = "";

    var memberInformationId = $routeParams.id;

    memberInformationService.memberCardList({id:localStorage.getItem('shop_id')},function(response){
      $scope.memberCardList = response.msg;
    })
    memberInformationService.view({id:memberInformationId},function(response){
      $scope.member=response.msg;
    })
  
    $scope.update=function(){

		if(isNaN($scope.cutIntegral)){
			alert('积分格式不正确！');
			return;
		}
		if(parseFloat($scope.member.integral) - parseFloat($scope.cutIntegral)<0){
			alert("积分不足！");
			return;
		}
		$scope.member.integral = parseFloat($scope.member.integral) - parseFloat($scope.cutIntegral);
      //  if ($scope.member.sync_status != syncStatus + 1) {
      //      $scope.member.sync_status = syncStatus + 2;
      //  }
		  memberInformationService.update($scope.member,
			  function(response){
				if(response.code!=200){
				  alert("兑换失败");
				}
				$location.path("/memberDataentry/memberInformation");
			  }
		  )
		  var rechargeData = {
			member_id: $scope.member.id,
			amount: 0,
			pay_type: 0,
			shop_id: localStorage.getItem('shop_id'),
			now_balance: $scope.member.balance,
			tradeIntegral: $scope.cutIntegral,
			integral: $scope.member.integral,
			category: 2,
			type: 23,
			description: $scope.give//,
			// sync_status:syncStatus+1
		  };
		  memberInformationService.recharge(rechargeData,
			  function(response){
				if(response.code!=200){
				  alert("兑换失败");
				}
				alert("兑换成功")
				$location.path("/memberDataentry/memberInformation");
			  }
		  )

	}

}])

memberInformationModule.controller('memberChangePasswordController', [ '$scope', '$location', 'memberInformationService', '$routeParams','DataUtilService',
  function ($scope, $location, memberInformationService, $routeParams,DataUtilService) {
    var memberInformationId = $routeParams.id;

    memberInformationService.view({id:memberInformationId},function(response){
      $scope.member=response.msg;
    })

  $scope.password = {
    'old_password':'',
    'new_password':'',
    'confirm_password':'',
	'id': $routeParams.id
  }

  $scope.updatePassword = function () {
 
    if ($scope.password.new_password.length < 6) {
      $scope.errorMessage = '密码至少6个字符'
      return
    }
	if(isNaN($scope.password.new_password)){
		$scope.errorMessage = "密码必须为数字";
		return;
	}
    if ($scope.password.new_password != $scope.password.confirm_password) {
      $scope.errorMessage = "两次输入的密码不一致"
      return
    }
     // if ($scope.password.sync_status != syncStatus + 1) {
      //    $scope.password.sync_status = syncStatus + 2;
   //   }
    memberInformationService.changePassword($scope.password,

      function (response) {
        if (response && response.code == 500) {
          alert(response.msg)
          return
        }
        $location.path('/memberDataentry/memberInformation')

      },
      function (error) {
        $scope.errorMessage = "原密码错误"
      }
    )
  }


}])


memberInformationModule.controller('memberPayListController', [ '$scope','$location','memberInformationService', 'ngTableParams', '$filter',
  function ($scope,$location,memberInformationService,ngTableParams, $filter) {

	$scope.list = [];
	$scope.category = 1;
	$scope.type = "";
	$scope.type1 = "";
	$scope.type2 = "";
	$scope.phone = "";
	$scope.memberList = [];
	memberInformationService.list({id: localStorage.getItem('shop_id')},function (response) {
		$scope.memberList = response.msg;
	})

	$scope.search = function(){
		if($scope.phone!=""&&$scope.phone!=null){
			for(var i=0;i<$scope.memberList.length;i++){
				if($scope.phone==$scope.memberList[i].phone){
					getMemberPayList($scope.memberList[i].id);
					return;
				}
			}
			alert("查无此会员");
		}else{
			getShopPayList();
		}
	}

	var getShopPayList = function(){
		  memberInformationService.payList({id: localStorage.getItem('shop_id')}).$promise.then(function (response) {
			$scope.list = response.msg;
			$scope.filterShopPayList();
		})
	}
	var getMemberPayList = function(memberId){
		  memberInformationService.memberPayList({id: memberId}).$promise.then(function (response) {
			$scope.list = response.msg;
			$scope.filterShopPayList();
		})
	}

	$scope.filterShopPayList = function () {

			if($scope.category==1){
				$scope.type = $scope.type1;
			}else{
				$scope.type = $scope.type2;
			}

			var dataList = [];
			if($scope.type!=""){
				for(var i =0;i<$scope.list.length;i++){
					if($scope.list[i].category!=$scope.category||$scope.list[i].type!=$scope.type)
						continue;
					dataList.push($scope.list[i]);
				}
			}else {
				for(var i =0;i<$scope.list.length;i++){
					if($scope.list[i].category!=$scope.category)
						continue;
					dataList.push($scope.list[i]);
				}
			}

			$scope.tableParams = new ngTableParams({
				page: 1,
				count: 25,
				sorting: {},
				filter: $scope.listFilter
			}, {
			  total: 0,
			  getData: function ($defer, params) {
				var filteredData = $filter('filter')(dataList, $scope.listFilter);
				var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

				$scope.dataList = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
				$scope.totalLength = sortedData.length
				params.total(sortedData.length)
				$defer.resolve($scope.dataList)
			  }
			})
			$scope.tableParams.settings().$scope = $scope;
			$scope.tableParams.reload();
	}

	getShopPayList();
    
}])


memberInformationModule.controller('cardListController', [ '$scope','$location','staffInformationService','memberInformationService', 'ngTableParams', '$filter',
  function ($scope,$location, staffInformationService,memberInformationService,ngTableParams, $filter) {
  
    $scope.listFilter = {};
	$scope.phone = '';
	$scope.searchPhone = '';
	$scope.search = function(){
		$scope.searchPhone = $scope.phone;
	}

	var getMemberInformationList = function(){
		  memberInformationService.memberCardList({id: localStorage.getItem('shop_id')}).$promise.then(function (response) {
			
			$scope.tableParams = new ngTableParams({
				page: 1,
				count: 25,
				sorting: {},
				filter: $scope.listFilter
			  }, {
			  total: 0,
			  getData: function ($defer, params) {
				var filteredData = $filter('filter')(response.msg, $scope.listFilter);
				var sortedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;

				$scope.dataList = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
				$scope.totalLength = sortedData.length
				params.total(sortedData.length)
				$defer.resolve($scope.dataList)
			  }
			})
		  })
	}

	getMemberInformationList();

}])

memberInformationModule.controller('cardCreateController', [ '$scope', '$location', 'memberInformationService','DataUtilService',
  function ($scope, $location, memberInformationService,DataUtilService) {

  $scope.warnMessage = "";

    $scope.create = function () {
      $scope.memberCard.shopId = localStorage.getItem('shop_id');
        //$scope.memberCard.sync_status = syncStatus + 1;
       memberInformationService.memberCardCreate($scope.memberCard,
         function(response){
               if(response.code!=200){
                 alert(response.msg)
                 $scope.warnMessage = response.msg;
               }else{
               	alert("创建成功")
                $location.path('/memberDataentry/cardList')
               }
          }
       )
    }

}])

memberInformationModule.controller('cardViewController', [ '$scope', '$location', 'memberInformationService', '$routeParams','DataUtilService',
  function ($scope, $location, memberInformationService, $routeParams,DataUtilService) {
	$scope.warnMessage = "";

    var memberCardId = $routeParams.id;

    memberInformationService.memberCardView(
    	{id:memberCardId},
    	function(response){
    		$scope.memberCard=response.msg;
    		console.log($scope.memberCard)
   		}
    )
  	//TODO
    $scope.update=function(){
     //   if ($scope.memberCard.sync_status != syncStatus + 1) {
    //        $scope.memberCard.sync_status = syncStatus + 2;
     //   }
     	memberInformationService.memberCardUpdate(
	      	$scope.memberCard,
	      	function(response){
	        	if(response.code!=200){
	          		alert("更新失败");
	        	}
	        	alert("修改成功")
	        	$location.path("/memberDataentry/cardList");
	      	}
      	)
      
    }

}])
memberInformationModule.controller('pointsRuleController', [ '$scope', '$location', 'memberInformationService','DataUtilService',
  function ($scope, $location, memberInformationService,DataUtilService) {

  $scope.warnMessage = "";
	function reflushMemberIntegra(){
        memberInformationService.memberIntegralList(
            {id:localStorage.getItem('shop_id')},
            function(response){
                $scope.memberIntegra=response.msg;
                console.log($scope.memberIntegra)
            }
        )
	}
      reflushMemberIntegra();
	//:+\
    $scope.update = function () {
    //	var sync_status;
    //	console.log($scope.memberIntegra.sync_status);
    //	if($scope.memberIntegra.sync_status==undefined){
    //        $scope.memberIntegra.sync_status==11;
	//	}else if ($scope.memberIntegra.sync_status==null||$scope.memberIntegra.sync_status != syncStatus + 1) {
    //       $scope.memberIntegra.sync_status = syncStatus + 2;
   //     }
        $scope.memberIntegra.shopId=localStorage.getItem('shop_id');
        console.log($scope.memberIntegra);
       	memberInformationService.memberIntegralUpdate(
       		 $scope.memberIntegra,
			 function(response){
				   if(response.code!=200){
					 alert(response.msg)
					 $scope.warnMessage = response.msg;
				   }else{
					alert("修改成功")
                       reflushMemberIntegra()
				   }
       		 }
       )
    }

}])




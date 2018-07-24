'use strict'

var dining_tableModule = angular.module('dining_tableModule', ['ngTable', 'checklist-model'])

		dining_tableModule.controller('dining_tableListController',
			['$scope', 'Dining_tableService', 'ngTableParams', '$filter',
				function ($scope, Dining_tableService, ngTableParams, $filter) {
		
			$scope.listFilter = {};
		
			Dining_tableService.list().$promise.then(function (response) {
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
									$scope.dining_tableList = sortedData.slice((params.page() - 1) * params.count(), params.page() * params.count())
									$scope.totalLength = sortedData.length
									params.total(sortedData.length)
									$defer.resolve($scope.dining_table)
								}
							}
				 )
			})

            $scope.sync = function(){
				var isConfirm = confirm("是否同步云端桌位数据");
				if(!isConfirm)return
				Dining_tableService.syncList_remote(
                    {id:30},
                    function(response1){
                        if(response1.code==200&&response1.msg.length>0){

                            //console.log("response1")
                            //console.log(response1)

                            var Things = response1.msg ;
                            $scope.dining_tableList =  Things;

                            for (var i = 0; i < Things.length; i++) {
                                Things[i].sync_status = 1;
                                Dining_tableService.saveById(
                                    Things[i],
                                    function (response2) {
                                        //console.log("response2")
                                        //console.log(response2)
                                    }
                                )
                                var thing = {
                                    id:Things[i].id,
                                    sync_status:1
                                }
                                Dining_tableService.remoteUpdate(
                                    thing,
                                    function(response3){
                                        //console.log("response3")
                                        //console.log(response3)
                                    }
                                )
                            };
                        }else{
                            console.log("Dining_tableService ---- 请求异常或集合数据为空")
                        }
                    }
                )
            }
		} 
	])

dining_tableModule.controller('dining_tableCreateController', [ '$scope', '$location', 'Dining_tableService','DataUtilService',
	function ($scope, $location, Dining_tableService,DataUtilService) {
		$scope.YesNoModel  = DataUtilService.YesNoModel;
		$scope.create = function () {
			$scope.dt.shop_id=localStorage.getItem("shop_id");
			$scope.dt.status = 0;
			//$scope.dt.is_upload = syncStatus+1;
		    Dining_tableService.create($scope.dt,
			   function(response){
			         if(response.code!=200){
			        	 alert(response.msg)
						 return;
			         }else{
						 alert("创建成功")
			        	 $location.path('/dataentry/dining_table')
			         }
		   		}
		   )
		}
	}
])	

dining_tableModule.controller('dining_tableController',['$scope','$location','Dining_tableService','$routeParams','DataUtilService',
	function($scope,$location,Dining_tableService,$routeParams,DataUtilService){
		$scope.YesNoModel  = DataUtilService.YesNoModel;
		
		var dining_tableId=$routeParams.id;
			
		$scope.getDiningTable = function(){
			Dining_tableService.view({id:dining_tableId},function(response){
				$scope.dataUrlForepart=apiHost + '/image/';
				$scope.dining_table=response.msg;			
			})
		}
		$scope.getDiningTable();

		$scope.downloadImage = function(){
			return;
		}

		$scope.update=function(){
			//if($scope.dining_table.is_upload!=syncStatus+1){
			//	$scope.dining_table.is_upload = syncStatus+2;
			//}
			Dining_tableService.update($scope.dining_table,
					function(response){
						if(response.code!=200){
							alert("修改失败");
							return;
						}
						alert("修改成功")
						$location.path("/dataentry/dining_table");
					}
			)
			
		}
	}
])







'use strict'

var dining_tableModule = angular.module('dining_tableModule', ['ngTable', 'checklist-model'])

		dining_tableModule.controller('dining_tableListController',['$scope', 'Dining_tableService', 'ngTableParams', '$filter',function ($scope, Dining_tableService, ngTableParams, $filter) {
		
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







 'use strict'

var tableOperateModule = angular.module('tableOperateModule', ['ngTable', 'checklist-model'])

tableOperateModule.controller('tableOperateListController',
	[ '$scope','$location','$interval','tableOperateService','$timeout','PrinterService'
        ,'lotteryService','Dining_tableService','CategoryService','ProductService','syncService','shopInformationService','memberInformationService',
  function ($scope,$location,$interval, tableOperateService,$timeout,PrinterService,lotteryService,Dining_tableService,CategoryService,
			ProductService,syncService,shopInformationService,memberInformationService
  	) {
  $scope.programBar = function () {
	  $('#myModal_programBar').modal('show');
  }
  	//结业
	$scope.test = function(){

		//修改商鋪
		//同步printer

      //order
       syncService.orderSyncList_local(
            {id:10},
            function(response1){
                //TODO 后端定义 arr.size的状态
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
						syncService.orderInsertById_remote(
							Things[i],
							function(response3){
								if(response3==200){
									//console.log("response3---200")
								}else{
									//console.log("response3---500")
								}
							}
						)
                        var syncData = {
                            id:Things[i].id,
                            sync_status:1
                        }
                        syncService.orderInsertById_local(
                            syncData,
                            function(response2){
                                if(response2==200){
                                    //console.log("response2---200")
                                }else{
                                    //console.log("response2---500")
                                }
                            }
                        )
                    }
                }else{
                    console.log("lotterService.syncList --- fail")
                }
            }
        )
		//orderItem
        syncService.orderItemSyncList_local(
            {id:10},
            function(response1){
                //TODO 后端定义 arr.size的状态
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    for (var i = 0; i < Things.length; i++) {
                        syncService.orderItemInsertById_remote(
                            Things[i],
                            function(response3){
                                if(response3==200){
                                    //console.log("response3---200")
                                }else{
                                    //console.log("response3---500")
                                }
                            }

                        )
                        var syncData = {
                            id:Things[i].id,
                            sync_status:1
                        }
                        syncService.orderItemInsertById_locals(
                            syncData,
                            function(response2){
                                if(response2==200){
                                    //console.log("response2---200")
                                }else{
                                    //console.log("response2---500")
                                }
                            }
                        )
                    }
                }else{
                    console.log("orderItemI --- fail")
                }
            }
        )
        $('#myModal_programBar').modal('show');
       /* syncService.staffSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;



                        syncService.staffCreateOrUpdate(
                            Things[i],
                            function(response3){
                                if(response3==200){
                                    console.log("response3---200")
                                }else{
                                    console.log("response3---500")
                                }
                            }

                        )


                        Things[i].sync_status=10;
                        syncService.staffCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2==200){
                                    console.log("response2---200")
                                }else{
                                    console.log("response2---500")
                                }
                            }
                        )
                    }
                }else{
                    console.log("lotterService.syncList --- fail")
                }
            }
        )
        syncService.memberSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.memberCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.memberCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        syncService.memberIntegralSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.memberIntegralCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.memberIntegralCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )

        syncService.memberLotteryLogSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.memberLotteryLogCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.memberLotteryLogCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        syncService.memberCardSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.memberCardCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.memberCardCreateOrUpdateLocal(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        syncService.memberRechargeLogSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.memberRechargeLogCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.memberRechargeLogCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        syncService.staffSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.staffCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.staffCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        syncService.userSyncList(
            {id:10},
            function(response1){
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;
                        syncService.userCreateOrUpdate_remote(
                            Things[i],
                            function(response3){
                                if(response3.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response3);
                                }
                            }

                        )
                        Things[i].sync_status=10;
                        syncService.userCreateOrUpdate(
                            Things[i],
                            function(response2){
                                if(response2.code==200){
                                    console.log("200");
                                }else{
                                    console.log("500");
                                    console.log(response2);
                                }
                            }
                        )
                    }
                }else{
                    console.log("未获取到数据")
                }
            }
        )
        PrinterService.syncList(
            {id:10},
            function(response1){
                //TODO 后端定义 arr.size的状态
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;

                        if(sync_status==11){

                            PrinterService.remoteCreate(
                                Things[i],
                                function(response3){
                                    if(response3==200){
                                        //console.log("response3---200")
                                    }else{
                                        //console.log("response3---500")
                                    }
                                }

                            )
                        }else if(sync_status==12){

                            PrinterService.remoteUpdate(
                                Things[i],
                                function(response4){
                                    if(response3==200){
                                        //console.log("response4---200")
                                    }else{
                                        //console.log("response4---500")
                                    }
                                }

                            )
                        }
                        Things[i].sync_status=10;
                        PrinterService.update(
                            Things[i],
                            function(response2){
                                if(response2==200){
                                    //console.log("response2---200")
                                }else{
                                    //console.log("response2---500")
                                }
                            }
                        )


                    }


                }else{
                    console.log("PrinterService.syncList --- fail")
                }
            }
        )

        lotteryService.syncList(
            {id:10},
            function(response1){
                //TODO 后端定义 arr.size的状态
                console.log("response1");
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        var sync_status = Things[i].sync_status;

                        if(sync_status==11){

                            lotteryService.remoteCreate(
                                Things[i],
                                function(response3){
                                    if(response3==200){
                                        //console.log("response3---200")
                                    }else{
                                        //console.log("response3---500")
                                    }
                                }

                            )
                        }else if(sync_status==12){

                            lotteryService.remoteUpdate(
                                Things[i],
                                function(response4){
                                    if(response4==200){
                                        //console.log("response4---200")
                                    }else{
                                        //console.log("response4---500")
                                    }
                                }

                            )
                        }
                        Things[i].sync_status=10;
                        lotteryService.update(
                            Things[i],
                            function(response2){
                                if(response2==200){
                                    //console.log("response2---200")
                                }else{
                                    //console.log("response2---500")
                                }
                            }
                        )


                    }


                }else{
                    console.log("lotterService.syncList --- fail")
                }
            }
        )
        Dining_tableService.localSyncList(
            {id:10},
            function(response1){
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        //var sync_status = Things[i].is_upload;

                        if(sync_status==11){

                            Dining_tableService.remoteCreate(
                                Things[i],
                                function(response3){
                                    console.log(response3)
                                    if(response3==200){
                                        console.log("response3---200")
                                    }else{
                                        console.log("response3---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }else if(sync_status==12){

                            Dining_tableService.remoteUpdate(
                                Things[i],
                                function(response4){
                                    if(response4==200){
                                        console.log("response4---200")
                                    }else{
                                        console.log("response4---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }
                       // Things[i].is_upload=10;
                        Dining_tableService.update(
                            Things[i],
                            function(response2){
                                console.log(response2)
                                if(response2==200){
                                    console.log("response2---200")
                                }else{
                                    console.log("response2---500")
                                }
                            }
                        )


                    }


                }else{
                    console.log("Dining_tableService.syncList --- fail")
                }
            }
        )
        CategoryService.localSyncList(
            {id:10},
            function(response1){
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                        //var sync_status = Things[i].is_upload;

                        if(sync_status==11){

                            CategoryService.remoteCreate(
                                Things[i],
                                function(response3){
                                    console.log(response3)
                                    if(response3==200){
                                        console.log("response3---200")
                                    }else{
                                        console.log("response3---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }else if(sync_status==12){

                            CategoryService.remoteUpdate(
                                Things[i],
                                function(response4){
                                    if(response4==200){
                                        console.log("response4---200")
                                    }else{
                                        console.log("response4---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }
                       // Things[i].is_upload=10;
                        CategoryService.update(
                            Things[i],
                            function(response2){
                                console.log(response2)
                                if(response2==200){
                                    console.log("response2---200")
                                }else{
                                    console.log("response2---500")
                                }
                            }
                        )


                    }


                }else{
                    //console.log("Dining_tableService.syncList --- fail")
                }
            }
        )
        ProductService.localSyncList(
            {id:10},
            function(response1){
                console.log(response1);
                if(response1.code==200&&response1.msg.length>0){

                    var Things = response1.msg;

                    for (var i = 0; i < Things.length; i++) {
                     //   var sync_status = Things[i].is_upload;

                        if(sync_status==11){

                            ProductService.remoteCreate(
                                Things[i],
                                function(response3){
                                    console.log(response3)
                                    if(response3==200){
                                        console.log("ProductService---response3---200")
                                    }else{
                                        console.log("ProductService---response3---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }else if(sync_status==12){

                            ProductService.remoteUpdate(
                                Things[i],
                                function(response4){
                                    if(response4==200){
                                        console.log("ProductService---response4---200")
                                    }else{
                                        console.log("ProductService---response4---500")
                                    }
                                },
                                function (err) {
                                    console.log(err)
                                }

                            )
                        }
                     //   Things[i].is_upload=10;
                        ProductService.update(
                            Things[i],
                            function(response2){
                                console.log(response2)
                                if(response2==200){
                                    console.log("ProductService---response2---200")
                                }else{
                                    console.log("ProductService---response2---500")
                                }
                            }
                        )


                    }


                }else{
                    //console.log("Dining_tableService.syncList --- fail")
                }
            }
        )*/
        }


	$scope.nowKey = localStorage.getItem('now_keys');
	$scope.callServiceList = [];
	$scope.isAdd = 0;
    tableOperateService.tableList({},
      	function (response) {
        	if (response.code == 500) {
          		alert('获取桌位列表失败')
          		return;
        	}
        	$scope.diningTableList  = response.msg;

      	},
     	function (error) {}
    );
    tableOperateService.resetOrderPno({},
    	function(response){
    		if (response.code == 500) {alert('桌位订单合并桌台失败')};
    	}

    )

	tableOperateService.callServiceList({},
		function (response) {
			if (response.code == 500) {
				//alert('获取呼叫服务列表失败')
				return
			}
			$scope.callServiceList  = response.msg
		},
		function (error) {}
	);

	var tableInitialization = function(){
		tableOperateService.tableList({},
			function (response) {
				if (response.code == 500) {
					alert('获取桌位列表失败')
				return
				}
				$scope.diningTableList  = response.msg
			},
			function (error) {}
		);

		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	var timeout_upd = $interval(tableInitialization, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.isSubmit = 0;
	$scope.selectTable = {};
	$scope.showModal = function(table){
		
		$scope.selectTable = table;
		$scope.isAdd = 0;
		for(var i=0;i<$scope.callServiceList.length;i++){
			if($scope.callServiceList[i].dining_table_id==$scope.selectTable.id
			 &&$scope.callServiceList[i].service_type==0){
				$scope.isAdd = 1;
			}
		}
		$('#myModal').modal('show')
	}
    $scope.remind = function () {
        localStorage.setItem("is_remind",0);
        $('#myModal_memberBirth').modal('hide');
    }
	function remindMemberBirth(){

	    var is_remind = localStorage.getItem("is_remind");
        if(is_remind==1){
            memberInformationService.birth({},
                function (response) {
                    if(response.code==200){
                        $scope.memberBirthList = response.msg;
                        console.log( $scope.memberBirthList )
                        if($scope.memberBirthList.length>0)$('#myModal_memberBirth').modal('show')
                    }
                })
        }
    }
    remindMemberBirth();


	$scope.test33 =function(){
        $('#myModal_memberBirth').modal('show')
    }
	//开桌
	$scope.openTable = function(tableId){
		
		
		var data = {
		  	shop_id: localStorage.getItem('shop_id'),
		  	serial_id: $scope.selectTable.name,
		  	dining_table_id: $scope.selectTable.id,
		  	loi: null,
		  	table_runner: localStorage.getItem('name'),
		  	status_id: 0//,
			//sync_status:syncStatus+1
		};
		var isResponse = 0;
			tableOperateService.openTable(
			{diningTableId:$scope.selectTable.id},
			data,		
			function(response){	
				if(response.code!=200){
					alert(response.msg);
				}
				isResponse = 1;	
			}
		)		
		$('#openTable').attr('disabled',true);
		var loop = 0;
		var interval= $interval(function() {
			console.log("循环"+loop+"秒")	
			if(loop==5||isResponse==1){
				if(loop==5&&isResponse!=1){
					alert("5秒内未收到开桌响应,请检查网络状况")
				}
				$scope.isSubmit = 0;
				$('#openTable').attr('disabled',false);
				tableInitialization();
				$('#myModal').modal('hide');
				$interval.cancel(interval);	
			}
			loop++;	
		}, 1000);
	}
	//清桌
	$scope.clearTable = function(){
		$('#openTable').attr('disabled',false);

		$scope.isSubmit = 0;
		if(!confirm("确定对"+$scope.selectTable.name+"进行清台吗？")){return;}

		tableOperateService.clearDiningTable({id: $scope.selectTable.id},
			function(response){
				if(response.code!=200){
					alert("清桌失败");
				}
				tableInitialization();
			}
		)

		$('#myModal').modal('hide')
	}

	$scope.goto = function(url){
		$('#myModal').modal('hide').on('hidden.bs.modal', function () {
			window.location.href= url;
		})
	}

	$scope.orderTake = function(){
		$('#myModal').modal('hide').on('hidden.bs.modal', function () {
			window.location.href='#takingOrder/'+$scope.selectTable.id;
		})
	}

	

}])

tableOperateModule.controller('callServiceListController', [ '$scope','$location','$routeParams','tableOperateService',
  function ($scope,$location,$routeParams, tableOperateService) {
	$scope.callServiceList = [];

	var getCallServiceList = function(){
		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	getCallServiceList();

	$scope.orderService = function(callService){
		window.location.href= "#/takingOrder/"+callService.dining_table_id;
	}

	$scope.orderDetailService = function(callService){
		tableOperateService.callServiceDelete({id:callService.id},
			function (response) {
				if (response.code == 500) {
					alert('失败')
					return
				}
				window.location.href= "#/orderDetail/"+callService.dining_table_id;
			},
			function (error) {}
		);
	}

	$scope.otherService = function(callService){
		tableOperateService.callServiceDelete({id:callService.id},
			function (response) {
				if (response.code == 500) {
					alert('失败')
					return
				}
				getCallServiceList();
			},
			function (error) {}
		);
	};

}])

tableOperateModule.controller('addOrderController', [ '$scope','$location','$routeParams',"$interval",'tableOperateService',
  function ($scope,$location,$routeParams,$interval, tableOperateService) {
	$scope.totalQuantity = 0;
	$scope.totalPrice = 0;
	$scope.tableInf = {};
	$scope.productList = [];
	$scope.productSubmitList = [];
	$scope.dataUrlForepart = apiHost + '/image/';

	tableOperateService.tableView(
		{id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	tableOperateService.categoryList({},
		function (response) {
			if (response.code == 500) {
				alert('获取菜品类别列表失败')
				return
			}

			var data = response.msg;
			var categoryList = [];
			for(var i=0;i<data.length;i++){
				if(data[i].is_enable!=1)
					continue
				categoryList.push(data[i]);
			}
			$scope.categoryList = categoryList;
			if($scope.categoryList)
				$scope.getProductList($scope.categoryList[0]);
		},
		function (error) {}
	);

	tableOperateService.callServiceList({},
		function (response) {
			if (response.code == 500) {
				alert('获取呼叫服务列表失败')
				return
			}
			$scope.callServiceList  = response.msg
		},
		function (error) {}
	);

	$scope.addOrderSubmit = function(){
		if($scope.totalQuantity==0)
			return;

		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				$scope.productSubmitList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==0){
						$scope.productSubmitList.push(orderDetail.loi[i]);
					}
				}

				var sum = $scope.productSubmitList.length;
				var count = 0;
				for(var i=0;i<$scope.productSubmitList.length;i++){
					$scope.productSubmitList[i].status_id = 8;
					tableOperateService.orderProductUpdate($scope.productSubmitList[i],
						function (response) {
							if (response.code == 500) {
								alert('修改失败')
								return
							}
							count++;
							if(count==sum)
								window.location.href="#takingOrder/"+$routeParams.tableId;
						},
						function (error) {}
					);
				}
			},
			function (error) {}
		)
	}

	$scope.showCart = function(){
		if($scope.totalQuantity==0)return;
		window.location.href="#cartList/"+$routeParams.tableId;
	}

	$scope.searchProductList = function() {
		window.location.href="#searchList/"+$routeParams.tableId;
	}
	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {


				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
                console.log(response)
                var orderDetail  = response.msg;


				var totalQuantity = 0;
				var totalPrice = 0;
				$scope.productSubmitList = [];

				if(orderDetail.loi.length>0){
                    for(var i=0;i<orderDetail.loi.length;i++){
                        if(orderDetail.loi[i].status_id==0){
                            $scope.productSubmitList.push(orderDetail.loi[i]);
                            totalQuantity += orderDetail.loi[i].quantity;
                            if(orderDetail.loi[i].p.is_promotion==1){
                                totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
                            }else{
                                totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
                            }

                            for(var j=0;j<$scope.productList.length;j++){
                                if(orderDetail.loi[i].product_id==$scope.productList[j].id){
                                    $scope.productList[j].quantity = 0;
                                    $scope.productList[j].quantity = orderDetail.loi[i].quantity;
                                }
                            }
                        }
                    }
                }
                $scope.orderDetail = orderDetail;
                $scope.totalQuantity = totalQuantity;
                $scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}
	getOrderDetail()
	var timeout_upd = $interval(getOrderDetail, 1000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.getProductList = function(category){
		$scope.selectedCategory = category;
		tableOperateService.productList({id:$scope.selectedCategory.id},
			function (response) {
				if (response.code == 500) {
					alert('获取菜品列表失败')
					return
				}
				var productList  = response.msg
				for(var i=0;i<productList.length;i++){
					productList[i].quantity = 0;
				}
				$scope.productList = productList;
			},
			function (error) {}
		);
	};
	$scope.increaseCount = function(id){

        console.log("---1180")
	    console.log($scope.orderDetail)
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				$scope.productList[i].quantity++;
				var data = {
					order_id: $scope.orderDetail.id,
					product_id: $scope.productList[i].id,
					category_id: $scope.productList[i].category_id,
					quantity: 1,
					status_id: 0,
					is_lottery: 0,
					description: ''
				};
				tableOperateService.orderProductCreate(data,
					function (response) {
						if (response.code != 200) {
						    console.log(response);
							alert('添加失败');
							return
						}
					},
					function (error) {}
				);

				$scope.totalQuantity++;
				if($scope.productList[i].is_promotion==1){
					$scope.totalPrice+= parseFloat($scope.productList[i].promotion_price);
				}else{
					$scope.totalPrice+= parseFloat($scope.productList[i].unit_price);
				}
				break;
			}
		}
	};
	$scope.decreaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				for(var j=0;j<$scope.orderDetail.loi.length;j++){
					if($scope.orderDetail.loi[j].product_id==$scope.productList[i].id&&$scope.orderDetail.loi[j].status_id==0){
						if ($scope.productList[i].quantity>1) {
							$scope.productList[i].quantity--;
							$scope.orderDetail.loi[j].quantity--;
							tableOperateService.orderProductUpdate($scope.orderDetail.loi[j],
								function (response) {
									if (response.code == 500) {
										alert('修改失败')
										return
									}
								},
								function (error) {}
							);
							$scope.totalQuantity--;
							if($scope.productList[i].is_promotion==1){
								$scope.totalPrice-= parseFloat($scope.productList[i].promotion_price);
							}else{
								$scope.totalPrice-= parseFloat($scope.productList[i].unit_price);
							}
							break;
						}else{
							if($scope.productList[i].quantity==1){
								$scope.productList[i].quantity--;
							}
							tableOperateService.orderProductDelete({id:$scope.orderDetail.loi[j].id},
								function (response) {
									if (response.code == 500) {
										alert('修改失败')
										return
									}
								},
								function (error) {}
							);
						}
					}
				}
			}
		}
	};
}])

tableOperateModule.controller('searchListController', [ '$scope','$location','$routeParams',"$interval",'tableOperateService',
  function ($scope,$location,$routeParams,$interval, tableOperateService) {
	$scope.totalQuantity = 0;
	$scope.totalPrice = 0;
	$scope.tableInf = {};
	$scope.productList = [];
	$scope.productSubmitList = [];
	$scope.keyWord = "";
	$scope.dataUrlForepart = apiHost + '/image/';

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	$scope.getAllProductList = function(){
		tableOperateService.productAllList({},
			function (response) {
				if (response.code == 500) {
					alert('获取菜品列表失败')
					return
				}
				var allProductList = [];
				var productList = [];
				allProductList = response.msg;
				for(var i=0;i<allProductList.length;i++){
					allProductList[i].quantity = 0;
					if(JSON.stringify(allProductList[i].name).indexOf($scope.keyWord)==-1){
						continue;
					}
					productList.push(allProductList[i]);
				}
				$scope.allProductList = allProductList;
				$scope.productList = productList;
				getOrderDetail();
			},
			function (error) {}
		);
	};
	$scope.getAllProductList();

	$scope.getFilterProductList = function(){
		var allProductList = $scope.allProductList;
		var productList = [];
		for(var i=0;i<allProductList.length;i++){
			if(JSON.stringify(allProductList[i].name).indexOf($scope.keyWord)==-1||allProductList[i].is_in_use==0){
				continue;
			}
			productList.push(allProductList[i]);
		}
		$scope.productList = productList;
	}

	tableOperateService.callServiceList({},
		function (response) {
			if (response.code == 500) {
				alert('获取呼叫服务列表失败')
				return
			}
			$scope.callServiceList  = response.msg
		},
		function (error) {}
	);

	$scope.addOrderSubmit = function(){
		if($scope.totalQuantity==0)
			return;

		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				$scope.productSubmitList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==0){
						$scope.productSubmitList.push(orderDetail.loi[i]);
					}
				}

				var sum = $scope.productSubmitList.length;
				var count = 0;
				for(var i=0;i<$scope.productSubmitList.length;i++){
					$scope.productSubmitList[i].status_id = 8;
					tableOperateService.orderProductUpdate($scope.productSubmitList[i],
						function (response) {
							if (response.code == 500) {
								alert('修改失败')
								return
							}
							count++;
							if(count==sum)
								window.location.href="#takingOrder/"+$routeParams.tableId;
						},
						function (error) {}
					);
				}
			},
			function (error) {}
		)
	}

	$scope.returnOrderAdd = function(){
		window.location.href="#addOrder/"+$routeParams.tableId;
	}

	$scope.showCart = function(){
		if($scope.totalQuantity==0)
			return;
		window.location.href="#cartList/"+$routeParams.tableId;
	}

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;
				$scope.productSubmitList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==0){
						$scope.productSubmitList.push(orderDetail.loi[i]);
						totalQuantity += orderDetail.loi[i].quantity;
						if(orderDetail.loi[i].p.is_promotion==1){
							totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
						}else{
							totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
						}

						for(var j=0;j<$scope.productList.length;j++){
							if(orderDetail.loi[i].product_id==$scope.productList[j].id){
								$scope.productList[j].quantity = 0;
								$scope.productList[j].quantity = orderDetail.loi[i].quantity;
							}
						}
					}
				}
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}

	var timeout_upd = $interval(getOrderDetail, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})

	$scope.increaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				$scope.productList[i].quantity++;
				var data = {
					order_id: $scope.orderDetail.id,
					product_id: $scope.productList[i].id,
					category_id: $scope.productList[i].category_id,
					quantity: 1,
					status_id: 0,
					is_lottery: 0,
					description: ''//,
					//sync_status:11
				};
				tableOperateService.orderProductCreate(data,
					function (response) {
						if (response.code == 500) {
							alert('添加失败')
							return
						}
					},
					function (error) {}
				);

				$scope.totalQuantity++;
				if($scope.productList[i].is_promotion==1){
					$scope.totalPrice+= parseFloat($scope.productList[i].promotion_price);
				}else{
					$scope.totalPrice+= parseFloat($scope.productList[i].unit_price);
				}
				break;
			}
		}
	};
	$scope.decreaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				for(var j=0;j<$scope.orderDetail.loi.length;j++){
					if($scope.orderDetail.loi[j].product_id==$scope.productList[i].id&&$scope.orderDetail.loi[j].status_id==0){
						if ($scope.productList[i].quantity>1) {
							$scope.productList[i].quantity--;
							$scope.orderDetail.loi[j].quantity--;
							tableOperateService.orderProductUpdate($scope.orderDetail.loi[j],
								function (response) {
									if (response.code == 500) {
										alert('修改失败')
										return
									}
								},
								function (error) {}
							);
							$scope.totalQuantity--;
							if($scope.productList[i].is_promotion==1){
								$scope.totalPrice-= parseFloat($scope.productList[i].promotion_price);
							}else{
								$scope.totalPrice-= parseFloat($scope.productList[i].unit_price);
							}
							break;
						}else{
							if($scope.productList[i].quantity==1){
								$scope.productList[i].quantity--;
							}
							tableOperateService.orderProductDelete({id:$scope.orderDetail.loi[j].id},
								function (response) {
									if (response.code == 500) {
										alert('修改失败')
										return
									}
								},
								function (error) {}
							);
						}
					}
				}
			}
		}
	};
}])

tableOperateModule.controller('cartListController', [ '$scope','$location','$routeParams','$interval','tableOperateService','shopInformationService','PrinterService','DataUtilService',
  function ($scope,$location,$routeParams,$interval, tableOperateService,shopInformationService,PrinterService,DataUtilService) {
	$scope.totalQuantity = 0;
	$scope.totalPrice = 0;
	$scope.tableInf = {};
	$scope.productList = [];
	$scope.productSubmitList = [];
	$scope.dataUrlForepart = apiHost + '/image/';
	$scope.callServiceList = [];

	$scope.nowKey = localStorage.getItem('now_keys');
	$scope.ifCLodp = 0;
	var getIfCLodop = function(){
		if(typeof(getCLodop)=='undefined'){
			$scope.ifCLodp = 0;
		}else{
			$scope.ifCLodp = 1;
		}
	}
	getIfCLodop();
	$scope.downloadLodop32 = function(){
		window.location.href=(apiHost+'/downloadLodop');
	}

	var getCallServiceList = function(){
		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	getCallServiceList();

	$scope.addOrderSubmit = function(){
		$scope.productSubmitList = $scope.productList;
		if($scope.totalQuantity==0)
			return;
		var sum = $scope.productSubmitList.length;
		var count = 0;
		for(var i=0;i<$scope.productSubmitList.length;i++){
			$scope.productSubmitList[i].status_id = 8;
			tableOperateService.orderProductUpdate($scope.productSubmitList[i],
				function (response) {
					if (response.code == 500) {
						alert('修改失败')
						return
					}
					count++;
					if(count==sum)
						window.location.href="#takingOrder/"+$routeParams.tableId;
				},
				function (error) {}
			);
		}
	}

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return;
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;
				$scope.productSubmitList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==0){
						$scope.productSubmitList.push(orderDetail.loi[i]);
						totalQuantity += orderDetail.loi[i].quantity;
						if(orderDetail.loi[i].p.is_promotion==1){
							totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
						}else{
							totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
						}
					}
				}
				$scope.productList = $scope.productSubmitList;
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}
	
	var timeout_upd = $interval(getOrderDetail, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.increaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				$scope.productList[i].quantity++;
				var data = {
					order_id: $scope.orderDetail.id,
					product_id: $scope.productList[i].id,
					category_id: $scope.productList[i].category_id,
					quantity: 1,
					status_id: 0,
					is_lottery: 0,
					description: ''
				};
				tableOperateService.orderProductUpdate($scope.productList[i],
					function (response) {
						if (response.code == 500) {
							alert('添加失败')
							return
						}
					},
					function (error) {}
				);

				$scope.totalQuantity++;
				if($scope.productList[i].p.is_promotion==1){
					$scope.totalPrice+= parseFloat($scope.productList[i].p.promotion_price);
				}else{
					$scope.totalPrice+= parseFloat($scope.productList[i].p.unit_price);
				}
				break;
			}
		}
	};
	$scope.decreaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				if ($scope.productList[i].quantity>1) {
					$scope.productList[i].quantity--;
					tableOperateService.orderProductUpdate($scope.productList[i],
						function (response) {
							if (response.code == 500) {
								alert('修改失败')
								return
							}
						},
						function (error) {}
					);
					$scope.totalQuantity--;
					if($scope.productList[i].p.is_promotion==1){
						$scope.totalPrice-= parseFloat($scope.productList[i].p.promotion_price);
					}else{
						$scope.totalPrice-= parseFloat($scope.productList[i].p.unit_price);
					}
					break;
				}else{
					if(confirm("是否确认删除菜品？")){
						tableOperateService.orderProductDelete({id:$scope.productList[i].id},
							function (response) {
								if (response.code == 500) {
									alert('修改失败')
									return
								}
							},
							function (error) {}
						);
						delete $scope.productList[i];
						if($scope.productList.length==1){
							window.location.href="#addOrder/"+$routeParams.tableId;
						}
					}
						//window.location.href="#addOrder/"+$routeParams.tableId;
				}
			}
		}
	};

	$scope.selectedProduct = {};

}])

tableOperateModule.controller('takingOrderListController', [ '$scope','$location','$routeParams','$interval','tableOperateService','shopInformationService','PrinterService','DataUtilService',
  function ($scope,$location,$routeParams,$interval, tableOperateService,shopInformationService,PrinterService,DataUtilService) {
	$scope.totalQuantity = 0;
	$scope.totalPrice = 0;
	$scope.tableInf = {};
	$scope.productList = [];
	$scope.dataUrlForepart = apiHost + '/image/';
	$scope.callServiceList = [];
	var tableId = $routeParams.tableId;

	$scope.nowKey = localStorage.getItem('now_keys');
	$scope.ifCLodp = 0;
	var getIfCLodop = function(){
		if(typeof(getCLodop)=='undefined'){
			$scope.ifCLodp = 0;
		}else{
			$scope.ifCLodp = 1;
		}
	}
	getIfCLodop();

	$scope.downloadLodop32 = function(){
		window.location.href=(apiHost+'/downloadLodop');
	}

	var getCallServiceList = function(){
		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	getCallServiceList();

	$scope.isSubmit = false;
	$scope.cartOrderSubmit = function(){
		if(!$scope.isSubmit){
			$scope.isSubmit = true;
		}else{
			return false;
		}
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;
				$scope.productList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==8){
						$scope.productList.push(orderDetail.loi[i]);
						totalQuantity += orderDetail.loi[i].quantity;
						if(orderDetail.loi[i].p.is_promotion==1){
							totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
						}else{
							totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
						}
					}
				}
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;

				var sum = $scope.productList.length;
				var count = 0;

				sum = sum*2;
				for(var j=0;j<$scope.callServiceList.length;j++){
					if($scope.callServiceList[j].dining_table_id==$scope.tableInf.id
					 &&$scope.callServiceList[j].order_id==$scope.orderDetail.id){
						tableOperateService.callServiceDelete({id:$scope.callServiceList[j].id},
							function (response) {
								if (response.code == 500) {
									alert('失败')
									return
								}
							},
							function (error) {}
						);
					}
				}
				$scope.tableInf.status = 2;
				tableOperateService.tableUpdate($scope.tableInf,
					function (response) {
						if (response.code == 500) {
							alert('提交失败')
							return
						}
					},
					function (error) {}
				);

				var data = {
					  id: $scope.orderDetail.id,
					  shop_id: $scope.orderDetail.shop_id,
					  serial_id: $scope.orderDetail.serial_id,
					  dining_table_id: $scope.orderDetail.dining_table_id,
					  loi: null,
					  pay_person: localStorage.getItem('name'),
					  status_id: 0,
					 /* pay_type: '',*/
					  total_free: '',
					  real_pay: '',
					  description: $scope.orderDescription
				};
				
				tableOperateService.orderUpdate(data,
					function (response) {
						if (response.code == 500) {
							alert('提交失败')
							return
						}
					},
					function (error) {}
				);

				for(var i=0;i<$scope.productList.length;i++){
					$scope.productList[i].status_id = 1;
					var data = {
						shop_id: $scope.orderDetail.shop_id,
						order_no: $scope.orderDetail.order_no,
						ding_table_name: $scope.orderDetail.serial_id,
						product_name: $scope.productList[i].p.name,
						category_id: $scope.productList[i].p.category_id,
						category_name: $scope.productList[i].p.category_name,
						quantity: $scope.productList[i].quantity,
						unit: $scope.productList[i].p.unit,
						description: $scope.productList[i].description,
						orderItem_id: $scope.productList[i].id,
						table_runner: localStorage.getItem('name')//,
                        //sync_status:11
					}

					tableOperateService.orderProductUpdate($scope.productList[i],
						function (response) {
							if (response.code == 500) {
								alert('添加失败')
								return;
							}
							
							count++;
							if(count==sum)
								window.location.href="#orderDetail/"+$routeParams.tableId;
						},
						function (error) {}
					);
                    //$scope.data.sync_status = syncStatus + 1;
					tableOperateService.printerProductCreate(data,
						function (response) {
							if (response.code == 500) {
								alert('添加失败')
								return
							}
							
							count++;
							
							if(count==sum)
								window.location.href="#orderDetail/"+$routeParams.tableId;
						},
						function (error) {}
					);
				}
			},
			function (error) {}
		)
	}

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;
				$scope.productList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id==8){
						$scope.productList.push(orderDetail.loi[i]);
						totalQuantity += orderDetail.loi[i].quantity;
						if(orderDetail.loi[i].p.is_promotion==1){
							totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
						}else{
							totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
						}
					}
				}
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}
	
	var timeout_upd = $interval(getOrderDetail, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})

	$scope.increaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				$scope.productList[i].quantity++;
				var data = {
					order_id: $scope.orderDetail.id,
					product_id: $scope.productList[i].id,
					category_id: $scope.productList[i].category_id,
					quantity: 1,
					status_id: 0,
					is_lottery: 0,
					description: ''
				};
				tableOperateService.orderProductUpdate($scope.productList[i],
					function (response) {
						if (response.code == 500) {
							alert('添加失败')
							return
						}
					},
					function (error) {}
				);

				$scope.totalQuantity++;
				if($scope.productList[i].p.is_promotion==1){
					$scope.totalPrice+= parseFloat($scope.productList[i].p.promotion_price);
				}else{
					$scope.totalPrice+= parseFloat($scope.productList[i].p.unit_price);
				}
				break;
			}
		}
	};
	$scope.decreaseCount = function(id){
		for (var i = $scope.productList.length - 1; i >= 0; i--) {
			if ($scope.productList[i].id==id) {
				if ($scope.productList[i].quantity>1) {
					$scope.productList[i].quantity--;
					tableOperateService.orderProductUpdate($scope.productList[i],
						function (response) {
							if (response.code == 500) {
								alert('修改失败')
								return
							}
						},
						function (error) {}
					);
					$scope.totalQuantity--;
					if($scope.productList[i].p.is_promotion==1){
						$scope.totalPrice-= parseFloat($scope.productList[i].p.promotion_price);
					}else{
						$scope.totalPrice-= parseFloat($scope.productList[i].p.unit_price);
					}
					break;
				}else{
					if(confirm("是否确认删除菜品？")){
						tableOperateService.orderProductDelete({id:$scope.productList[i].id},
							function (response) {
								if (response.code == 500) {
									alert('修改失败')
									return
								}
							},
							function (error) {}
						);
						delete $scope.productList[i];
						if($scope.productList.length==1){
							window.location.href="#addOrder/"+$routeParams.tableId;
						}
					}
						//window.location.href="#addOrder/"+$routeParams.tableId;
				}
			}
		}
	};

	$scope.selectedProduct = {};
	$scope.selectStandard = function(product){
		$scope.selectedProduct = product;
		$('#standardModal').modal('show');
	};
	$scope.selectTaste = function(product){
		$scope.selectedProduct = product;
		$('#tastedModal').modal('show');
	};
	$scope.addDescription = function(value){
		$scope.selectedProduct.description += ' '+value;
	}
	$scope.submitSelectStandard = function(){
		var reg = /^\d+(\.\d+)?$/;
		if(!reg.test($scope.selectedProduct.quantity)){
			alert("规格格式不正确")
			return;
		}
		tableOperateService.orderProductUpdate($scope.selectedProduct,
			function (response) {
				if (response.code == 500) {
					alert('修改失败')
					return
				}
				$('#standardModal').modal('hide')
			},
			function (error) {}
		);
		for(var i=0;i<$scope.productList.length;i++){
			if($scope.productList[i].id==$scope.selectedProduct.id)
				$scope.productList[i] = $scope.selectedProduct
		}
	}
	$scope.submitSelectTaste = function(){
		tableOperateService.orderProductUpdate($scope.selectedProduct,
			function (response) {
				if (response.code == 500) {
					alert('修改失败')
					return
				}
				$('#tastedModal').modal('hide')
			},
			function (error) {}
		);
		for(var i=0;i<$scope.productList.length;i++){
			if($scope.productList[i].id==$scope.selectedProduct.id)
				$scope.productList[i] = $scope.selectedProduct
		}
	}
}])

tableOperateModule.controller('orderDetailController', [ '$scope','$location','$routeParams','$interval','tableOperateService',
  function ($scope,$location,$routeParams,$interval, tableOperateService) {
	  $scope.totalQuantity = 0;
	  $scope.totalPrice = 0;
	  $scope.tableInf = {};
	  $scope.nowKey = localStorage.getItem('now_keys');
	  $scope.callServiceList = [];

	var getCallServiceList = function(){
		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	getCallServiceList();

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;

				for(var i=0;i<orderDetail.loi.length;i++){
					totalQuantity += orderDetail.loi[i].quantity;
					if(orderDetail.loi[i].is_lottery==1){
						continue;
					}
					if(orderDetail.loi[i].p.is_promotion==1){
						totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
					}else{
						totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
					}
				}
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}

	var timeout_upd = $interval(getOrderDetail, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.decreaseCount = function(product){
		if (product.quantity>1) {
			if(confirm('是否确认减少该菜品数量？')){
				product.quantity--;
				tableOperateService.orderProductUpdate(product,
					function (response) {
						if (response.code == 500) {
							alert('修改失败')
							return
						}
						getOrderDetail();
					},
					function (error) {}
				);
			}
		}
	}

	$scope.addLottery = function(product){
		product.is_lottery = 1;

		if(product.p.is_promotion==1){
			$scope.totalPrice -= product.p.promotion_price*product.quantity;
		}else{
			$scope.totalPrice -= product.p.unit_price*product.quantity;
		}
		tableOperateService.orderProductUpdate(product,
			function (response) {
				if (response.code == 500) {
					alert('修改失败')
					return
				}
				getOrderDetail();
			},
			function (error) {}
		);
	}

	$scope.backProduct = function(product){
		if(confirm('是否确认退菜？')){
			$scope.selectedProduct = product;
			$scope.selectedProduct.description = "";
			$('#tastedModal').modal('show');
		}
	}

	$scope.backProductSubmit = function(){
		if($scope.selectedProduct.description==""){
			alert("请填写退菜备注");
			return;
		}

		$scope.selectedProduct.status_id = 6;
		tableOperateService.orderProductUpdate($scope.selectedProduct,
			function (response) {
				if (response.code == 500) {
					alert('修改失败')
					return
				}

				//0909
				var data = {
					shop_id: $scope.orderDetail.shop_id,
					order_no: $scope.orderDetail.order_no,
					ding_table_name: $scope.orderDetail.serial_id,
					product_name: $scope.selectedProduct.p.name,
					category_id: $scope.selectedProduct.p.category_id,
					category_name: $scope.selectedProduct.p.category_name,
					quantity: $scope.selectedProduct.quantity,
					unit: $scope.selectedProduct.p.unit,
					description: $scope.selectedProduct.description,
					orderItem_id: $scope.selectedProduct.id,
					table_runner: localStorage.getItem('name')
				}			
				tableOperateService.printerProductCreate(data,
					function (response) {
						if (response.code == 500) {
							alert('添加失败')
							return
						}
						/*count++;
						if(count==sum)
							window.location.href="#orderDetail/"+$routeParams.tableId;*/
					},
					function (error) {}
				);			
				//0909
				
				getOrderDetail();
				$('#tastedModal').modal('hide')
			},
			function (error) {}
		);
	}

	$scope.addOrder = function(){
		window.location.href="#addOrder/"+$routeParams.tableId;
	}

	$scope.pay = function(){
		window.location.href="#payOrder/"+$routeParams.tableId;
	}

	$scope.cancelOrder = function(){
		if(confirm('确认删除订单？')){
			var sum = 3;
			var count = 0;
			for(var j=0;j<$scope.callServiceList.length;j++){
				if($scope.callServiceList[j].dining_table_id==$scope.tableInf.id){
					tableOperateService.callServiceDelete({id:$scope.callServiceList[j].id},
						function (response) {
							if (response.code == 500) {
								alert('失败')
								return
							}
						},
						function (error) {}
					);
				}
			}
			tableOperateService.lotteryOrder({id:$scope.orderDetail.id},
				function (response) {
					if (response.code == 500) {
						alert('获取获奖信息失败')
						return
					}
					var lotteryOrder  = response.msg;
					if(lotteryOrder){
						tableOperateService.lotteryDelete({id:lotteryOrder.id},
							function (response) {
								if (response.code == 500) {
									alert('删除失败')
									return
								}
								count++
								if(count==sum)
									window.location.href="#tableOperate/list";
							},
							function (error) {}
						);
					}else{
						count++
						if(count==sum)
							window.location.href="#tableOperate/list";
					}
				},
				function (error) {}
			);

			var data = {
				  id: $scope.orderDetail.id,
				  shop_id: $scope.orderDetail.shop_id,
				  serial_id: $scope.orderDetail.serial_id,
				  dining_table_id: $scope.orderDetail.dining_table_id,
				  loi: null,
				  pay_person: localStorage.getItem('name'),
				  status_id: 2,
				  pay_type: 6,
				  total_free: $scope.totalPrice,
				  real_pay: 0,
				  description: $scope.orderDetail.description
			};
			tableOperateService.orderUpdate(data,
				function (response) {
					if (response.code == 500) {
						alert('提交失败')
						return
					}
					count++;
					if(count==sum)
						window.location.href="#tableOperate/list";
				},
				function (error) {}
			);

			$scope.tableInf.status = 0;
			tableOperateService.tableUpdate($scope.tableInf,
				function (response) {
					if (response.code == 500) {
						alert('修改失败')
						return
					}
					count++
					if(count==sum)
						window.location.href="#tableOperate/list";
				},
				function (error) {}
			);
		}
	}

	$scope.printer = function(){
		window.location.href='#printerOrder/'+$routeParams.tableId;
	}

}])

tableOperateModule.controller('servingListController', [ '$scope','$location','$routeParams','$interval','tableOperateService',
  function ($scope,$location,$routeParams,$interval, tableOperateService) {
	  $scope.totalQuantity = 0;
	  $scope.totalPrice = 0;
	  $scope.tableInf = {};

	  $scope.addorder = function(){
		window.location.href="#addOrder/"+$routeParams.tableId;
	  }

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg
				var totalQuantity = 0;
				var totalPrice = 0;

				for(var i=0;i<orderDetail.loi.length;i++){
					totalQuantity += orderDetail.loi[i].quantity;
					if(orderDetail.loi[i].p.is_promotion==1){
						totalPrice += orderDetail.loi[i].p.promotion_price*orderDetail.loi[i].quantity;
					}else{
						totalPrice += orderDetail.loi[i].p.unit_price*orderDetail.loi[i].quantity;
					}
				}
				$scope.orderDetail = orderDetail;
				$scope.totalQuantity = totalQuantity;
				$scope.totalPrice = totalPrice;
			},
			function (error) {}
		)
	}
	var timeout_upd = $interval(getOrderDetail, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.upProduct = function(product){
		if(product.status_id!=2){
			if(!confirm("该菜品未开做，是否确认上菜？"))
				return;
		}

		product.status_id = 3;
		tableOperateService.orderProductUpdate(product,
			function (response) {
				if (response.code == 500) {
					alert('上菜失败')
					return
				}
				getOrderDetail();
			},
			function (error) {}
		);

	}
	$scope.deleteProduct = function(product){
		tableOperateService.orderProductDelete(product,
			function (response) {
				if (response.code == 500) {
					alert('删除失败')
					return
				}
				getOrderDetail();
			},
			function (error) {}
		);
	}
}])

tableOperateModule.controller('changeTableController', [ '$scope','$location','$routeParams','tableOperateService',
  function ($scope,$location,$routeParams, tableOperateService) {
	$scope.callServiceList = [];

	var getCallServiceList = function(){
		tableOperateService.callServiceList({},
			function (response) {
				if (response.code == 500) {
					alert('获取呼叫服务列表失败')
					return
				}
				$scope.callServiceList  = response.msg
			},
			function (error) {}
		);
	}
	getCallServiceList();

	tableOperateService.tableView({id:$routeParams.tableId},
      function (response) {
        if (response.code == 500) {
          alert('获取桌位信息失败')
          return
        }
        $scope.tableInf  = response.msg
      },
     function (error) {}
    );

    tableOperateService.tableList({},
      function (response) {
        if (response.code == 500) {
          alert('获取桌位列表失败')
          return
        }
        $scope.diningTableList  = response.msg
      },
     function (error) {}
    )

	tableOperateService.orderDetail({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取订单详情失败')
				return
			}
			$scope.orderDetail  = response.msg
		}
	);

	$scope.selectTable = {};
	$scope.changeTable = function(table){
		if(!confirm("您确定要转至"+table.name+"吗？"))
			return;
		$scope.selectTable = table;
		var sum = 3;
		var count = 0;

		for(var i=0;i<$scope.callServiceList.length;i++){
			if($scope.callServiceList[i].dining_table_id==$scope.tableInf.id){
				$scope.callServiceList[i].dining_table_id = $scope.selectTable.id;
				$scope.callServiceList[i].serial_id = $scope.selectTable.name;
				tableOperateService.callServiceUpdate($scope.callServiceList[i],
					function (response) {
						if (response.code == 500) {
							alert('失败')
							return
						}
					},
					function (error) {}
				);
			}
		}

		$scope.selectTable.status = $scope.tableInf.status;
		tableOperateService.tableUpdate($scope.selectTable,
			function (response) {
				if (response.code == 500) {
					alert('提交失败')
					return
				}
				count++;
				if(count==sum)
					window.location.href="#tableOperate/list";
			},
			function (error) {}
		);
		$scope.tableInf.status = 0;
		tableOperateService.tableUpdate($scope.tableInf,
			function (response) {
				if (response.code == 500) {
					alert('提交失败')
					return
				}
				count++;
				if(count==sum)
					window.location.href="#tableOperate/list";
			},
			function (error) {}
		);
		var data = {
			  id: $scope.orderDetail.id,
			  shop_id: $scope.orderDetail.shop_id,
			  serial_id: $scope.selectTable.name,
			  dining_table_id: $scope.selectTable.id,
			  loi: null,
			  status_id: 0
		};
		tableOperateService.orderUpdate(data,
			function (response) {
				if (response.code == 500) {
					alert('提交失败')
					return
				}
				count++;
				if(count==sum)
					window.location.href="#tableOperate/list";
			},
			function (error) {}
		);
	}

}])

tableOperateModule.controller('mergeTableController', [ '$scope','$location','$routeParams','tableOperateService',
  function ($scope,$location,$routeParams, tableOperateService) {
	$scope.mainTableId = $routeParams.tableId;
	$scope.diningTableList = [];
	$scope.selectTableList = [];
	

	tableOperateService.tableView({id:$routeParams.tableId},
      function (response) {
        if (response.code == 500) {
          alert('获取桌位信息失败')
          return
        }
        $scope.tableInf  = response.msg
        $scope.selectTableList.push($scope.tableInf);
      },
     function (error) {}
    );

    tableOperateService.tableList({},
      function (response) {
        if (response.code == 500) {
          alert('获取桌位列表失败')
          return
        }
        $scope.diningTableList  = response.msg
      },
     function (error) {}
    )

	tableOperateService.orderDetail({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取订单详情失败')
				return
			}
			$scope.orderDetail  = response.msg
		}
	);

	$scope.mergeTable = function(){
		$scope.selectTableList = [];
		$scope.selectTableList.push($scope.tableInf);
		$("input[name='table']").each(function() {
			if ($(this).prop('checked') ==true) {
				/*
				if($scope.diningTableList[$(this).val()].id==$scope.mainTableId){
					continue;
				}
				*/
				$scope.selectTableList.push($scope.diningTableList[$(this).val()])
			}
		});

		console.log($scope.selectTableList);
		$('#standardModal').modal('show');
	}

	$scope.submitMergeTable = function(){
		var data = {
			shopId: localStorage.getItem('shop_id'),
			diningTablePid: $scope.selectTableList[0].id,
			diningTableIdList: []
		};
		for(var i =0;i<$scope.selectTableList.length;i++){
			if(i==0)
				continue;
			data.diningTableIdList.push($scope.selectTableList[i].id);
		}

		tableOperateService.mergeOrder(data,
			function (response) {
				if (response.code == 500) {
					alert('添加失败')
					return
				}
				$('#standardModal').modal('hide').on('hidden.bs.modal', function () {
					window.location.href='#payOrder/'+$scope.mainTableId+"?isMerge=1";
				})
			},
			function (error) {}
		);

	}

}])

tableOperateModule.controller('payOrderController', [ '$scope','$location','$routeParams','$interval','tableOperateService','md5','DataUtilService','PrinterService','shopInformationService',
  function ($scope,$location,$routeParams,$interval, tableOperateService,md5,DataUtilService,PrinterService,shopInformationService) {
	$scope.totalPrice = 0;
	$scope.tableInf = {};
	$scope.mergeTableList = [];
	$scope.orderList = [];

	$scope.isUseMember = 0;
	$scope.memberPhone = "";
	$scope.member = {};

	$scope.changeUseMember = function(){
		if($('#selectMemberPay').prop('checked') ==true){
			$scope.isUseMember = 1;
			$scope.discount = "";
			$('#memberPhone').removeAttr("disabled");
			$('#balancePay').removeAttr("disabled");
			$('#integralPay').removeAttr("disabled");
			$('#discount').attr("disabled","disabled");
			//$scope.changePrice();
		}else{
			$scope.isUseMember = 0;
			$scope.memberPhone = "";
			$scope.member = {};
			$scope.balancePay = 0;
			$scope.integralPay = 0;
			$('#memberPhone').attr("disabled","disabled");
			$('#balancePay').attr("disabled","disabled");
			$('#integralPay').attr("disabled","disabled");
			$('#discount').removeAttr("disabled");
			$scope.changePrice();
		}
	}
	$scope.searchMember = function(){
		if($scope.memberPhone!=""){
			for(var i=0;i<$scope.memberList.length;i++){
				if($scope.memberPhone==$scope.memberList[i].phone&&$scope.memberList[i].is_in_use==1){
					$scope.member = $scope.memberList[i];
					$scope.changePrice();
					return;
				}
			}
			alert("查无此会员");
			$scope.member = {};
			$scope.changePrice();
		}
	}
	$scope.memberId = null;
	$scope.memberIdentifier = null;
	$scope.memberCardName = null;
	$scope.memberCardDiscount = null;


	var reg = /^\d+(\.\d+)?$/;
	$scope.discount = '';
	$scope.residue = '';
	$scope.income = '';
	$scope.payable = '';
	$scope.odd = '';
	$scope.payType = 0;

	$scope.nowKey = localStorage.getItem('now_keys');
	$scope.service_charge = parseFloat(localStorage.getItem('service_charge'));

	$scope.cashPay = 0;
	$scope.wxPay = 0;
	$scope.zfbPay = 0;
	$scope.cardPay = 0;
	$scope.balancePay = 0;
	$scope.integralPay = 0;
	$scope.orderDescription = "";

	$scope.ifCLodp = 0;
	var getIfCLodop = function(){
		if(typeof(getCLodop)=='undefined'){
			$scope.ifCLodp = 0;
		}else{
			$scope.ifCLodp = 1;
		}
	}
	getIfCLodop();
	$scope.downloadLodop32 = function(){
		window.location.href=(apiHost+'/downloadLodop');
	}

	//var a = md5.createHash('111')
	//alert(a)
	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			getOrderDetail();
		},
		function (error) {}
	);

	tableOperateService.memberList({},
		function (response) {
			if (response.code == 500) {
				alert('获取会员信息失败')
				return
			}
			$scope.memberList  = response.msg;
		},
		function (error) {}
	);
	//7111
   // alert(localStorage.getItem("shop_id"))
	tableOperateService.memberIntegralList({},
		function (response) {
			if (response.code == 500) {
				alert('获取会员信息失败')
				return
			}
			var member  = response.msg;
			console.log(response)
			$scope.memberIntegarDiscount = parseFloat(member.convertMoney/member.convertIntegral).toFixed(2);
		},
		function (error) {}
	);


      $scope.getIntegraCash = function(value){
          var integraCash = $scope.memberIntegarDiscount*value;
          console.log("integraCash---");
          console.log(integraCash);
          var isNan = isNaN(integraCash)
          return parseInt($scope.memberIntegarDiscount*value==null?0:$scope.memberIntegarDiscount*value);
      }



	var shop = {}; 
	shopInformationService.view(
		{id:localStorage.getItem("shop_id")},
		function(response){
			if(response.code==200){
				shop = response.msg;
				//console.log(shop);
			}else{
				alert("printerOrderController_shopInformationService.view");
			}
		},
		function (error) {}
	);

	var printer_999 = {};
	PrinterService.getPrinterByPrinter_type(
		{printer_type:999},
		function(response){
			if(response.code==200){
				printer_999 = response.msg;
			}
		},
		function(error){}
	)

	var getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				if($location.search().isMerge&&$location.search().isMerge==1){
					var detail = response.msg;
					tableOperateService.orderDetailById({id:detail.id},function (response) {
						$scope.orderList =response.msg;
						$scope.setOrderList();
						$scope.defautResidue();
					});
				}else{
					$scope.orderList.push(response.msg);
					$scope.setOrderList();
					$scope.defautResidue();
				}
			},
			function (error) {}
		)
	}

	$scope.setOrderList = function(){
		var totalPrice = 0;
		var payable = 0;
		//折扣优惠金额
		var discountPreferentialMoney = 0.00;
		for(var i=0;i<$scope.orderList.length;i++){
			for(var j=0;j<$scope.orderList[i].loi.length;j++){
				var product = $scope.orderList[i].loi[j];		//商品
				var price = 0;									//总价
				//是否赠送
				if(product.is_lottery==1){
					$scope.orderList[i].loi[j].total_price = parseFloat(0).toFixed(2);;
					continue;
				}
				//是否断货/取消
				if(product.status_id==6||product.status_id==7){
					$scope.orderList[i].loi[j].total_price = parseFloat(0).toFixed(2);;
					continue;
				}
				//菜品实际价格price
				var moneyPreferentialDiscount = 0.00;
				if(product.p.is_promotion==1){

					price = product.p.promotion_price;

				}else{
					var isUseMemberPrice = product.p.isUseMemberPrice;

					if($scope.isUseMember==1&&isUseMemberPrice==1){

						price = product.p.memberPrice;

					}else if($scope.isUseMember==1&&product.p.isMemberDiscount==1){
										
						price = product.p.unit_price*$scope.member.memberCardDiscount;

						moneyPreferentialDiscount = product.p.unit_price*(1-$scope.member.memberCardDiscount);

					}else if($scope.isUseMember==0&&product.p.is_discount==1&&$scope.discount!=''){

						if(!reg.test($scope.discount)){
							alert("所填普通折扣格式异常!");
							return;
						}
						price = product.p.unit_price*$scope.discount;
						moneyPreferentialDiscount =  product.p.unit_price*(1-$scope.discount);

					}else{

						price = product.p.unit_price;

					}									
				}

				var totalPrice_orderItem = price*product.quantity;

				discountPreferentialMoney+= parseFloat(moneyPreferentialDiscount);
				totalPrice += parseFloat(totalPrice_orderItem);
				payable += parseFloat(totalPrice_orderItem);
				price = parseFloat(totalPrice_orderItem).toFixed(2);

				$scope.orderList[i].loi[j].total_price = price;
			
			}
			if($scope.tableInf.is_out==0){
				totalPrice += $scope.service_charge;
				payable += $scope.service_charge;
			}
		}
		$scope.discountPreferentialMoney = parseFloat(discountPreferentialMoney).toFixed(2);
		$scope.payable = parseFloat(payable).toFixed(2);
		$scope.totalPrice = parseFloat(totalPrice).toFixed(2);
	
	}

	$scope.defautResidue = function(){
		$scope.residue = parseFloat('0.'+$scope.payable.split(".")[1]).toFixed(2);
		$scope.payable = parseFloat($scope.payable.split(".")[0]).toFixed(2);

	}

	/*$scope.changePrice = function(){
		var selectMemberPayIsChecked =  $('#selectMemberPay').prop('checked');
		alert(selectMemberPayIsChecked)
		if(!selectMemberPayIsChecked){
			$scope.orderList=null;
			getOrderDetail();
		}
		$scope.setOrderList();
		$scope.defautResidue();
		if(reg.test($scope.income)){
			$scope.odd = parseFloat($scope.income - $scope.payable).toFixed(2);
			$scope.income = parseFloat($scope.income).toFixed(2)
		}
	}*/
	$scope.changePrice = function(){
		$scope.setOrderList();
		$scope.defautResidue();
		if(reg.test($scope.income)){
			$scope.odd = parseFloat($scope.income - $scope.payable).toFixed(2);
			$scope.income = parseFloat($scope.income).toFixed(2)
		}
	}

	$scope.changeResidue = function(){
		$scope.setOrderList();
		if(reg.test($scope.residue)){
			$scope.payable = parseFloat($scope.payable - $scope.residue).toFixed(2);
		}
		$scope.changeIncome();
	}

	$scope.changeIncome = function(){
		if(reg.test($scope.income)){
			$scope.odd = parseFloat($scope.income - $scope.payable).toFixed(2);
			$scope.income = parseFloat($scope.income).toFixed(2)
		}
	}

	$scope.orderPay = function(){
		var code = 0;
		for(var i=0;i<$scope.orderList.length;i++){
			for(var j=0;j<$scope.orderList[i].loi.length;j++){
				if($scope.orderList[i].loi[j].status_id!=3){
					code++;
					break;
				}
			}
		}
		if(code>0){
			if(!confirm("有菜品未上菜，是否继续结账？"))
				return
		}

		if($scope.ifCLodp==0){
			if(!confirm("您未安装打印驱动，将无法打印小票，是否确认结账？")){
				return;
			}
		}

		var sum = 0;
		if($scope.isUseMember==1){
			sum = parseFloat($scope.cashPay)+parseFloat($scope.wxPay)+
				parseFloat($scope.zfbPay)+parseFloat($scope.cardPay)+
				parseInt($scope.integralPay*$scope.memberIntegarDiscount)+parseFloat($scope.balancePay);
		}else{
			sum = parseFloat($scope.cashPay)+parseFloat($scope.wxPay)+
				parseFloat($scope.zfbPay)+parseFloat($scope.cardPay);
		}
		if(sum<$scope.payable){
			alert("支付金额不足");
			return;
		}

		if($scope.isUseMember==1){
			if(!$scope.member.id){
				alert("查无此会员");
				return;
			}
			$scope.memberId = $scope.member.id;
			$scope.memberIdentifier = $scope.member.phone;
			$scope.memberCardName = $scope.member.memberCardName;
			$scope.memberCardDiscount = $scope.member.memberCardDiscount;
			$('#myModal').modal('show').on('shown.bs.modal', function () {
				$("#memberPassword").focus();
			})
		}else{
			$scope.memberId = null;
			$scope.memberIdentifier = null;
			$scope.memberCardName = null;
			$scope.memberCardDiscount = null;
            $scope.integralPay = 0;
            $scope.balancePay = 0;
			orderSubmit();
		}
	}

	$scope.memberPay = function(){
		if(md5.createHash($scope.memberPassword)==$scope.member.pay_password){
			if($scope.member.balance<$scope.balancePay){
				alert("您的余额不足");
				return;
			}
			if($scope.member.integral<$scope.integralPay){
				alert("您的积分不足");
				return;
			}
			$('#myModal').modal('hide').on('hidden.bs.modal', function () {
				orderSubmit();
			})
		}else{
			alert("支付密码错误");
			return;
		}
	}

	$scope.freePay = function(){
		if($scope.orderList[0].description==null||$scope.orderList[0].description==""){
			alert("请在订单/主订单的备注信息处填写免单原因");
			return;
		}
		$scope.payType = 120;
		orderSubmit();
	}
	$scope.chargeUp = function(){
		if($scope.orderList[0].description==null||$scope.orderList[0].description==""){
			alert("请在订单/主订单的备注信息处填写挂账原因");
			return;
		}
		$scope.payType = 130 ;
		orderSubmit();
	}

	$scope.getIntegraCash = function(value){
        var integraCash = $scope.memberIntegarDiscount*value;
        console.log("integraCash---");
        console.log(integraCash);
        var isNan = isNaN(integraCash)
		return parseInt($scope.memberIntegarDiscount*value==null?0:$scope.memberIntegarDiscount*value);
	}

	var orderSubmit = function(){
		//结账单打印
		if($scope.ifCLodp==1){
			
			var nowTime = DataUtilService.getNowTime();						
			var LODOP= getCLodop();
			LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");	
			LODOP.PRINT_INITA(1,1,700,600,'商铺'+localStorage.getItem("shop_id")+'_结账单'+nowTime);

			var printer_name = printer_999.name;

			var pageWidth = printer_999.page_width;
			if(pageWidth==null||pageWidth==0){
				alert("纸张宽度不能为空或零,请在打印设置中设置");
			}
			LODOP.SET_PRINT_PAGESIZE(3,pageWidth+"mm","5mm","");

			var flag = LODOP.SET_PRINTER_INDEX(printer_name);
            if (flag) {
            	var top= 1;			
				LODOP.ADD_PRINT_TEXT(top+"mm","45%",pageWidth+"mm","6mm","结账单");
				LODOP.SET_PRINT_STYLEA(0,"Bold",1);
						LODOP.SET_PRINT_STYLEA(0,"Horient",2);
						LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
						LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
				
				top+=5;
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","订单编号:"+$scope.orderList[0].order_no);

				top+=5;
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","收款员:"+localStorage.getItem("name"));	

				top+=5;
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","结账时间:"+nowTime);

				top+=5;				
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");
				
				top+=5;
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","品名");
				LODOP.ADD_PRINT_TEXT(top+"mm","42%","100%","6mm","单价");										
				LODOP.ADD_PRINT_TEXT(top+"mm","62%","100%","6mm","数量");
				LODOP.ADD_PRINT_TEXT(top+"mm","81%","100%","6mm","金额");
					

				var orderList = $scope.orderList;
				for (var l = 0; l< orderList.length; l++) {
					
					//以category_id分组
					var orderItemList = orderList[l].loi; 			
					function compare(property){
						return function(a,b){
							var value1 = a[property];
							var value2 = b[property];
							return value1 - value2;
						}
					}
					orderItemList.sort(compare('category_id'));

					var orderItemListCategoryId = []
					var orderItemList_category = [];					
					for (var i = 0; i < orderItemList.length; i++) {
						if(i==0||orderItemList[i].category_id == orderItemList[i-1].category_id){

							orderItemListCategoryId.push(orderItemList[i]);
							
						}else{
							orderItemListCategoryId.sort(compare('product_id'));
							orderItemList_category.push(orderItemListCategoryId);

							orderItemListCategoryId = [];

							orderItemListCategoryId.push(orderItemList[i]);

						}
						if(i==orderItemList.length-1){

							orderItemListCategoryId.sort(compare('product_id'));

							orderItemList_category.push(orderItemListCategoryId)	
						}					
					}
				
					var orderItemList_category_productId =[];	

					for (var i = 0; i < orderItemList_category.length; i++) {
											
						var productId_orderItemList = [];

						var orderItemList_categoryProductId = [];

						var orderItemList_category_productIdNormal = []
						//商品ID分组
						for (var j = 0; j < orderItemList_category[i].length;j++) {
										
							if(j==0||orderItemList_category[i][j].product_id==orderItemList_category[i][j-1].product_id){

								if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
															
									orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	

								}else{
									
									productId_orderItemList.push(orderItemList_category[i][j]);			
								}
								
								if(j==orderItemList_category[i].length-1){
									
									if(orderItemList_category_productIdNormal.length>0){
										
										if (orderItemList_category_productIdNormal.length==1) {

											productId_orderItemList.push(orderItemList_category_productIdNormal[0])
											
										}
										if (orderItemList_category_productIdNormal.length>1) {
											
											for (var f = 1; f < orderItemList_category_productIdNormal.length; f++) {
												
												orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[f].quantity;
												
												console.log(orderItemList_category_productIdNormal)
											
											}
											productId_orderItemList.push(orderItemList_category_productIdNormal[0])
											
										}	
									}
									orderItemList_categoryProductId.push(productId_orderItemList);	
									
									orderItemList_category_productIdNormal = []						
								}	

							}else{

								if(orderItemList_category_productIdNormal.length>0){

									if (orderItemList_category_productIdNormal.length==1) {

										productId_orderItemList.push(orderItemList_category_productIdNormal[0])

									}
									if (orderItemList_category_productIdNormal.length>1) {
										for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
											orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
										}
										productId_orderItemList.push(orderItemList_category_productIdNormal[0])
										
									}	
								}

								orderItemList_categoryProductId.push(productId_orderItemList);

								productId_orderItemList=[]	
								orderItemList_category_productIdNormal=[]
									
								if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
															
									orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	
									
								}else{
									productId_orderItemList.push(orderItemList_category[i][j]);
								}
								if(j==orderItemList_category[i].length-1){

									if(orderItemList_category_productIdNormal.length>0){
										if (orderItemList_category_productIdNormal.length==1) {productId_orderItemList.push(orderItemList_category_productIdNormal[0])}
										if (orderItemList_category_productIdNormal.length>1) {
											for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {

												orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
											}
											productId_orderItemList.push(orderItemList_category_productIdNormal[0])
											
										}	
									}
									orderItemList_categoryProductId.push(productId_orderItemList);
									orderItemList_category_productIdNormal=[]
								}				
							}							
						}
						
						orderItemList_category_productId.push(orderItemList_categoryProductId);

						orderItemList_categoryProductId=[]
					}

					top+=5;
					LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
					top+=5;
					LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", "桌位:"+orderList[l].serial_id+(orderList[l].length>1&&k==0?"[主订单]":""));				
					for (var p = 0; p < orderItemList_category_productId.length; p++) {
							top+=6;										
							LODOP.ADD_PRINT_TEXT(top+"mm","5%","100%","4mm",orderItemList_category_productId[p][0][0].category_name);
							LODOP.SET_PRINT_STYLEA(0,"Bold",1);
						for (var t= 0; t < orderItemList_category_productId[p].length; t++) {
							
							for(var y = 0; y < orderItemList_category_productId[p][t].length; y++){									
								top+=6;					
								LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm",orderItemList_category_productId[p][t][y].p.name);
								LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",orderItemList_category_productId[p][t][y].p.is_promotion==1?orderItemList_category_productId[p][t][y].p.promotion_price:orderItemList_category_productId[p][t][y].p.unit_price);
								LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm",orderItemList_category_productId[p][t][y].quantity)
								LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",orderItemList_category_productId[p][t][y].is_lottery==1?"赠送":orderItemList_category_productId[p][t][y].status_id==6?'退菜':orderItemList_category_productId[p][t][y].status_id==7?'断货':orderItemList_category_productId[p][t][y].p.is_promotion==1?(orderItemList_category_productId[p][t][y].p.promotion_price*orderItemList_category_productId[p][t][y].quantity).toFixed(2):(orderItemList_category_productId[p][t][y].p.unit_price*orderItemList_category_productId[p][t][y].quantity).toFixed(2));                                                         
							}									
						}
					}
				
					
					if($scope.tableInf.is_out==0&&shop.service_charge!=null&&shop.service_charge!=0){	
						top+=6;							
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm","服务费");											
						LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",shop.service_charge);
						LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm","1");
						LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",shop.service_charge);
					}											
				}																				
				top+=6									
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - -");
				
				if($scope.cashPay!=""&&$scope.cashPay!=0){
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","现金支付: "+$scope.cashPay);
				}
				
				

				if($scope.wxPay!=""&&$scope.wxPay!=0){
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","微信支付: "+$scope.wxPay);
				}
				
				

				if($scope.zfbPay!=""&&$scope.zfbPay!=0){
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","支付宝支付: "+$scope.zfbPay);
				}
				
				

				if($scope.cardPay!=""&&$scope.cardPay!=0){
						top+=6;
				LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","银行卡支付: "+$scope.cardPay);
				}
				
			

				if($scope.balancePay!=""&&$scope.balancePay!=0){
					top+=6;
				LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","余额支付: "+$scope.balancePay);
				}
				
				

				if($scope.integralPay!=""&&$scope.integralPay!=0){
					top+=6;
				LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","积分支付: "+$scope.integralPay);
				}

				top+=6;
				LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","合计应收: "+$scope.totalPrice);
				
				if($scope.discount!=""&&$scope.discount!=0){
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","折扣: "+$scope.discount);	
				}
				
				if($scope.residue!=""&&$scope.residue!=0){
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","抹零: "+$scope.residue);
				}
				
				
				top+=6;
				LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","实收: "+$scope.payable);
				
				if($scope.isUseMember==1){
					top+=4;	
					LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");

					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm","会员余额: "+($scope.member.balance-$scope.balancePay));

					top+=4;	
					LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
				}	

				var isFreeSingleOrIsBill= orderList[0].pay_type==120?"免单支付":orderList[0].pay_type==130?"挂账支付":false;
				if(isFreeSingleOrIsBill){
					top+=4;
					LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
					top+=6;
					LODOP.ADD_PRINT_TEXT(top+"mm","6.6mm","100%","6mm",isFreeSingleOrIsBill);
					LODOP.SET_PRINT_STYLEA(0,"Bold",1);
					top+=4;
				}
										   
			    if(shop.pay_code_id!=null){
			    	top+=6;	
					LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","付款码: ");
					top+=6;
					var imgUrl = apiHost+'/image/'+ shop.pay_code_id;	
					LODOP.ADD_PRINT_BARCODE(top+"mm","15%","22%","22%","QRCode","<div><img src="+imgUrl+"/></div>");				
					//http://test-admin.lbcy.com.cn/www/#/table/
					//LODOP.ADD_PRINT_BARCODE(top+"mm","15%","22%","22%","QRCode","http://test-admin.lbcy.com.cn/www/#/table/10036");		 		   
					//LODOP. ADD_PRINT_IMAGE (1,"5%","100%","100%","<img src="+imgUrl+"/>"); 
					//LODOP. ADD_PRINT_HTML (top+"mm","5%","100%","100%","<div><img src="+imgUrl+"/></div>"); 
					//LODOP.SET_PRINT_STYLEA(0,"HtmWaitMilSecs",1000);         
					top+=40;
				}
				top+=4;	
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
				
				top+=4;
				LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","商铺名称:"+shop.shop_name);

				top+=4;
				LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","联系方式:"+shop.phone);
				
				top+=4;	
				LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");

				top+=4;
				LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","技术支持：河北玄宇通网络科技有限公司");

				top+=4;
				LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","服务热线：400－0217－123");
		
				LODOP.PREVIEW();
				//LODOP.PRINT();
				       	
            }else{
            	alert("打印机名称对应打印设备不存在");
            }
     				
		}
		
		var payable = $scope.payable

		if($scope.payType==120)payable = 0;

		if($scope.tableInf.is_out==1)$scope.service_charge = 0;
		//提交订单修改
		var data = {
			id: $scope.orderList[0].id,
			shop_id: $scope.orderList[0].shop_id,
			serial_id: $scope.orderList[0].serial_id,
			dining_table_id: $scope.orderList[0].dining_table_id,
			loi: null,
			pay_person: localStorage.getItem('name'),
			status_id: 1,
			pay_type: $scope.payType,
			total_free: $scope.totalPrice,
			real_pay: payable,
			discount: $scope.discount,
			residue: $scope.residue,
			income: $scope.income,
			odd: $scope.odd,
			service_charge: $scope.service_charge,
			isUseMember: $scope.isUseMember,
			description: $scope.orderList[0].description,

			memberId: $scope.memberId,
			memberIdentifier: $scope.memberIdentifier,
			memberCardName: $scope.memberCardName,
			memberCardDiscount: $scope.memberCardDiscount,

            tradeMemberIntegral: $scope.integralPay,
            tradeMemberMoney: $scope.balancePay,
            tradeCash: $scope.cashPay,
            tradeWechat: $scope.wxPay,
            tradeAlipay: $scope.zfbPay,
            tradeCreditCard: $scope.cardPay,
            
            discountPreferentialMoney: $scope.discountPreferentialMoney
		};
		
		tableOperateService.orderPay(data,function (response) {
			if (response.code != 200) {
					alert(response.msg);
					return;
				}
				window.location.href="#tableOperate/list";
			},
			function (error) {
				alert('结账失败');
			}
		);
		
	}
	//dev
	console.log("打印预打单");	
	//打印预打单
	/*$scope.printPay =function(){
		PrinterService.getPrinterByPrinter_type(
			{printer_type:999},
			function(response){
				if(response.code==200){

					var nowTime = DataUtilService.getNowTime();
					var printer = response.msg;

					var LODOP= getCLodop();	
					LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");								
					LODOP.PRINT_INITA(1,1,700,600,'商铺'+localStorage.getItem('shop_id')+'_预打单');

					var printer_name = printer.name;

					var pageWidth = printer.page_width;					
					if(pageWidth==null||pageWidth==0){
						alert("纸张宽度不能为空或零");
						return;
					}
					LODOP.SET_PRINT_PAGESIZE(3, pageWidth+"mm","","");
				
					var flag = LODOP.SET_PRINTER_INDEXA(printer_name);									
					if (flag) {																
						var top = 1;	
						LODOP.ADD_PRINT_TEXT(top+"mm","4mm",pageWidth+"mm","8mm","预打单");
						LODOP.SET_PRINT_STYLEA(0,"Bold",1);
						LODOP.SET_PRINT_STYLEA(0,"Horient",2);
						LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
						LODOP.SET_PRINT_STYLEA(0,"FontSize",15);

					
						top+=5;
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","订单编号:"+$scope.orderList[0].order_no);

						top+=5;
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","收款员:"+localStorage.getItem("name"));	
						
						top+=5;
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","结账时间:"+nowTime);

						top+=5;				
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");

						
						
						top+=5;
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","品名");
						LODOP.ADD_PRINT_TEXT(top+"mm","42%","100%","6mm","单价");										
						LODOP.ADD_PRINT_TEXT(top+"mm","62%","100%","6mm","数量");
						LODOP.ADD_PRINT_TEXT(top+"mm","81%","100%","6mm","金额");

						 
						var orderList = $scope.orderList;
						console.log("$scope.orderList")
						console.log($scope.orderList);
						console.log(" ")
						var totalMemberPrice = 0.00;
						for (var k = 0; k < orderList.length; k++) {
							
							var orderItemList = orderList[k].loi; 			
							function compare(property){
								return function(a,b){
									var value1 = a[property];
									var value2 = b[property];
									return value1 - value2;
								}
							}
							orderItemList.sort(compare('category_id'));

							var orderItemListCategoryId = []
							var orderItemList_categoryId = [];					
							for (var i = 0; i < orderItemList.length; i++) {
								if(i==0||orderItemList[i].category_id == orderItemList[i-1].category_id){

									orderItemListCategoryId.push(orderItemList[i]);
									
								}else{

									orderItemList_categoryId.push(orderItemListCategoryId);

									orderItemListCategoryId = [];

									orderItemListCategoryId.push(orderItemList[i]);

								}
								if(i==orderItemList.length-1)orderItemList_categoryId.push(orderItemListCategoryId)						
							}
							

							top+=5;
							LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ");
							
							top+=5;
							LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", "桌位:"+orderList[k].serial_id+(orderList.length>1&&k==0?"[主订单]":""));

							
							for (var i = 0; i < orderItemList_categoryId.length; i++) {
								top+=6;										
								LODOP.ADD_PRINT_TEXT(top+"mm","5%","100%","4mm",orderItemList_categoryId[i][0].category_name);
								LODOP.SET_PRINT_STYLEA(0,"Bold",1);
								for(var j = 0; j < orderItemList_categoryId[i].length; j++){									
									top+=6;
									var orderItem = orderItemList_categoryId[i][j];					
									var product = orderItemList_categoryId[i][j].p;				
									

									LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm",product.name);
									LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",product.is_promotion==1?product.promotion_price:product.unit_price);
									LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm",orderItem.quantity);
									LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",
											orderItem.is_lottery==1?"赠送":
												orderItem.status_id==6?'退菜':
													orderItem.status_id==7?'断货':
														product.is_promotion==1?(product.promotion_price*orderItem.quantity).toFixed(2):(product.unit_price*orderItem.quantity).toFixed(2)
										);                                                         
									if(product.is_promotion){

										totalMemberPrice+=product.promotion_price*orderItem.quantity;	

									}else if(product.isUseMemberPrice){

										totalMemberPrice+=product.memberPrice*orderItem.quantity;	

									}else{
										totalMemberPrice+=product.unit_price*orderItem.quantity;	
									}
								}									
							}
							
							if($scope.tableInf.is_out==0&&shop.service_charge!=null&&shop.service_charge!=0){	
								top+=6;							
								LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm","服务费");											
								LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",shop.service_charge);
								LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm","1");
								LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",shop.service_charge);
							}											
						}																				
						

						top+=6;									
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
						
						top+=4;										
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","合计: "+$scope.payable);

						top+=4;										
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","会员合计: "+totalMemberPrice.toFixed(2));


						top+=4;									
						LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
					
						top+=4;
						LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","商铺名称:"+shop.shop_name);

						top+=4;
						LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","联系方式:"+shop.phone);
																									
						//LODOP.PREVIEW();								
						LODOP.PRINT();

					}else{
						alert("对应名称打印设备不存在");
					}									
				}else{
					alert("获取对应打印机名称失败");
				}
			}
		)
	}*/
	$scope.printPay = function(){
		/*var printerList = [];
		var orderItemList = [];
		$("input[name='isPrinter']").each(function() {
			if ($(this).prop('checked') ==true) {
				printerList.push($scope.productList[$(this).val()]);
				
			}
		});*/
		/*var printerList = [];
		for (var i = 0; i < $scope.orderList.length; i++) {
			printerList = printerList.concat($scope.orderList[i].loi);
		}*/

		/*console.log("printerList")
		console.log(printerList)
		console.log(" ")
		

		var orderItemList = printerList;
		console.log(orderItemList)
		//排序
		function compare(property){
		    return function(a,b){
		        var value1 = a[property];
		        var value2 = b[property];
		        return value1 - value2;
		    }
		}
		orderItemList.sort(compare('category_id'));

		var total = 0.00 ;
		var	payable = 0.00 ;
		//category分组
		var category_orderItemList = []
		var orderItemList_category = [];
			
		for (var i = 0; i < orderItemList.length; i++) {
			
			if(i==0||orderItemList[i].category_id == orderItemList[i-1].category_id){

				
				category_orderItemList.push(orderItemList[i]);
				
				if(i==orderItemList.length-1){
					category_orderItemList.sort(compare('product_id'));
					orderItemList_category.push(category_orderItemList);
				}
				
				
				total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
				if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
					payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price		
				}
																	
			}else{
					
				total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
				if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
					payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price		
				}

				category_orderItemList.sort(compare('product_id'));
				orderItemList_category.push(category_orderItemList);
				category_orderItemList=[];

				category_orderItemList.push(orderItemList[i]);

				if(i==orderItemList.length-1)orderItemList_category.push(category_orderItemList);
				
				
							
			}														
		}
		console.log(orderItemList_category)

		var orderItemList_category_productId =[];		
		for (var i = 0; i < orderItemList_category.length; i++) {
								
			var productId_orderItemList = [];
			var orderItemList_categoryProductId = [];

			var orderItemList_category_productIdNormal = []
			//商品ID分组
			for (var j = 0; j < orderItemList_category[i].length;j++) {
							
				if(j==0||orderItemList_category[i][j].product_id==orderItemList_category[i][j-1].product_id){

					if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
												
						orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	

					}else{
						
						productId_orderItemList.push(orderItemList_category[i][j]);			
					}
					
					if(j==orderItemList_category[i].length-1){
						
						if(orderItemList_category_productIdNormal.length>0){
							
							if (orderItemList_category_productIdNormal.length==1) {

								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								console.log(orderItemList_category_productIdNormal)

							}
							if (orderItemList_category_productIdNormal.length>1) {
								
								for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
									
									orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
								
								}
								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								
							}	
						}
						orderItemList_categoryProductId.push(productId_orderItemList);	
						
						orderItemList_category_productIdNormal = []						
					}											
				}else{

					if(orderItemList_category_productIdNormal.length>0){

						if (orderItemList_category_productIdNormal.length==1) {

							productId_orderItemList.push(orderItemList_category_productIdNormal[0])

						}
						if (orderItemList_category_productIdNormal.length>1) {
							for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
								orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
							}
							productId_orderItemList.push(orderItemList_category_productIdNormal[0])
							
						}	
					}

					orderItemList_categoryProductId.push(productId_orderItemList);

					productId_orderItemList=[]	
					orderItemList_category_productIdNormal=[]
						
					if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
												
						orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	
						
					}else{
						productId_orderItemList.push(orderItemList_category[i][j]);
					}
					if(j==orderItemList_category[i].length-1){

						if(orderItemList_category_productIdNormal.length>0){
							if (orderItemList_category_productIdNormal.length==1) {productId_orderItemList.push(orderItemList_category_productIdNormal[0])}
							if (orderItemList_category_productIdNormal.length>1) {
								for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {

									orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
								}
								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								
							}	
						}
						orderItemList_categoryProductId.push(productId_orderItemList);
						orderItemList_category_productIdNormal=[]
					}				
				}							
			}
			
			orderItemList_category_productId.push(orderItemList_categoryProductId);
			orderItemList_categoryProductId=[]
		}
		
		console.log(orderItemList_category_productId)

		var service_charge =  shop.service_charge 

		$scope.tableInf.is_out==1?payable:payable+=service_charge;
		$scope.tableInf.is_out==1?total:total+=service_charge;

		total = total.toFixed(2);
		payable = payable.toFixed(2);*/

		var service_charge = shop.service_charge;
		console.log("service_charge")
		console.log(shop)
		console.log(" ")
		PrinterService.getPrinterByPrinter_type(
							{printer_type:999},
							function(response){
								if(response.code==200){

									var nowTime = DataUtilService.getNowTime();
									var printer = response.msg;

									var LODOP= getCLodop();	
									LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");								
									LODOP.PRINT_INITA(1,1,700,600,'商铺'+localStorage.getItem('shop_id')+'_对账单');

									var printer_name = printer.name;

									var pageWidth = printer.page_width;
									if(pageWidth==null||pageWidth==0){
										alert("纸张宽度不能为空或零");
										return;
									}
									LODOP.SET_PRINT_PAGESIZE(3, pageWidth+"mm","","");
									
										
									var flag = LODOP.SET_PRINTER_INDEXA(printer_name);									
									if (flag) {
										var top = 1;	
										LODOP.ADD_PRINT_TEXT(top+"mm","4mm",pageWidth+"mm","8mm","预打单");										
										LODOP.SET_PRINT_STYLEA(0,"Bold",1);
										LODOP.SET_PRINT_STYLEA(0,"Horient",2);
										LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
										LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
														
										top+=5;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","订单编号:"+$scope.orderList[0].order_no);

										/*top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", "桌位:"+$scope.orderDetail.serial_id);	*/

										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","收款员:"+localStorage.getItem("name"));	
										
										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","结账时间:"+nowTime);

										top+=5;				
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");

										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","品名");
										LODOP.ADD_PRINT_TEXT(top+"mm","42%","100%","6mm","单价");										
										LODOP.ADD_PRINT_TEXT(top+"mm","62%","100%","6mm","数量");
										LODOP.ADD_PRINT_TEXT(top+"mm","81%","100%","6mm","金额");

										top+=5;				
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");	

										var totalMemberMoney = 0.00;

										var totalMoney = 0.00;
										var	payableMoney = 0.00 ;
										var totalServiceMoney = 0.00;

										var printerList = [];
										for (var l = 0; l < $scope.orderList.length; l++) {
											printerList = $scope.orderList[l].loi;
											top+=2;
											LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", " ");	
											top+=5;
											LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", "桌位:"+$scope.orderList[l].serial_id+($scope.orderList[l].length>1&&k==0?"[主订单]":""));	

											//分类
											console.log("printerList")
											console.log(printerList)
											console.log(" ")
											

											var orderItemList = printerList;
											console.log(orderItemList)
											//排序
											function compare(property){
											    return function(a,b){
											        var value1 = a[property];
											        var value2 = b[property];
											        return value1 - value2;
											    }
											}
											orderItemList.sort(compare('category_id'));

											var total = 0.00 ;
											var	payable = 0.00 ;
											var totalMemberPrice = 0.00;
											//category分组
											var category_orderItemList = []
											var orderItemList_category = [];
												
											for (var i = 0; i < orderItemList.length; i++) {
												
												if(i==0||orderItemList[i].category_id == orderItemList[i-1].category_id){

													
													category_orderItemList.push(orderItemList[i]);
													
													if(i==orderItemList.length-1){
														category_orderItemList.sort(compare('product_id'));
														orderItemList_category.push(category_orderItemList);
													}
													
													
													total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
													if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
														payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price		
														//会员价
														if(orderItemList[i].p.is_promotion==1){

						totalMemberPrice+=orderItemList[i].p.promotion_price*orderItemList[i].quantity;	

					}else if(orderItemList[i].p.isUseMemberPrice==1){

						totalMemberPrice+=orderItemList[i].p.memberPrice*orderItemList[i].quantity;	

					}else{
						totalMemberPrice+=orderItemList[i].p.unit_price*orderItemList[i].quantity;	
					}	
													}
																										
												}else{
														
													total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
													if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
														payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price		
														//会员价
														if(orderItemList[i].p.is_promotion==1){

						totalMemberPrice+=orderItemList[i].p.promotion_price*orderItemList[i].quantity;	

					}else if(orderItemList[i].p.isUseMemberPrice==1){

						totalMemberPrice+=orderItemList[i].p.memberPrice*orderItemList[i].quantity;	

					}else{
						totalMemberPrice+=orderItemList[i].p.unit_price*orderItemList[i].quantity;	
					}	
													}

													category_orderItemList.sort(compare('product_id'));
													orderItemList_category.push(category_orderItemList);
													category_orderItemList=[];

													category_orderItemList.push(orderItemList[i]);

													if(i==orderItemList.length-1)orderItemList_category.push(category_orderItemList);
													
													
																
												}														
											}
											console.log(orderItemList_category)

											var orderItemList_category_productId =[];		
											for (var i = 0; i < orderItemList_category.length; i++) {
																	
												var productId_orderItemList = [];
												var orderItemList_categoryProductId = [];

												var orderItemList_category_productIdNormal = []
												//商品ID分组
												for (var j = 0; j < orderItemList_category[i].length;j++) {
																
													if(j==0||orderItemList_category[i][j].product_id==orderItemList_category[i][j-1].product_id){

														if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
																					
															orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	

														}else{
															
															productId_orderItemList.push(orderItemList_category[i][j]);			
														}
														
														if(j==orderItemList_category[i].length-1){
															
															if(orderItemList_category_productIdNormal.length>0){
																
																if (orderItemList_category_productIdNormal.length==1) {

																	productId_orderItemList.push(orderItemList_category_productIdNormal[0])
																	console.log(orderItemList_category_productIdNormal)

																}
																if (orderItemList_category_productIdNormal.length>1) {
																	
																	for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
																		
																		orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
																	
																	}
																	productId_orderItemList.push(orderItemList_category_productIdNormal[0])
																	
																}	
															}
															orderItemList_categoryProductId.push(productId_orderItemList);	
															
															orderItemList_category_productIdNormal = []						
														}											
													}else{

														if(orderItemList_category_productIdNormal.length>0){

															if (orderItemList_category_productIdNormal.length==1) {

																productId_orderItemList.push(orderItemList_category_productIdNormal[0])

															}
															if (orderItemList_category_productIdNormal.length>1) {
																for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
																	orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
																}
																productId_orderItemList.push(orderItemList_category_productIdNormal[0])
																
															}	
														}

														orderItemList_categoryProductId.push(productId_orderItemList);

														productId_orderItemList=[]	
														orderItemList_category_productIdNormal=[]
															
														if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
																					
															orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	
															
														}else{
															productId_orderItemList.push(orderItemList_category[i][j]);
														}
														if(j==orderItemList_category[i].length-1){

															if(orderItemList_category_productIdNormal.length>0){
																if (orderItemList_category_productIdNormal.length==1) {productId_orderItemList.push(orderItemList_category_productIdNormal[0])}
																if (orderItemList_category_productIdNormal.length>1) {
																	for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {

																		orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
																	}
																	productId_orderItemList.push(orderItemList_category_productIdNormal[0])
																	
																}	
															}
															orderItemList_categoryProductId.push(productId_orderItemList);
															orderItemList_category_productIdNormal=[]
														}				
													}							
												}
												
												orderItemList_category_productId.push(orderItemList_categoryProductId);
												orderItemList_categoryProductId=[]
											}
											
											console.log(orderItemList_category_productId)

											var service_charge =  shop.service_charge 

											$scope.tableInf.is_out==1?payable:payable+=service_charge;
											$scope.tableInf.is_out==1?total:total+=service_charge;
											$scope.tableInf.is_out==1?totalMemberMoney:totalMemberMoney+=service_charge;


											
											totalMoney+= total;
											payableMoney+= payable;
											totalMemberMoney+= totalMemberPrice;
											//
											for (var i = 0; i < orderItemList_category_productId.length; i++) {
											top+=6;										
											LODOP.ADD_PRINT_TEXT(top+"mm","5%","100%","4mm",orderItemList_category[i][0].category_name);
											LODOP.SET_PRINT_STYLEA(0,"Bold",1);
											for(var j = 0; j < orderItemList_category_productId[i].length; j++) {										
												for (var k = 0; k < orderItemList_category_productId[i][j].length; k++) {
													top+=6;	
													var orderItem = orderItemList_category_productId[i][j][k];
													var product = orderItemList_category_productId[i][j][k].p;

													var price = orderItemList_category_productId[i][j][k].p.is_promotion==1?orderItemList_category_productId[i][j][k].p.promotion_price:
														orderItemList_category_productId[i][j][k].p.unit_price		
													LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm",orderItemList_category_productId[i][j][k].p.name);
													LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",price);
													LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm",orderItemList_category_productId[i][j][k].quantity);
													LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",
														orderItemList_category_productId[i][j][k].is_lottery==1?"赠送":
															orderItemList_category_productId[i][j][k].status_id==6?'退菜':
																orderItemList_category_productId[i][j][k].status_id==7?'断货':
																	orderItemList_category_productId[i][j][k].p.is_promotion==1?(orderItemList_category_productId[i][j][k].p.promotion_price*orderItemList_category_productId[i][j][k].quantity).toFixed(2):
																	(orderItemList_category_productId[i][j][k].p.unit_price*orderItemList_category_productId[i][j][k].quantity).toFixed(2)
																	); 
													/*if(product.is_promotion){

														totalMemberPrice+=product.promotion_price*orderItem.quantity;	

													}else if(product.isUseMemberPrice){

														totalMemberPrice+=product.memberPrice*orderItem.quantity;	

													}else{
														totalMemberPrice+=product.unit_price*orderItem.quantity;	
													}*/
													                                                         																						
												}

											}
										}
										if($scope.tableInf.is_out==0&&shop.service_charge!=null&&shop.service_charge!=0){
											totalMemberPrice+=service_charge
											top+=6;		
											LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm","服务费");											
											LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",service_charge);
											LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm","1");
											LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",service_charge);
										}
										}
										

										/*if(!$scope.tableInfis_out==1){
											top+=6;		
											LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm","服务费");											
											LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",service_charge);
											LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm","1");
											LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",service_charge);
										}*/
									
										top+=6;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
										
										
										top+=4;										
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","合计: "+payableMoney.toFixed(2));

										top+=4;										
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","会员合计: "+totalMemberMoney.toFixed(2));

										top+=4;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
									
										top+=4;
										LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","商铺名称:"+shop.shop_name);

										top+=4;
										LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","联系方式:"+shop.phone);
										//dev																		
									    LODOP.PREVIEW();
									    //LODOP.PRINT();
									    window.location.reload()									    									   									   					
																				
									}else{
										alert("对应名称打印设备不存在");
									}								
								}else{
									alert("获取对应打印机名称失败");								
								}
							}
		)
	}
}])

tableOperateModule.controller('kitchenOperateController', [ '$scope','$location','$routeParams','$interval','tableOperateService',
  function ($scope,$location,$routeParams,$interval, tableOperateService) {

	$scope.productStatus = $routeParams.status;

	var getTableList = function(){
		tableOperateService.tableList({},
		  function (response) {
			if (response.code == 500) {
			  alert('获取桌位列表失败')
			  return
			}
			$scope.diningTableList  = response.msg
			getOrderListBuyTable();
		  },
		 function (error) {}
		)
	}
	getTableList();

	var getOrderListBuyTable = function(){
		$scope.orderList = [];
		$scope.kitchenProductList = [];
		var j=0;
		for(var i=0;i<$scope.diningTableList.length;i++){
			if($scope.diningTableList[i].status!=0){
				$scope.orderList[j] = {};
				tableOperateService.orderDetail({id:$scope.diningTableList[i].id},
				  function (response) {
					if (response.code == 500) {
					  alert('获取订单详情失败')
					  return
					}
					if(response.msg&&response.msg.loi.length>0){
						var orderList = response.msg;
						var list = [];
						for(var k=0;k<orderList.loi.length;k++){
							if(orderList.loi[k].status_id==$scope.productStatus
								||($scope.productStatus==2&&orderList.loi[k].status_id==3)){
								list.push(orderList.loi[k]);
							}
						}
						orderList.loi = list;
						$scope.orderList[j] = orderList;
						j++;
					}
				  },
				 function (error) {}
				)
			}
			
		}
		console.log($scope.orderList);
	}
	var timeout_upd = $interval(getTableList, 10000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})
	$scope.startDoing = function(product){
		product.status_id = 2;
		tableOperateService.orderProductUpdate(product,
			function (response) {
				if (response.code == 500) {
					alert('开做失败')
					return
				}
				getTableList();
			},
			function (error) {}
		);
	}

	$scope.noProduct = function(order,product){
		var description = product.p.name+"已断货";
		var data = {
			order_id: order.id,
			dining_table_id: order.dining_table_id,
			serial_id: order.serial_id,
			shop_id: parseInt(localStorage.getItem('shop_id')),
			service_type: 4,
			description: description,
		};

		product.status_id = 7;
		tableOperateService.orderProductUpdate(product,
			function (response) {
				if (response.code == 500) {
					alert('断货失败')
					return
				}
				tableOperateService.callServiceCreate(data,
					function (response) {
						if (response.code == 500) {
							alert('断货失败')
							return
						}
						getTableList();
					},
					function (error) {}
				);
			},
			function (error) {}
		);
	}

	$scope.upProduct = function(product){
		/*
		product.status_id = 3;
		tableOperateService.orderProductUpdate(product,
			function (response) {
				if (response.code == 500) {
					alert('上菜失败')
					return
				}
				getOrderListBuyTable();
			},
			function (error) {}
		);
		*/
	}

}])

tableOperateModule.controller('printerOrderController', [ '$scope','$location','$routeParams','$interval','tableOperateService','DataUtilService','PrinterService','shopInformationService',
  	function ($scope,$location,$routeParams,$interval, tableOperateService,DataUtilService,PrinterService,shopInformationService) {
	  	$scope.totalPrice = 0;
	  	$scope.tableInf = {};
		$scope.discount = '';
		$scope.residue = '';
		$scope.income = '';
		$scope.payable = '';
		$scope.odd = '';
		$scope.payType = 0;

	    $scope.productCategory = '';
	    $scope.productStatus = '';

		$scope.nowKey = localStorage.getItem('now_keys');

		var shop = {}; 
		shopInformationService.view(
			{id:localStorage.getItem("shop_id")},
			function(response){
				if(response.code==200){
					shop = response.msg;					
				}else{
					alert("printerOrderController_shopInformationService.view");
				}
			},
			function (error) {}
		);

		/*ysq-0724*/

	$scope.ifCLodp = 0;
	var getIfCLodop = function(){
		if(typeof(getCLodop)=='undefined'){
			$scope.ifCLodp = 0;
		}else{
			$scope.ifCLodp = 1;
		}
	}
	getIfCLodop();
	$scope.downloadLodop32 = function(){
		window.location.href=(apiHost+'/downloadLodop');
	}

	tableOperateService.tableView({id:$routeParams.tableId},
		function (response) {
			if (response.code == 500) {
				alert('获取桌位信息失败')
				return
			}
			$scope.tableInf  = response.msg;
			$scope.getOrderDetail();
		},
		function (error) {}
	);

	tableOperateService.categoryList({},
		function (response) {
			if (response.code == 500) {
				alert('获取菜品类别列表失败')
				return
			}
			$scope.categoryList  = response.msg
		},
		function (error) {}
	);

	$scope.getOrderDetail = function(){
		tableOperateService.orderDetail({id:$routeParams.tableId},
			function (response) {
				if (response.code == 500) {
					alert('获取订单详情失败')
					return
				}
				var orderDetail  = response.msg;
				var productList = [];
				for(var i=0;i<orderDetail.loi.length;i++){
					if(orderDetail.loi[i].status_id!=1&&orderDetail.loi[i].status_id!=2&&orderDetail.loi[i].status_id!=3&&orderDetail.loi[i].status_id!=6&&orderDetail.loi[i].status_id!=7){
						continue;
					}
					if($scope.productCategory!=''&&$scope.productCategory!=orderDetail.loi[i].category_id){
						continue;
					}
					if($scope.productStatus!=''&&$scope.productStatus!=orderDetail.loi[i].status_id){
						continue;
					}
					productList.push(orderDetail.loi[i]);
				}

				$scope.orderDetail  = orderDetail;
				$scope.productList = productList;
			},
			function (error) {}
		)
	}

	$scope.selectAll = function(){
		if($('#selectAll').prop('checked')){
			$("input[name='isPrinter']").each(function() {
				$(this).prop('checked', true);
			});
		}else{
			$("input[name='isPrinter']").each(function() {
				$(this).prop('checked', false);
			});
		}
	}
	//打印对账单
	$scope.orderPrinter = function(){
		var printerList = [];
		var orderItemList = [];
		$("input[name='isPrinter']").each(function() {
			if ($(this).prop('checked') ==true) {
				printerList.push($scope.productList[$(this).val()]);
				
			}
		});
		
		var orderItemList = printerList;
		console.log(orderItemList)
		//排序
		function compare(property){
		    return function(a,b){
		        var value1 = a[property];
		        var value2 = b[property];
		        return value1 - value2;
		    }
		}
		orderItemList.sort(compare('category_id'));

		var total = 0.00 ;
		var	payable = 0.00 ;
		var totalMemberPrice = 0.00;
		//category分组
		var category_orderItemList = []
		var orderItemList_category = [];
		console.log("orderItemList")	
		console.log(orderItemList)	
		for (var i = 0; i < orderItemList.length; i++) {
			
			if(i==0||orderItemList[i].category_id == orderItemList[i-1].category_id){

				
				category_orderItemList.push(orderItemList[i]);
				
				if(i==orderItemList.length-1){
					category_orderItemList.sort(compare('product_id'));
					orderItemList_category.push(category_orderItemList);
				}
				
				
				total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
				if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
					payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price	
					
					if(orderItemList[i].p.is_promotion==1){
						
						totalMemberPrice+=orderItemList[i].p.promotion_price*orderItemList[i].quantity;	
						

					}else if(orderItemList[i].p.isUseMemberPrice==1){
						
						totalMemberPrice+=orderItemList[i].p.memberPrice*orderItemList[i].quantity;	

					}else{
						
						totalMemberPrice+=orderItemList[i].p.unit_price*orderItemList[i].quantity;	
					}	
					
				}
																	
			}else{
					
				total   += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price
				if(orderItemList[i].is_lottery!=1&&orderItemList[i].status_id!=6&&orderItemList[i].status_id!=7){
					payable += orderItemList[i].p.is_promotion==1?orderItemList[i].quantity*orderItemList[i].p.promotion_price:orderItemList[i].quantity*orderItemList[i].p.unit_price	
					
					if(orderItemList[i].p.is_promotion==1){

						totalMemberPrice+=orderItemList[i].p.promotion_price*orderItemList[i].quantity;	

					}else if(orderItemList[i].p.isUseMemberPrice==1){

						totalMemberPrice+=orderItemList[i].p.memberPrice*orderItemList[i].quantity;	

					}else{
						totalMemberPrice+=orderItemList[i].p.unit_price*orderItemList[i].quantity;	
					}
					
				}

				category_orderItemList.sort(compare('product_id'));
				orderItemList_category.push(category_orderItemList);
				category_orderItemList=[];

				category_orderItemList.push(orderItemList[i]);

				if(i==orderItemList.length-1)orderItemList_category.push(category_orderItemList);
				
				
							
			}														
		}
		console.log(orderItemList_category)

		var orderItemList_category_productId =[];		
		for (var i = 0; i < orderItemList_category.length; i++) {
								
			var productId_orderItemList = [];
			var orderItemList_categoryProductId = [];

			var orderItemList_category_productIdNormal = []
			//商品ID分组
			for (var j = 0; j < orderItemList_category[i].length;j++) {
							
				if(j==0||orderItemList_category[i][j].product_id==orderItemList_category[i][j-1].product_id){

					if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
												
						orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	

					}else{
						
						productId_orderItemList.push(orderItemList_category[i][j]);			
					}
					
					if(j==orderItemList_category[i].length-1){
						
						if(orderItemList_category_productIdNormal.length>0){
							
							if (orderItemList_category_productIdNormal.length==1) {

								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								console.log(orderItemList_category_productIdNormal)

							}
							if (orderItemList_category_productIdNormal.length>1) {
								
								for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
									
									orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
								
								}
								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								
							}	
						}
						orderItemList_categoryProductId.push(productId_orderItemList);	
						
						orderItemList_category_productIdNormal = []						
					}											
				}else{

					if(orderItemList_category_productIdNormal.length>0){

						if (orderItemList_category_productIdNormal.length==1) {

							productId_orderItemList.push(orderItemList_category_productIdNormal[0])

						}
						if (orderItemList_category_productIdNormal.length>1) {
							for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {
								orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
							}
							productId_orderItemList.push(orderItemList_category_productIdNormal[0])
							
						}	
					}

					orderItemList_categoryProductId.push(productId_orderItemList);

					productId_orderItemList=[]	
					orderItemList_category_productIdNormal=[]
						
					if(orderItemList_category[i][j].is_lottery!=1&&orderItemList_category[i][j].status_id!=6&&orderItemList_category[i][j].status_id!=7){
												
						orderItemList_category_productIdNormal.push(orderItemList_category[i][j])	
						
					}else{
						productId_orderItemList.push(orderItemList_category[i][j]);
					}
					if(j==orderItemList_category[i].length-1){

						if(orderItemList_category_productIdNormal.length>0){
							if (orderItemList_category_productIdNormal.length==1) {productId_orderItemList.push(orderItemList_category_productIdNormal[0])}
							if (orderItemList_category_productIdNormal.length>1) {
								for (var k = 1; k < orderItemList_category_productIdNormal.length; k++) {

									orderItemList_category_productIdNormal[0].quantity+=orderItemList_category_productIdNormal[k].quantity;
								}
								productId_orderItemList.push(orderItemList_category_productIdNormal[0])
								
							}	
						}
						orderItemList_categoryProductId.push(productId_orderItemList);
						orderItemList_category_productIdNormal=[]
					}				
				}							
			}
			
			orderItemList_category_productId.push(orderItemList_categoryProductId);
			orderItemList_categoryProductId=[]
		}
		
		console.log(orderItemList_category_productId)

		var service_charge =  shop.service_charge 

		$scope.tableInf.is_out==1?payable:payable+=service_charge;
		$scope.tableInf.is_out==1?total:total+=service_charge;
		
		$scope.tableInf.is_out==1?totalMemberPrice:totalMemberPrice+=service_charge;
		

		total = total.toFixed(2);
		payable = payable.toFixed(2);
		totalMemberPrice =totalMemberPrice.toFixed(2);
		PrinterService.getPrinterByPrinter_type(
							{printer_type:999},
							function(response){
								if(response.code==200){

									var nowTime = DataUtilService.getNowTime();
									var printer = response.msg;

									var LODOP= getCLodop();	
									LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");								
									LODOP.PRINT_INITA(1,1,700,600,'商铺'+localStorage.getItem('shop_id')+'_对账单');

									var printer_name = printer.name;

									var pageWidth = printer.page_width;
									if(pageWidth==null||pageWidth==0){
										alert("纸张宽度不能为空或零");
										return;
									}
									LODOP.SET_PRINT_PAGESIZE(3, pageWidth+"mm","","");
									
										
									var flag = LODOP.SET_PRINTER_INDEXA(printer_name);									
									if (flag) {
										var top = 1;	
										LODOP.ADD_PRINT_TEXT(top+"mm","4mm",pageWidth+"mm","8mm","预打单");										
										LODOP.SET_PRINT_STYLEA(0,"Bold",1);
										LODOP.SET_PRINT_STYLEA(0,"Horient",2);
										LODOP.SET_PRINT_STYLEA(0,"Alignment",2);
										LODOP.SET_PRINT_STYLEA(0,"FontSize",15);
														
										top+=5;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","订单编号:"+$scope.orderDetail.order_no);

										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm", "桌位:"+$scope.orderDetail.serial_id);	

										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","收款员:"+localStorage.getItem("name"));	
										
										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","结账时间:"+nowTime);

										top+=5;				
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");

										top+=5;
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","6mm","品名");
										LODOP.ADD_PRINT_TEXT(top+"mm","42%","100%","6mm","单价");										
										LODOP.ADD_PRINT_TEXT(top+"mm","62%","100%","6mm","数量");
										LODOP.ADD_PRINT_TEXT(top+"mm","81%","100%","6mm","金额");

										top+=5;				
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - -- - - - - - - - -- - -- - ");	

										
										for (var i = 0; i < orderItemList_category_productId.length; i++) {
											top+=6;										
											LODOP.ADD_PRINT_TEXT(top+"mm","5%","100%","4mm",orderItemList_category[i][0].category_name);
											LODOP.SET_PRINT_STYLEA(0,"Bold",1);
											for(var j = 0; j < orderItemList_category_productId[i].length; j++) {										
												for (var k = 0; k < orderItemList_category_productId[i][j].length; k++) {
													top+=6;	
													var orderItem = orderItemList_category_productId[i][j][k];
													var product = orderItemList_category_productId[i][j][k].p;

													var price = orderItemList_category_productId[i][j][k].p.is_promotion==1?orderItemList_category_productId[i][j][k].p.promotion_price:
														orderItemList_category_productId[i][j][k].p.unit_price		
													LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm",orderItemList_category_productId[i][j][k].p.name);
													LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",price);
													LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm",orderItemList_category_productId[i][j][k].quantity);
													LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",
														orderItemList_category_productId[i][j][k].is_lottery==1?"赠送":
															orderItemList_category_productId[i][j][k].status_id==6?'退菜':
																orderItemList_category_productId[i][j][k].status_id==7?'断货':
																	orderItemList_category_productId[i][j][k].p.is_promotion==1?(orderItemList_category_productId[i][j][k].p.promotion_price*orderItemList_category_productId[i][j][k].quantity).toFixed(2):
																	(orderItemList_category_productId[i][j][k].p.unit_price*orderItemList_category_productId[i][j][k].quantity).toFixed(2)
																	); 
													/*if(product.is_promotion){

														totalMemberPrice+=product.promotion_price*orderItem.quantity;	

													}else if(product.isUseMemberPrice){

														totalMemberPrice+=product.memberPrice*orderItem.quantity;	

													}else{
														totalMemberPrice+=product.unit_price*orderItem.quantity;	
													}*/
													                                                         																						
												}

											}
										}																							
										if(!$scope.tableInfis_out==1){
											top+=6;		
											LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","3mm","服务费");											
											LODOP.ADD_PRINT_TEXT(top+"mm","55%","100%","4mm",service_charge);
											LODOP.ADD_PRINT_TEXT(top+"mm","67%","100%","4mm","1");
											LODOP.ADD_PRINT_TEXT(top+"mm","79%","100%","4mm",service_charge);
										}
									
										top+=6;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
										
										
										top+=4;										
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","合计: "+payable);

										top+=4;										
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm","会员合计: "+totalMemberPrice);

										top+=4;									
										LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - -");
									
										top+=4;
										LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","商铺名称:"+shop.shop_name);

										top+=4;
										LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","4mm","联系方式:"+shop.phone);
										//dev																		
									    //LODOP.PREVIEW();									    									   									   					
										LODOP.PRINT();	
										window.location.reload()
									}else{
										alert("对应名称打印设备不存在");
									}								
								}else{
									alert("获取对应打印机名称失败");								
								}
							}
		)
	}
}])














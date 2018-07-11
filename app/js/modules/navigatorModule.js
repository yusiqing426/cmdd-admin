 var navigatorModule = angular.module('navigatorModule', ['navigatorService'])

navigatorModule.controller('navigatorController', ['$scope', '$window', '$http', '$location','Login',
function ($scope, $window, $http, $location,Login) {

  $scope.nowKey = Login.nowKey()
  $scope.userKey = Login.userKey()
  $scope.authModules = Login.authModules()
  $scope.isProductDown = 0;
  $scope.isOrderLog = 0;
  $scope.isCard = 0;

  $scope.isStaff = 0;
  var user_keys = localStorage.getItem('user_keys');
  if(JSON.stringify(user_keys).indexOf(7)!=-1){
	  $scope.isStaff = 1;
  }

  $scope.downProductMenu = function(){
	  if($scope.isProductDown==0){
		  $scope.isProductDown = 1;
	  }else{
		  $scope.isProductDown = 0;
	  }
  }

  $scope.downOrderLogMenu = function(){
	  if($scope.isOrderLog==0){
		  $scope.isOrderLog = 1;
	  }else{
		  $scope.isOrderLog = 0;
	  }
  }

  $scope.downProductMenu = function(){
	  if($scope.isProductDown==0){
		  $scope.isProductDown = 1;
	  }else{
		  $scope.isProductDown = 0;
	  }
  }

  $scope.downOrderLogMenu = function(){
	  if($scope.isOrderLog==0){
		  $scope.isOrderLog = 1;
	  }else{
		  $scope.isOrderLog = 0;
	  }
  }

   $scope.downCardMenu = function(){
	  if($scope.isCard==0){
		  $scope.isCard = 1;
	  }else{
		  $scope.isCard = 0;
	  }
  }


  if($scope.nowKey == null){
    $window.location.href = 'index.html'
  }

  $scope.showModule = function(moduleName){

    if($scope.authModules == null)

      return false;

   if($scope.authModules == moduleName)
    return true;

    return false;
  }

  $scope.changeNowKey = function(nowKey){
	  localStorage.setItem('now_keys', nowKey);
	  $window.location.href = 'home.html'
  }

  $scope.logout = function () {
    var token = localStorage.getItem('token')
    $http({
      method: 'POST',
      url: apiHost + '/user/logout',
      data: 'id=' + localStorage.getItem('id'),
      headers: {'X-Auth-Token': token}
    })
      .success(function (response) {
        localStorage.clear();
        $window.location.href = 'index.html'
      }).error(function (response) {})
  }

}])
navigatorModule.controller('homeController', ['$scope', '$window', '$http', '$location', 'Login', function ($scope, $window, $http, $location, Login) {

	var now_keys = localStorage.getItem('now_keys');

	if(now_keys==1){
		$location.path('/agentDataentry/agentInformation')
	}
	if(now_keys==2){
		$location.path('/shopDataentry/shopInformation')
	}
	if(now_keys==3){
		$location.path('/dataentry/dining_table')
	}
	if(now_keys==4||now_keys==5){
		$location.path('/tableOperate/list')
	}
	if(now_keys==6){
		$location.path('/kitchenOperate/1')
	}


}])


navigatorModule.controller('menueController', ['$scope', '$window', '$http','$location','$interval', 'Login','tableOperateService','PrinterService','shopInformationService','DataUtilService','tableOperateService',
function ($scope, $window, $http, $location, $interval, Login,tableOperateService,PrinterService,shopInformationService,DataUtilService,tableOperateService) {
  
  //console.log("menueController");

  $scope.nowKey = Login.nowKey()
  $scope.userKey = Login.userKey()
  $scope.authModules = Login.authModules()
  $scope.callServiceList = [];
  $scope.isProductDown = 0;
  $scope.isOrderLog = 0;
  $scope.isCard = 0;
  $scope.isSound = 0;

  $scope.isStaff = 0;
  var user_keys = localStorage.getItem('user_keys');
  if(JSON.stringify(user_keys).indexOf(7)!=-1){
	  $scope.isStaff = 1;
  }

  var isPC = function(){
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
  } 

  $scope.downProductMenu = function(){
	  if($scope.isProductDown==0){
		  $scope.isProductDown = 1;
	  }else{
		  $scope.isProductDown = 0;
	  }
  }

  $scope.downOrderLogMenu = function(){
	  if($scope.isOrderLog==0){
		  $scope.isOrderLog = 1;
	  }else{
		  $scope.isOrderLog = 0;
	  }
  }

   $scope.downCardMenu = function(){
	  if($scope.isCard==0){
		  $scope.isCard = 1;
	  }else{
		  $scope.isCard = 0;
	  }
  }

  if($scope.nowKey == null){
    $window.location.href = 'index.html'
  }

  $scope.showModule = function(moduleName){

    if($scope.authModules == null)

      return false;

   if($scope.authModules == moduleName)
    return true;

    return false;
  }

 $scope.logout = function () {
    var token = localStorage.getItem('token')
    $http({
      method: 'POST',
      url: apiHost + '/user/logout',
      data: 'id=' + localStorage.getItem('id'),
      headers: {'X-Auth-Token': token}
    })
      .success(function (response) {
        localStorage.clear();
        $window.location.href = 'index.html'
      }).error(function (response) {})
  }

	var tableInitialization = function(){	

		if($scope.nowKey==4||$scope.nowKey==5){
			tableOperateService.callServiceList({},
				function (response) {
					if (response.code == 500) {
						alert('获取呼叫服务列表失败');
						return;
					}
					if(response.msg.length>$scope.callServiceList.length&&$scope.isSound!=0)
						$scope.playSound();
					$scope.isSound = 1;
					$scope.callServiceList  = response.msg
				},
				function (error) {}
			);
		}
	}
	tableInitialization()
	//console.log("v-2018/2/9/17:52")
	var timeout_upd = $interval(tableInitialization, 2000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_upd);
	})


	var printLoop = function(){		
		var nowTime = DataUtilService.getNowTime();	    	   	
	    if(($scope.nowKey==4||$scope.nowKey==5)&&isPC()){		    	
		    tableOperateService.printJobList(
		      	function(response){     
		       		if(response.code==200){

		          		var printJobLists=response.msg 
		          	 
			          	if(printJobLists.length>0){ 
			          		//console.log(printJobLists) 
			          		shopInformationService.view(
						        {id:localStorage.getItem("shop_id")},
				          		function(response){	
				          			if(response.code==200){
					          			var is_unified_print = response.msg.is_unified_print;
					          			console.log(is_unified_print);						          			
					          			
					          			if(is_unified_print!=null){				          				
						            							            											           		
							              	if(is_unified_print==1){	
							              		//统一打印
							              		//console.log("统一打印");
						              			PrinterService.getPrinterByPrinter_type(
								                  	{printer_type:888},
								                  	function(response){
									                    if(response.code==200){
									                    	
									                      	printer = response.msg;

											                var LODOP= getCLodop(); 										                     
									                      	
									                      	for(var i= 0;i<printJobLists.length;i++){ 
												                												              
												                LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");                                
												               
												                //var pagesizesList = LODOP.GET_PAGESIZES_LIST(is_unified_printer," ")

												                //var pageWidth = pagesizesList.substring(0,2);
												                //var fontSize = pageWidth/58*9;
												                //pagesizesList = "GP 48 x 45 mm GP 123  "

												                //var strs = pagesizesList.split(" "); 
																//ar x_index = strs.indexOf("x");														
																//var pageWidth = strs[x_index-1].split("(")[0];
																var pageWidth = printer.page_width;
																if(pageWidth==null||pageWidth==0){
																	alert("纸张宽度不能为空或零");
																	return;
																}
																
							                    				var fontSize = pageWidth/58*9;							                    														              
												               	
												               	var isPrintInit;
							                      				while(!(isPrintInit = LODOP.PRINT_INIT("")) && (count < 10)){							                      					
								                      				count++;
								                      				continue;
								                      			}
												               	if(isPrintInit){

												               		LODOP.SET_PRINT_PAGESIZE(3,pageWidth+'mm',0,0);
												               		
												               	  	var is_unified_printer = printer.name; 
													                var flag = LODOP.SET_PRINTER_INDEX(is_unified_printer);	
													                
													                if(flag){
													                	
													                	LODOP.SET_PRINT_STYLE("FontSize",fontSize);

													                    var top = 0;																
													                    var title = printJobLists[i].status_id==6?"退菜单":"点菜单";
											                        	LODOP.ADD_PRINT_TEXT(top+"mm",0,pageWidth+"mm","8mm",title+' '+printJobLists[i].ding_table_name);
											                        	
											                        	top+=6;																	
																		LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","打印时间:"+nowTime);

											                        	top+=8
											                        	LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm",printJobLists[i].product_name+' '+printJobLists[i].quantity+' '+printJobLists[i].unit);
											                        	LODOP.SET_PRINT_STYLEA(0,"FontSize",fontSize+8);

											                        	top+=8;
											                        	var description = printJobLists[i].status_id==6?"退菜备注":"口味:";
											                        	LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm",description+' '+printJobLists[i].description);  
											                        					            															                     
													                 	top+=5;
											                            LODOP.ADD_PRINT_TEXT(top+"mm",0,"58mm","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - ");

											                            
													                                        															                    													                      														       
																        //LODOP.PREVIEW(); 
																        var isPrint = LODOP.PRINT();
																        if(isPrint!=""){
												                        	if(printJobLists[i].status_id!=6){
                                                                                console.log("printJobLists[i]------");
																				console.log(printJobLists[i]);
														                        orderItem_update= {
														                            id:printJobLists[i].orderItem_id,
														                         	status_id:2,
														                         	status_pay:1
															                    };	
															                   
															                    tableOperateService.orderProductUpdate(
                                                                                    orderItem_update,
														                        	function (response) {
													                        			console.log("删除打印任务orderitem_id: ----"+orderItem_update.id)
															                          	if (response.code != 200) {
															                            	alert('打印成功后修改订单项状态失败');
															                            	return;
															                          	}                        
														                        	},
															                        function (error) {
															                          console.log(error);
															                        }
													                      		);
														                 	}; 
														                 	
														                 	tableOperateService.deletePrintJob(
													                      			{id:printJobLists[i].id},
													                      			function(response){
													                      				if(response.code==200){
													                      					console.log("删除打印任务成功");
													                      				}else{
													                      					alert("删除打印任务失败");
													                      					return;
													                      				}
													                      			},
													                      			function(error){
													                      				console.log(error);
													                      			}
													                      	);																							
										                        		}else{
										                        			alert("isPrintFail");
										                        		}
													                }else{
													                	
													                	alert("打印机名称:"+printer_name+"所对应对应打印设备不存在");                         
													                };
													           	}else{
													           		alert("初始化失败!");
													           	}	

									                      	}
									                      	
									                    }else{
									                      	alert("获取统一打印模式打印机名称失败")
									                    }
								                  	}
						                		)
							              		
						              	 	}else{
						              	 		
												var LODOP= getCLodop(); 

							              	 	for(var i= 0; i < printJobLists.length; i++){           											              
									                 
				                 	  				var printer_name = printJobLists[i].printer_name;

								                    if(printer_name == null||printer_name == ""){

								                        alert('找不到品名:'+printJobLists[i].category_name+'对应打印机,请在打印管理中设置');                       
								                        											                       
								                    }else{								                    	
								                    	
								                    	var count = 0;
					                      
														var pageWidth = printJobLists[i].page_width;
														if(pageWidth==null||pageWidth==0){
															alert("打印纸张宽度不能为空或零");
														}

					                    				var fontSize = pageWidth/58*9;										                                 
					                    				            
					                      				LODOP.SET_LICENSES("","3E893A594C00D5D9C1DBE7CD18C9E8DB","C94CEE276DB2187AE6B65D56B3FC2848","");

					                      				var isPrintInit;
					                      				while(!(isPrintInit = LODOP.PRINT_INIT("")) && (count < 10)){					                      									                      					
						                      				count++;
						                      				continue;
						                      			}
						                      							                      			
						                      			if(isPrintInit){
					                      					
					                      					LODOP.SET_PRINT_PAGESIZE(3,pageWidth+"mm",0,"");  		

						                      				var flag = LODOP.SET_PRINTER_INDEXA(printer_name);
					                      
										                    if(flag){ 

										                    	LODOP.SET_PRINT_STYLE("FontSize",11);

										                        var top = 0;																
											                    var title = printJobLists[i].status_id==6?"退菜单":"点菜单";
									                        	LODOP.ADD_PRINT_TEXT(top+"mm",0,pageWidth+"mm","8mm",title+' '+printJobLists[i].ding_table_name);
									                        	
									                        	top+=6;																	
																LODOP.ADD_PRINT_TEXT(top+"mm","1mm","100%","6mm","打印时间:"+nowTime);
									                        	
									                        	top+=8
											                    LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm",printJobLists[i].product_name+' '+printJobLists[i].quantity+' '+printJobLists[i].unit);
											                    LODOP.SET_PRINT_STYLEA(0,"FontSize",fontSize+8);
									                        	
									                        	top+=8;
									                        	var description = printJobLists[i].status_id==6?"退菜备注":"口味:";
									                        	LODOP.ADD_PRINT_TEXT(top+"mm",0,"100%","4mm",description+' '+printJobLists[i].description);  
									                        																		                   											                        	                                             
										                        top+=5;
											                    LODOP.ADD_PRINT_TEXT(top+"mm",0,"58mm","2mm","- - - - - - - - - - - - - - - - - - - - - - - - - - ");

											                    										                      									                      	
										                        
										                        //LODOP.PREVIEW();

										                        var isPrint = LODOP.PRINT();										                       									                     
										                        if(isPrint!=""){
										                        	if(printJobLists[i].status_id!=6){	
																																				             		 		
												                        orderItem_update= {
												                            id:printJobLists[i].orderItem_id,
												                         	status_id:2,
												                         	status_pay:1
													                    };	
													                   
													                    tableOperateService.orderProductUpdate(
                                                                            orderItem_update,
												                        	function (response) {
													                          	if (response.code != 200) {
													                            	alert("打印成功后修改订单项状态失败");
													                            	return;
													                          	}                        
												                        	},
													                        function (error) {
													                          console.log(error);
													                        }
											                      		);
												                 	}; 
												                 	tableOperateService.deletePrintJob(
											                      			{id:printJobLists[i].id},
											                      			function(response){
											                      				if(response.code==200){
											                      					console.log("删除打印任务成功");
											                      				}else{
											                      					alert("删除打印任务失败");
											                      					return;
											                      				};
											                      			},
											                      			function(error){
											                      				console.log(error);
											                      			}
											                      	);												                      																							
										                        }else{
										                        	alert("EXCEPTION:isPrintFail");
										                        }										                        
										                    }else{
										                    	alert("打印机:"+printer_name+"对应打印设备不存在");

										                    } 
										                }else{
										                	alert(printJobLists[i].product_name+"打印初始化任务失败");
										                }                
								                    }							                      				                                                  					                   					    
							              	 	}
							              	}
							            }else{
									        alert("未设置打印模式");
									    }											
									}
						        },
					          	function(error){
					            	console.log(error)
					        	}
							);    						        				                                               					                						               						      				           
			        	}
			        }else{
			        	alert("获取打印任务列表失败");         
			        }
		      	}
		    )
		}
	}
	var timeout_pri = $interval(printLoop, 5000);
	$scope.$on('$destroy',function(){
		$interval.cancel(timeout_pri);
	})


	$scope.playSound = function(){
      /*var borswer = window.navigator.userAgent.toLowerCase();
	  
      if ( borswer.indexOf( "ie" ) >= 0 ){
        //IE内核浏览器
        var embed = document.embedPlay;
        //浏览器不支持 audion，则使用 embed 播放
        embed.volume = 100;
        //embed.play();这个不需要
      } else{*/
        //非IE内核浏览器

        var audio = document.getElementById( "audioPlay" );
        //浏览器支持 audion

		/*
		$('html').one('touchstart',function(){
			audio.play();
		});
		*/
		audio.play();
		/*
		$('html').on('touchstart',function(){
			audio.play();
		});
		*/
      //}
    }
	
}])







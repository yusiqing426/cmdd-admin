'use strict'

var loginModule = angular.module('loginModule', [])

loginModule.controller('loginController', 
	['$scope', '$window', 'LoginService','$interval','versionService', 'Dining_tableService','CategoryService',
		'ProductService','shopInformationService','syncService','imagedExeService','ipService','BannerService',
	function($scope, $window, LoginService,$interval,versionService,Dining_tableService,CategoryService,
			 ProductService,shopInformationService,syncService,imagedExeService,ipService,BannerService
		){

  	$scope.error = "";

  	$scope.login = function(user) {
  		console.log(user);
        var acoount0 = user.account.charAt(0);
  		if(acoount0=='f'){
            login_local();
		}else {
            login_remote();
		}
   		function login_remote(){
			LoginService.login(user,
				function(response) {
					var token = response.msg.token;
					var id = response.msg.user_id;
					var user_keys = response.msg.user_keys;

					localStorage.setItem('token', token);
					localStorage.setItem('id', id);

					console.log(" ---1--- ");
					if(acoount0=='s'||acoount0=='S'){
						//alert("1")
                        ipService.checkAndSet(
						{id:id},
						function (response2) {
							console.log("ipService.checkAndSet ---- ");
							console.log(response2);
							if(response2.shopId!=null){
								ipService.saveById(response2,function (response3) {
								})
							}
						});

                        shopInformationService.queryBannerByShopId(
							{},
							function (response1) {
								console.log("shopInformationService.queryBannerByShopId ------ response1");
								console.log(response1)
                                var syncList = response1.msg;
								if (response1.code!=200||syncList.length<1) return;
                                for (var i = 0; i <syncList.length; i++) {
                                	//console.log("2222222222222222222222222222")
                                    BannerService.saveById(
                                        syncList[i],
										function (response2) {
											console.log("BannerService.saveById ------ response2");
											console.log(response2)
                                        }

                                    )
                                }

                            }
						)

                        syncService.imageSyncList_remote(
                            function(response1){
                                if(response1.code==200&&response1.msg.length>0){

                                    console.log("image --- response1")
                                    console.log(response1)

                                    var syncs = response1.msg;

                                    for (var i = 0; i < syncs.length; i++) {
                                        console.log(syncs[i])
                                        syncService.imageInsertById_local(
                                            syncs[i],
                                            function (response2) {
                                                console.log("image --- response2")
                                                console.log(response2)
                                            }
                                        )
                                    }

                                    //TODO:异步数据延迟
                                    //logininit();

                                }else{
                                    console.log("syncService.imageSyncList_remote --- 请求异常或集合数据为空")
                                }
                            }
                        )


					}
					//return
                    console.log(" ---2--- ");
					localStorage.setItem('user_keys', user_keys);
					localStorage.setItem('is_remind', 1)
					var strs= new Array(); //定义一数组
					strs=user_keys.split(","); //字符分割
					localStorage.setItem('now_keys', strs[0]);
                    //return
                    if(strs[0]!=1&&strs[0]!=2){
                        if(strs[0]==3&&JSON.stringify(user_keys).indexOf(7)==-1){
                            localStorage.setItem('shop_id', id)
                            localStorage.setItem('name', '管理员')
                            LoginService.getShopInfo(
                                {id:id},
                                function(response){
                                    var service_charge = 0;
                                    if(response.msg.service_charge!=null) service_charge = response.msg.service_charge;
                                    localStorage.setItem('service_charge', service_charge);

                                }
                            )
                        }else{
                            LoginService.getShopId(
                                {id:id},
                                function(response){
                                localStorage.setItem('shop_id', response.msg.shop_id);
                                localStorage.setItem('name', response.msg.name);
                                LoginService.getShopInfo({id:response.msg.shop_id},function(response){
                                    var service_charge = 0;
                                    if(response.msg.service_charge!=null)service_charge = response.msg.service_charge;
                                     localStorage.setItem('service_charge', service_charge)
                                    }
                                )
                            })
                        }
                        shopInformationService.syncList_remote(function (response1) {
                            if(response1.code==200&&response1.msg.length>0){
                                var syncList = response1.msg;
                                for (var i= 0;i<syncList.length;i++){
                                    //sync:saveById_local
                                    shopInformationService.saveById(
                                        syncList[i],
                                        function (response2) {
                                            //console.log("shop --- response2");
                                            //console.log(response2)
                                        }
                                    )

                                }

                            }else{
                                console.log("shopInformationService ----同步数据获取异常或空")
                            }
                        })
                    }

					if(angular.isDefined(response.code) && response.code == 200) {

                    		//check-localSiteIp

							//版本更新

							//function updateVersion(){
							   /* versionService.checkUpdate(function(response1){
									if ( response1.code == 200&&response1.msg!='') {
										var newVer = response1.msg;
										console.log(newVer)
										if(confirm('有新版本,确认更新?'))
										{
											versionService.updateVersion({id:newVer},
												function(response2){
													if(response2.code==200){
														alert("更新成功!");
													}else{
														alert("更新失败!");
													}
												}
											)
										}
									}
								});*/
						   // }


							//云端数据下载
							//查询修改 桌位/菜品/菜品类别
							//function sync(){
							/*Dining_tableService.syncList_remote(
								{id:30},
								function(response1){
									if(response1.code==200&&response1.msg.length>0){

										//console.log("response1")
										//console.log(response1)

										var Things = response1.msg;

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
							)*/

							/*CategoryService.syncList(
								{id:30},

								function(response1){
									//TODO 后端定义 arr.size的状态

									if(response1.code==200&&response1.msg.length>0){

										//console.log("category --- response1")
										//console.log(response1)

										var things = response1.msg;

										for (var i = 0; i < things.length; i++) {

											things[i].sync_status = 1;

											CategoryService.saveById(
											    things[i],
                                                function (response2) {
												}
											)

											var thing = {
												id:things[i].id,
												sync_status:1
											}
											CategoryService.remoteUpdate(
												thing,
												function(response3){
													//console.log("category --- response3")
													//console.log(response3)

												}
											)


										}
										//TODO:异步数据延迟
										//logininit();

									}else{
										console.log("CategoryService---请求异常或集合数据为空")
									}
								}
							)
							ProductService.syncList(
								{id:30},
								function(response1){
									console.log("Product --- response1");
									console.log(response1);
									if(response1.code==200&&response1.msg.length>0){

										var Things = response1.msg;
										for (var i = 0; i < Things.length; i++) {
											Things[i].sync_status = 1;
											ProductService.saveById(
												Things[i],
												function (response2) {
													console.log("product ---- response2")
													console.log(response2)
												}
											)
											var sync = {
												id:Things[i].id,
												sync_status:1
											}
											ProductService.remoteUpdate(
												sync,
												function(response3){
													console.log("product ---- response3")
													console.log(response3)
												}
											)
										}
										//TODO:异步数据延迟


									}else{
										console.log("ProductService --- 请求异常或集合数据为空")
									}
								}
							)
                            syncService.imageSyncList_remote(
                                function(response1){
                                    if(response1.code==200&&response1.msg.length>0){

                                        console.log("image --- response1")
                                        console.log(response1)

                                        var syncs = response1.msg;

                                        for (var i = 0; i < syncs.length; i++) {

                                            syncs[i].sync_status = 1;
                                            console.log(syncs[i])
                                            syncService.imageInsertById_local(
                                                syncs[i],
                                                function (response2) {
                                                    console.log("image --- response2")
                                                    console.log(response2)
                                                }
                                            )
                                            syncService.imageUpdateSync_status_remote(
												{id:syncs[i].id},
                                                function(response3){
                                                    console.log("image --- response3")
                                                    console.log(response3)

                                                }
                                            )
                                        }
                                        //TODO:异步数据延迟
                                        //logininit();

                                    }else{
                                        console.log("syncService.imageSyncList_remote --- 请求异常或集合数据为空")
                                    }
                                }
                            )
                            syncService.lotterySyncList_remote(
                                {id:30},
                                function(response1){
                                    if(response1.code==200&&response1.msg.length>0){

                                        console.log("lotterySyncList_remote --- response1")
                                        console.log(response1)

                                        var things = response1.msg;

                                        for (var i = 0; i < things.length; i++) {
                                            things[i].sync_status = 1;
                                            syncService.lotteryInsertById_local(
                                                things[i],
                                                function (response2) {
                                                    //console.log("response2")
                                                    //console.log(response2)
                                                }
                                            )

                                            syncService.lotteryUpdateSync_status_remote(
                                                {id:things[i].id},
                                                things[i],
                                                function(response3){
                                                    //console.log("response3")
                                                    //console.log(response3)
                                                }
                                            )
                                        };
                                    }else{
                                        console.log("lotterySyncList_remote ---- 请求异常或集合数据为空")
                                    }
                                }
							)*/

							//alert('正在加载云端数据,请等待....');
							//}

							//if(!isRemote)sync();
							/*shopInformationService.syncList_remote(function (response1) {
								if(response1.code==200&&response1.msg.length>0){
									var syncList = response1.msg;
									for (var i= 0;i<syncList.length;i++){
										//sync:saveById_local
										shopInformationService.saveById(
											syncList[i],
											function (response2) {
												//console.log("shop --- response2");
												//console.log(response2)
											}
										)

									}

								}else{
									console.log("shopInformationService ----同步数据获取异常或空")
								}
							})
							syncService.lotterySyncList_remote(
								{id:30},
								function(response1){
									if(response1.code==200&&response1.msg.length>0){

										console.log("lotterySyncList_remote --- response1")
										console.log(response1)

										var things = response1.msg;

										for (var i = 0; i < things.length; i++) {
											things[i].sync_status = 1;
											syncService.lotteryInsertById_local(
												things[i],
												function (response2) {
													//console.log("response2")
													//console.log(response2)
												}
											)
											syncService.lotteryUpdateSync_status_remote(
												{id:things[i].id},
												things[i],
												function(response3){
													//console.log("response3")
													//console.log(response3)
												}
											)
										};
									}else{
										console.log("lotterySyncList_remote ---- 请求异常或集合数据为空")
									}
								}
							)*/
                            //alert("test")
							function loginInit(){
							    //dev
                                $window.location.href = 'home.html';
                                //var login =  confirm("test")
								//if(login)$window.location.href = 'home.html';

							}
							setTimeout(loginInit,3000);

					}else{
					  $scope.error = response.msg
					}
				},
				function(error) {
					console.log(error);
				}
			);
        }
        function login_local(){
			LoginService.login_local(user,
				function(response) {
			        console.log(response);

					var token = response.msg.token;
					var id = response.msg.user_id;
					var user_keys = response.msg.user_keys;

					localStorage.setItem('token', token);
					localStorage.setItem('id', id);

					localStorage.setItem('user_keys', user_keys);
					localStorage.setItem('is_remind', 1)
					var strs= new Array(); //定义一数组
					strs=user_keys.split(","); //字符分割
					localStorage.setItem('now_keys', strs[0]);

                    if(strs[0]!=1&&strs[0]!=2){
                        if(strs[0]==3&&JSON.stringify(user_keys).indexOf(7)==-1){
                            localStorage.setItem('shop_id', id)
                            localStorage.setItem('name', '管理员')
                            LoginService.getShopInfo({id:id},function(response5){
                                var service_charge = 0;

                                if(response5.msg.service_charge!=null){
                                    service_charge = response5.msg.service_charge;
                                    localStorage.setItem('service_charge', service_charge)
                                }
                                $window.location.href = 'home.html';
                            })
                        }else{
                            LoginService.getShopId_local({id:id},function(response5){
                                console.log(response5)
                                localStorage.setItem('shop_id', response5.msg.shop_id)
                                localStorage.setItem('name', response5.msg.name)
                                LoginService.getShopInfo({id:response5.msg.shop_id},function(response){
                                    var service_charge = 0;

                                    if(response5.msg.service_charge!=null){
                                        service_charge = response5.msg.service_charge;
                                        localStorage.setItem('service_charge', service_charge)
                                    }
                                   // $window.location.href = 'home.html';
                                })
                            })
                        }
                    }else{
                        $window.location.href = 'home.html';
                    }
					if(angular.isDefined(response.code) && response.code == 200) {
						//版本更新
						//function updateVersion(){
						/* versionService.checkUpdate(function(response1){
							 if ( response1.code == 200&&response1.msg!='') {
								 var newVer = response1.msg;
								 console.log(newVer)
								 if(confirm('有新版本,确认更新?'))
								 {
									 versionService.updateVersion({id:newVer},
										 function(response2){
											 if(response2.code==200){
												 alert("更新成功!");
											 }else{
												 alert("更新失败!");
											 }
										 }
									 )
								 }
							 }
						 });*/
						// }
						//云端数据下载
						//查询修改 桌位/菜品/菜品类别
						/*function sync(){
							Dining_tableService.syncList_remote(
								{id:30},
								function(response1){
									if(response1.code==200&&response1.msg.length>0){

										console.log("response1")
										console.log(response1)

										var Things = response1.msg;

										for (var i = 0; i < Things.length; i++) {
											Things[i].sync_status = 1;
											Dining_tableService.saveById(Things[i],function (response2) {
												console.log("response2")
												console.log(response2)
											})
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
										console.log("请求异常或集合数据为空")
									}
								}
							)

							CategoryService.syncList(
								{id:30},
								function(response1){
									//TODO 后端定义 arr.size的状态

									if(response1.code==200&&response1.msg.length>0){

										console.log("response1")
										console.log(response1)

										var things = response1.msg;

										for (var i = 0; i < things.length; i++) {

											things[i].sync_status = 1;

											CategoryService.saveById(things[i],function (response2) {
												console.log("response2")
												console.log(response2)
											})

											var thing = {
												id:things[i].id,
												sync_status:1
											}
											CategoryService.remoteUpdate(
												thing,
												function(response3){
													console.log("response3")
													console.log(response3)

												}
											)


										}
										//TODO:异步数据延迟
										//logininit();

									}else{
										console.log("请求异常或集合数据为空")
									}
								}
							)
							ProductService.syncList(
								{id:30},
								function(response1){
									//TODO 后端定义 arr.size的状态
									console.log("ProductService.syncList ---- response1");
									console.log(response1);
									if(response1.code==200&&response1.msg.length>0){

										//console.log("response1")
										//console.log(response1)

										var Things = response1.msg;
										for (var i = 0; i < Things.length; i++) {
											Things[i].sync_status = 1;
											ProductService.saveById(Things[i],function (response2) {
												//console.log("response2")
												//console.log(response2)
											})
											//\:remote --- 30
											var thing = {
												id:Things[i].id,
												sync_status:1
											}
											ProductService.remoteUpdate(
												thing,
												function(response3){
													//console.log("response3")
													//console.log(response3)
													//lengthTh++;
												}
											)
										}
										//TODO:异步数据延迟


									}else{
										console.log("请求异常或集合数据为空")
									}
								}
							)
                            ',,'
							alert('正在加载云端数据,请等待....');

						}
						if(!isRemote&&acoount0!='f') sync();*/
						function loginInit(){
							/*var token = response.msg.token
							 var id = response.msg.user_id
							 var user_keys = response.msg.user_keys

							 localStorage.setItem('token', token)
							 localStorage.setItem('id', id)

							 localStorage.setItem('user_keys', user_keys)
							 var strs= new Array(); //定义一数组
							 strs=user_keys.split(","); //字符分割

							 localStorage.setItem('now_keys', strs[0])*/

							/*if(strs[0]!=1&&strs[0]!=2){
								if(strs[0]==3&&JSON.stringify(user_keys).indexOf(7)==-1){
									localStorage.setItem('shop_id', id)
									localStorage.setItem('name', '管理员')
									LoginService.getShopInfo({id:id},function(response5){
										var service_charge = 0;

										if(response5.msg.service_charge!=null){
											service_charge = response5.msg.service_charge;
											localStorage.setItem('service_charge', service_charge)
                                        }
										//$window.location.href = 'home.html';
									})
								}else{
									LoginService.getShopId_local({id:id},function(response5){
										console.log(response5)
										localStorage.setItem('shop_id', response5.msg.shop_id)
										localStorage.setItem('name', response5.msg.name)
										LoginService.getShopInfo({id:response5.msg.shop_id},function(response){
											var service_charge = 0;

											if(response5.msg.service_charge!=null){
												service_charge = response5.msg.service_charge;
												localStorage.setItem('service_charge', service_charge)
                                            }
											//$window.location.href = 'home.html';
										})
									})
								}
							}else{
								//$window.location.href = 'home.html';
							}*/
                            //$window.location.href = 'home.html';
						}
						loginInit();
					}else{
						$scope.error = response.msg
					}
				},
				function(error) {
					console.log(error);
				}
			);
        }
       /* imagedExeService.startUpImagedExe({},function (res) {

        });*/

    };
}]);

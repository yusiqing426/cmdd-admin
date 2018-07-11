'use strict'
var isRemote = false;
/*var LODOP = getCLodop();
var strResult=LODOP.GET_SYSTEM_INFO("NetworkAdapter.1.IPAddress");
alert(strResult)*/
//$.getJSON("http://47.94.101.5:8080/api")

var apiHost ="http://localhost:8082/api"
//var apiHost = "http://127.0.0.1:8082/api"

var remoteApiHost = "http://47.94.101.5:8080/api"
//var remoteApiHost = "http://127.0.0.1:8081/cmdd"

var loginApp = angular.module('loginApp', [
    'ngRoute',
    'ngResource',
    'loginModule',
    'loginService',
    'versionService',
    'dining_tableService',
    'categoryService',
    'productService',
    'shopInformationService',
    'syncService'
])

loginApp.run(function ($rootScope) {
  $rootScope.apiHost = isRemote?apiHost:remoteApiHost;
  $rootScope.isRemote = isRemote;
})

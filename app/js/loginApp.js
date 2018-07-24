'use strict'


var isRemote = false;

var apiHost ="http://local_net_ip:8082/api"
var remoteApiHost = "http://47.94.101.5:8080/api"



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
    'syncService',
    'imagedExeService',
    'ipService',
    'bannerService'
])

loginApp.run(function ($rootScope) {
    $rootScope.apiHost = isRemote?apiHost:remoteApiHost;
    $rootScope.isRemote = isRemote;
})

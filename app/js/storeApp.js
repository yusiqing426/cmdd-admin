'use strict'

var isRemote = false;

var apiHost ="http://localhost:8082/api"

var remoteApiHost = "http://47.94.101.5:8080/api"
//var remoteApiHost = "http://127.0.0.1:8081/cmdd"
//var apiHost = "http://47.92.82.105/api"
//var apiHost = "http://192.168.1.108:9080/api"
//var apiHost = "http://test-api.lbcy.com.cn/apid"
//var apiHost = "http://test-admin.lbcy.com.cn:9080"





//var apiHost = "http://cmdd-api.chanmaodd.com/apid"




var storeApp = angular.module('storeApp', [
  'ngRoute',
  'ngResource',
  'navigatorModule',
  'navigatorService',
  'angular-md5',

  'platformAccountModule',
  'platformAccountService',

  'agentInformationModule',
  'agentInformationService',

  'agentPayModule',
  'agentPayService',

  'shopInformationModule',
  'shopInformationService',

  'shopPayModule',
  'shopPayService',

  'staffInformationModule',
  'staffInformationService',

  'bannerModule',
  'bannerService',

  'kitchenModule',
  'kitchenService',

  'lotteryModule',
  'lotteryService',

  'lotteryLogModule',
  'lotteryLogService',

  'memberInformationModule',
  'memberInformationService',

  'tableOperateModule',
  'tableOperateService',

  'dining_tableModule',
  'dining_tableService',
  
  'categoryModule',
  'categoryService',
  
  'productModule',
  'productService',
  
  'printerModule',
  'printerService',

  'orderLogModule',
  'orderLogService',

  'imageService',
  'dataUtilService',

    "syncService"


])

storeApp.run(function ($rootScope) {
    $rootScope.apiHost = apiHost;
    isRemote?$rootScope.remoteApiHost = apiHost: remoteApiHost;
})

storeApp.config(['$httpProvider',
  function ($httpProvider) {
      $httpProvider.defaults.withCredentials = true;

    function myPromis (promise) {
      return promise.then(function (response) {

        if (response.data && response.data.code && response.data.code == 401) {
         //console.log('需要登录')
          window.location = './index.html'
        }
        else if (response.data && response.data.code && response.data.code == 403) {
          alert('权限不够')
          return response
        }
        else if (response.data && response.data.code && response.data.code == 500) {
         //console.log(response.data.msg)
          return response
        }
        else if (response.data && response.data.code && response.data.code == 200) {
          return response
        } else {
          return response
        }
      }, function (response) {
        return $q.reject('服务器内部错误')
      })
    }
    $httpProvider.responseInterceptors.push(function ($q) {
      return myPromis
    })
  } ])

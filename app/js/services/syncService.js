'use strict'

var syncService = angular.module('syncService', ['ngResource'])

syncService.factory('syncService', function ($resource) {
	return $resource({}, {}, {
		//order
		orderSyncList_local:{
			method: 'GET',
			url: apiHost + '/order/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
			headers: {
				'X-Auth-Token': localStorage.getItem('token')
			}
		},
		orderInsertById_remote:{
			method:'POST',
			url:remoteApiHost + "/order/id",
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
		},
        orderInsertById_local: {
            method: 'PUT',
            url: apiHost + '/orders/id',
            params: {id: '@id'},
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
		//order_item
        orderItemSyncList_local: {
            method: 'GET',
            url: apiHost + '/order_item/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        orderItemInsertById_remote: {
            method: 'POST',
            url: remoteApiHost + '/order_item/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        orderItemInsertById_local: {
            method: 'POST',
            url: apiHost + '/order_item/id',
            params: {id: '@id'},
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //staff
       staffSyncList: {
            method: 'GET',
            url: apiHost + '/staff/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        staffCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/staff/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        staffCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/staff/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }
        ,
        //member
        memberSyncList: {
            method: 'GET',
            url: apiHost + '/member/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/member/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/member/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }
        ,
        //memberIntegral
        memberIntegralSyncList: {
            method: 'GET',
            url: apiHost + '/member_integral/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberIntegralCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/member_integral/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberIntegralCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/member_integral/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }
        ,
        //memberIntegral
        memberLotteryLogSyncList: {
            method: 'GET',
            url: apiHost + '/member_lottery_log/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberLotteryLogCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/member_lottery_log/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberLotteryLogCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/member_lottery_log/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //memberCard
        memberCardSyncList: {
            method: 'GET',
            url: apiHost + '/member_card/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberCardCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/member_card/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberCardCreateOrUpdateLocal:{
            method: 'POST',
            url: apiHost+'/member_card/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //member_recharge_log
        memberRechargeLogSyncList: {
            method: 'GET',
            url: apiHost + '/member_recharge_log/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberRechargeLogCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/member_recharge_log/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        memberRechargeLogCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/member_recharge_log/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //staff
        staffSyncList: {
            method: 'GET',
            url: apiHost + '/staff/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        staffCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/staff/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        staffCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/staff/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //user
        userSyncList: {
            method: 'GET',
            url: apiHost + '/user/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        userCreateOrUpdate_remote:{
            method: 'POST',
            url: remoteApiHost+'/user/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        userCreateOrUpdate:{
            method: 'POST',
            url: apiHost+'/user/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //category
        categorySyncList_local: {
            method: 'GET',
            url: apiHost + '/category/shop/'+localStorage.getItem('shop_id')+'/isUpload/:id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        categoryInsertById_remote:{
            method: 'POST',
            url: remoteApiHost+'/category/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        categoryInsertById_local:{
            method: 'POST',
            url: apiHost+'/category/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        //image
        imageSyncList_remote:{
            method:'GET',
            url:remoteApiHost+'/image/shop/'+localStorage.getItem('shop_id')+'/sync_status',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        imageInsertById_local:{
            method:'POST',
            url:apiHost+'/image/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        },
        imageInsertById_remote:{
            method:'POST',
            url:remoteApiHost+'/image/id',
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }
    })
})
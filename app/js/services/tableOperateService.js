'use strict'


var tableOperateService = angular.module('tableOperateService', ['ngResource'])

tableOperateService.factory('tableOperateService', function ($resource) {
  
  return $resource(apiHost + '/dining-table/:id', {}, {

  	uploadList:{
    	method:'GET',
    	url:apiHost+'/isUpload', 		
    	headers:{
    		'X-Auth-Token': localStorage.getItem('token')
    	}
    },

  	updateIsUpload:{
    	method:'PUT',
    	url:apiHost+'/isUpload/:id',
  		params:{id:'@id'},
    	headers:{
    		'X-Auth-Token': localStorage.getItem('token')
    	}
    },

    /*remoteOrderCreate: {
		method: 'POST',
		url: remoteApiHost + '/orders',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
*/
    /*开桌*/
    openTable:{
    	method:'PUT',
    	url:apiHost+'/openTable/diningTable/:diningTableId',
  		params:{id111:'@diningTableId'},
    	headers:{
    		'X-Auth-Token': localStorage.getItem('token')
    	}
    },
    
  	resetOrderPno:{
  		method:'PUT',
  		url:apiHost+'/order/resetOrderPno/shop/'+localStorage.getItem('shop_id'),
  		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
  	},

	tableList: {
		method: 'GET',
		url: apiHost + '/shop/'+localStorage.getItem('shop_id')+'/dining-table/list',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	tableView: {
		method: 'GET',
		params: {id: '@id'},
		isArray: false,
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	tableUpdate: {
		method: 'PUT',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	categoryList: {
		method: 'GET',
		url: apiHost + '/shop/'+localStorage.getItem('shop_id')+'/category/list',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	productList: {
		method: 'GET',
		url: apiHost + '/category/:id/product/list',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	productAllList: {
		method: 'GET',
		url: apiHost + '/shop/'+localStorage.getItem('shop_id')+'/product/list',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderDetail: {
		method: 'GET',
		url: apiHost + '/dining-table/:id/orders',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderCreate: {
		method: 'POST',
		url: apiHost + '/orders',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderUpdate: {
		method: 'PUT',
		url: apiHost + '/orders/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderDelete: {
		method: 'DELETE',
		url: apiHost + '/orders/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderProductCreate: {
		method: 'POST',
		url: apiHost + '/order-product',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderProductUpdate: {
		method: 'PUT',
		url: apiHost + '/order-product/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderProductDelete: {
		method: 'DELETE',
		url: apiHost + '/order-product/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	callServiceList: {
		method: 'GET',
		url: apiHost + '/shop/'+localStorage.getItem('shop_id')+'/call-service/list',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	callServiceCreate: {
		method: 'POST',
		url: apiHost + '/call-service'
	},
	callServiceUpdate: {
		method: 'PUT',
		url: apiHost + '/call-service/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	callServiceDelete: {
		method: 'DELETE',
		url: apiHost + '/call-service/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
    memberList:{
		method:'GET',
		url:apiHost+'/shop/'+localStorage.getItem('shop_id')+'/member/list',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
    },
    memberRecharge:{
		method:'POST',
		url:apiHost+'/member-recharge',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
    },
    memberUpdate: {
		method: 'PUT',
		url:apiHost+'/member/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
    },
	lotteryOrder: {
		method: 'GET',
		url:apiHost+'/lottery-order/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	lotteryDelete: {
		method: 'DELETE',
		url:apiHost+'/lottery-phone/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	printJobList:{
		method:'GET',
		url:apiHost+'/shop/'+localStorage.getItem('shop_id')+'/print_job/list',		
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}	
	},
	printerProductCreate: {
		method: 'POST',
		url: apiHost + '/print_job',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	deletePrintJob:{
		method:'DELETE',
		url:apiHost+'/deletePrintJob/:id',
		params:{id:'@id'},
		headers:{
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	mergeOrder: {
		method: 'PUT',
		url: apiHost + '/merge_order',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderDetailById: {
		method: 'GET',
		url: apiHost + '/orders/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
	orderPay: {
		method: 'PUT',
		url: apiHost + '/orders/balance_book',
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	},
    memberIntegralList : {
      method: 'GET',
      url:apiHost+'/member/member_integral/shop_id/'+localStorage.getItem('shop_id'),       
      headers: {
        'X-Auth-Token': localStorage.getItem('token')
      }
    },
	clearDiningTable: {
		method: 'PUT',
		url: apiHost + '/clearDiningTable/diningTable/:id',
		params: {id: '@id'},
		headers: {
			'X-Auth-Token': localStorage.getItem('token')
		}
	}
  })
})

'use strict'

var ipService = angular.module('ipService', ['ngResource'])

ipService.factory('ipService', function ($resource) {
	return $resource(apiHost + '/version', {}, {
		//remote
        saveById: {
			method: 'POST',
			url: remoteApiHost+'/ip/saveById',
			params:{version:'@version'},
			headers: {
				'X-Auth-Token': localStorage.getItem('token')
			}
		},
		//local
        checkAndSet: {
            method: 'GET',
            url: "http://127.0.0.1:8082/api/ip/checkAndSet/shop/:id",
			params:{id:"@id"},
            headers: {
                'X-Auth-Token': localStorage.getItem('token')
            }
        }

	})
})
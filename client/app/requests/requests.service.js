'use strict';
angular.module('cerveceriaApp').factory('reqservice', function(){
  var reqservice = {};

  reqservice.list = [];
  
  reqservice.edit = function(request){
    reqservice.list.push({id: request._id, beer_name: request.beer_name, client_id: request.client_id, 
    client_name: request.client_name, keg_size: request.keg_size, notes: request.notes, order_price: request.order_price,
    status: request.status, timestamp: request.timestamp, total_kegs: request.total_kegs });
  };

  /*beers.get = function(){
  	return beers.list;
  }*/

  reqservice.clean = function(){
  	reqservice.list = [];
  }
  
  return reqservice;
});
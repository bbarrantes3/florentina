'use strict';
angular.module('cerveceriaApp').factory('adminservice', function(){
  var adminservice = {};

  adminservice.list = [];
  
  adminservice.edit = function(user){
    adminservice.list.push({id: user._id, name: user.name, client_name: user.client_name, address: user.address, email: user.email });
  };

  adminservice.clean = function(){
  	adminservice.list = [];
  }
  
  return adminservice;
});
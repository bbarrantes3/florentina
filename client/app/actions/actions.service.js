'use strict';
angular.module('cerveceriaApp').factory('beers', function(){
  var beers = {};

  beers.list = [];
  
  beers.edit = function(beer){
    beers.list.push({id: beer._id, name: beer.name, info: beer.info });
  };

  /*beers.get = function(){
  	return beers.list;
  }*/

  beers.clean = function(){
  	beers.list = [];
  }
  
  return beers;
});
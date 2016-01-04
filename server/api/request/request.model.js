'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var RequestSchema = new Schema({
  	total_kegs: Number,
	keg_size: Number,
	beer_name: String,
	notes: String,
	status: String,
	timestamp: { type: Date, default: Date.now },
	client_name: String,
	client_id: String,
	order_price: Number
});

module.exports = mongoose.model('Request', RequestSchema);

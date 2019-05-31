const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const _ = require('lodash');

var dishesSchema = mongoose.Schema({
	name: {type: String},
	ingredients: [],
	timetomake: {type: String},
	imgname: {type: String},
	category: {type: String},
	description: {type: String}
});

var dishes = mongoose.model('dishes', dishesSchema);
module.exports = { dishes };

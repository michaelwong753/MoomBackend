var mongoose = require('mongoose')

//Schema Setup
var userSchema = mongoose.Schema({
	mallName:{
		type: Array
	},
	pasarName:{
		type: Array
	},
	delete:{
		type: String
	}

})

//Export Schema
var mall = module.exports = mongoose.model('mall', userSchema)

module.exports.get = function(callback, limit){
	mall.find(callback).limit(limit)
}


var mongoose = require('mongoose')

//Schema Setup
var userSchema = mongoose.Schema({
	username:{
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true
	}
})

//Export Schema
var user = module.exports = mongoose.model('user', userSchema)

module.exports.get = function(callback, limit){
	user.find(callback).limit(limit)
}
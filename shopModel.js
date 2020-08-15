var mongoose = require('mongoose')

var shopSchema = mongoose.Schema ({

	detail:{

		name: {
			type: String
		},

		product:[{
			price:{
				type: Number
			},
			name:{
				type: String
			},
			link:{
				type: String
			}
		}],
		link: {
			type: String
		},
		category:{
			type: String
		},
		location:{
			type: String
		},
		hour:{
			type: String
		},
		number:{
			type: String
		},
		website:{
			type: String
		},
		review:[{
			name:{
				type: String
			},
			rating:{
				type: Number
			},
			text:{
				type: String
			}
		}]
	}
})

//Export Schema
var shop = module.exports = mongoose.model('shop', shopSchema)

module.exports.get = function(callback, limit){
	shop.find(callback).limit(limit)
}


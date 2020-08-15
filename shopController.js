Shop = require('./shopModel')

exports.index = function (req,res) {
	Shop.get(function (err,shop) {
		if (err){
			res.send("Error")
		}
		res.json({
			message: "User retrieved succesfully",
			data: shop
		})
	})
}


exports.new = function (req,res){
	var shop = new Shop()
	var productNum = req.body.productNumber
	var reviewNum = req.body.reviewNum

	for(i = 0;i < productNum;i++){
		let objA = {
			name: req.body.product[i],
			price: req.body.product[i+(productNum*1)],
			link: req.body.product[i+(productNum*2)]
		}
		shop.detail.product[i] = objA
	}

	shop.detail.name = req.body.shopName
	shop.detail.link = req.body.shopLink
	shop.detail.category = req.body.category
	shop.detail.location = req.body.location
	shop.detail.hour = req.body.hour
	shop.detail.number = req.body.number
	shop.detail.website = req.body.website

	for(i=0;i<reviewNum;i++){
		let objB = {
			name: req.body.review[i],
			rating: req.body.review[i+(reviewNum*1)],
			text: req.body.review[i+(reviewNum*2)]
		}
		shop.detail.review[i] = objB
	}


	shop.save(function (err){
		if(err)
			res.json(err)
		res.json({
			message: "New shop created",
			data: shop
		})
	})
}
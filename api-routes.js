var router = require('express').Router()

router.get('/', function(req,res){
	res.json({
		status: "API is working"
	})
})

var userController = require('./userController')
var mallController = require('./mallController')
var shopController = require('./shopController')


router.route('/shop')
	.get(shopController.index)
	.post(shopController.new)

router.route('/user')
	.get(userController.index)
	.post(userController.new)

router.route('/verification')
	.post(userController.find)

router.route('/mall_pasar')
	.get(mallController.index)
	.post(mallController.new)
	.delete(mallController.delete)

router.route('/user/:user_id')
	.get(userController.view)
	.delete(userController.delete)

module.exports = router;
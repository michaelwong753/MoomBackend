User = require('./userModel')

exports.index = function (req,res) {
	User.get(function (err,users) {
		if (err){
			res.send("Error")
		}
		res.json({
			message: "User retrieved succesfully",
			data: users
		})
	})
}

exports.new = function (req,res){
	var user = new User()
	user.username = req.body.username
	user.password = req.body.password

	user.save(function (err){
		if(err)
			res.json(err)
		res.json({
			message: "New user created",
			data: user
		})
	})
}

exports.find = function (req,res){
	User.find({username: req.body.username, password: req.body.password}, function(err,user){
		if(err)
			res.send(err)
		else{
			if(user.length != 0){
				res.json({
					message: "Access granted",
					data: user
				})
			}
			else
				res.send("Access denied!")
		}
	})
}



exports.view = function (req,res){
	User.findById(req.params.user_id, function(err, user){
		if (err)
			res.send(err)
		else{
		res.json({
			message: "The detail info of the user:",
			data: user
		})
		}
	})
}


exports.delete = function(req,res){
	User.remove({
		username: req.params.user_id
	}, function(err, user){
		if (err)
			res.send(err)
		res.json({
			status:"success"
		})
	})
}
Mall = require('./mallModel')

exports.index = function (req,res) {
	Mall.get(function (err,mall) {
		if (err){
			res.send("Error")
		}
		res.json({
			message: "Data retrieved succesfully",
			data: mall
		})
	})
}

exports.new = async function (req,res){
	var mall = new Mall()
	const {Client, Status} = require("@googlemaps/google-maps-services-js");
	const client = new Client({});

	//List of Malls
	 var temp1 = client.placesNearby({
		params: {
			location: [req.body.latitudeMall, req.body.longitudeMall],
			rankby: "distance",
			name: "mall",
			key: 'AIzaSyCbHgfJMKK9uLWW3FBLQzfoD7V8fEjVcik'
		},
		timeout: 1000,
		})
		.then((r) => {
			let mall  = []
			for (i = 0; i < r.data.results.length; i++) {
				if(r.data.results[i].user_ratings_total > 900)
				{
					mall.push(r.data.results[i].name)
				}
			}
			return mall

		})
		.catch((e) => {
		    console.log(e.response.data.error_message);
		});


	//List of Pasar
	var temp2 = client.placesNearby({
		params: {
			location: [req.body.latitudePasar, req.body.longitudePasar],
			rankby: "distance",
			name: "pasar",
			key: 'AIzaSyCbHgfJMKK9uLWW3FBLQzfoD7V8fEjVcik'
		},
		timeout: 1000,
	})
	.then((r) => {

		let pasar = []
		for (i = 0; i < r.data.results.length; i++) {
			let market = (r.data.results[i].name).toLowerCase()
			if(market.includes("pasar") || market.includes("market") || market.includes("plaza"))
				pasar.push(r.data.results[i].name)
		}
		return pasar
	})
	.catch((e) => {	
	    console.log(e.response.data.error_message);
	});


	var mallList = await temp1
	var pasarList = await temp2
	
	//Assign list to array
	mall.mallName = mallList
	mall.pasarName = pasarList
	mall.delete = 'true'
	      
	console.log(mallList)

	//Save to db
	mall.save(function (err){
		if(err)
			res.json(err)
			res.json({
				message: "New user created",
				data: mall
			})
		})
			
}


exports.delete = function(req,res){
	Mall.deleteMany({
		delete: req.body.del
	}, function(err, user){
		if (err)
			res.send(err)
		res.json({
			status:"success"
		})
	})

}
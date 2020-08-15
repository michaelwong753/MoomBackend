var express = require("express");
var app = express();
var apiRoutes = require("./api-routes")
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 8000 

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/resthub', { useNewUrlParser: true});
var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")



app.get("/", (req, res, next) => {
	 res.send("main page")
});

app.listen(port, function(){
	console.log("Running on port" + port)
})

app.use ('/api', apiRoutes)
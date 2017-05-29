var express = require("express");
var router = express.Router();
console.log("in index")
router.get('/',function(req,res,next){
	// res.send("HIIII from ./routes/index.js");
	res.render("index");
	console.log("in get router")

	 // res.send("HIIIIIIII");
	// next();
	// res.render("index",{title : "express title"});
})

module.exports = router;

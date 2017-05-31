var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/register",function(req,res,next){
	res.render("register");
})

router.post("/register",function(req,res){
	// res.render("register");
	console.log("POST REQUEST ",req.body )
	var fisrtName = req.body.first_name ;
	var lastName = req.body.last_name ;
	var department =req.body.department ;
	var email	= req.body.email;
	var username =req.body.user_name ;
	var password  =req.body.user_password ;
	var confirmPass = req.body.confirm_password ;
	var phoneNum 	= req.body.contact_no;

	// req.checkBody('email','email is required').isEmpty();

	req.checkBody('user_name','user name is required').notEmpty();
	req.checkBody('user_password','password is required').notEmpty();
	req.checkBody('confirm_password','password is required').equals(req.body.user_password);


	var errors = req.validationErrors();
	if(errors) {
		console.log("errors present\n",errors)
		res.render('register',{
			errors : errors
		});
	}
	else {
		console.log("errors not Present")
		models.users.createNewUser(req.body,function(err,user){
			if(err) throw err;
			console.log("redirecting to login ")

			res.redirect('/users/login');
		})

	}
})

router.get("/login",function(req,res,next){
	res.render("login");

})


module.exports = router;

var express  = require("express"),
path = require("path"),
logger = require("morgan"),
cookieParser = require("cookie-parser"),
bodyParser = require("body-parser"),
session = require("express-session"),
passport  = require("passport"),
localStrategy = require("passport-local").Strategy,
multer = require("multer"), // for file uploads
upload = multer({dest : "./uploads"}),
flash = require("connect-flash"),
expressValidator = require("express-validator"),
flash = require("connect-flash"),
exphbs = require("express-handlebars");

var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'me',
//   password : 'secret',
//   database : 'my_db'
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

var routes = require("./routes");
var users = require("./routes/users");

var  app = express();
console.log("path",path.join(__dirname),"\n\n",__dirname)
app.set("views", path.join(__dirname) + "/views"); // handle my views
// app.set("view engine","jade");
app.engine("handlebars",exphbs({defaultLayout : "layouts"}));
app.set("view engine","handlebars");


// handle file uploads

// app.use(multer({dest : "./uploads"}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
	{
		extended : false
	}
	));

app.use(cookieParser());



 // stuff that publically accessible to browser
// app.use("/public",express.static(path.join(__dirname,"public"))); // stylesheet, jquery, images, etc...
	app.use(express.static(__dirname + '/public'));
// handle midleware for session
app.use(session({
	secret : "secret",
	saveUninitialized : true,
	resave : true
}))
// handle passport middleware init

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));




// global messages for flash mesages
// create global variables using 'res.locals'
// app.use(flash());
// app.use(function(req,res,next){
// 	console.log(req.url)
// 	// res.locals.messages = require("express-messages");
// 	res.locals.success_msg = req.flash("success_message");
// 	res.locals.error_msg = req.flash("error_message");
// 	res.locals.error = req.flash("error");   // passport has its own flash messages and it sets it to error
// 	// next();
// });


app.use('/',routes);
app.use('/users',users);

app.use(function(req,res,next){
	console.log("asdajskhd")
	var err = new Error("not found");
	err.status = 404;
	next(err);

});


app.set("port",(process.env.PORT || 2000));
console.log("process.env.PORT",process.env.PORT)

app.listen(app.get('port'), function(){
	console.log("server started on port "+app.get('port'));
});
// app.listen(2000, function(err) {
//     if(err){
//        console.log(err);
//        } else {
//        console.log("listen:2000");
//     }
// });


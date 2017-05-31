var mysql = require('mysql');
var bcrypt = require('bcryptjs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'new_password',
  database : 'my_db'
});

connection.connect( function(err){
	if(err) {
		console.log("connection error",err);
		return;
	}
	console.log("Connection established")
});

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
module.exports = { 

	createNewUser : function(newUser,callback) {

		bcrypt.genSalt(10).then(function(err,salt){

			bcrypt.hash(newUser.user_password,salt,function(err,hash){
				newUser.user_password = hash;
				console.log("THE HASH VALUER IS",newUser.user_password,'\n\n',hash)
				var username = newUser.user_name;
				var email = newUser.email;
				var password = newUser.user_password;
				var name = newUser.first_name;

				console.log("newUser",newUser)
				var queryString = "insert into users (username, email, password, name) values ('"+username+"', '"+email+"', '"+password+"', '"+name+"');"
				console.log("query string",queryString)
				connection.query(queryString,function(err,rows){
					if(err){
						console.log("error in query",err)
						return;
					}
					console.log("rows afected",rows);
					callback(err,rows)
				})


			})
		})
		console.log("createNewUser_createrNewUser");
		// connection.end();
		}
	}






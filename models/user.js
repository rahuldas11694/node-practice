var mysql = require('mysql');
var bcrypt = require('bcryptjs');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'new_password',
  database : 'my_db'
});

connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });
module.exports = { 

	createNewUser : function(newUser,callback) {

		bcrypt.getSalt(123).then(function(ree){
			
			bcrypt.hash(newUser.password,salt,function(err,hash){
				newUser.password = hash;
				console.log("THE HASH VALUER IS",hash)
				newUser.save(callback);
			})
		})
		console.log("createNewUser_createrNewUser");
connection.end();
		})
	}
}





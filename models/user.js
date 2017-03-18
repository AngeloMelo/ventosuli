var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


User = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

User.prototype.findById = function (userId, cb) {

	var query = this.client.query("SELECT * FROM users WHERE usr_id = " + userId );
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};

User.prototype.saveUser = function (user, res){

	if(!this.loginValid(user)) return res.status(500).json({success: false, data: 'Username already exists'});
	
	bcrypt.genSalt(10, function (err, salt) {
		if (err) {
			return next(err);
		}
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			try
			{
				client.query("INSERT INTO users (usr_login, usr_pass) values ('" + user.login + "','"+ user.password+"')");
			}
			catch(err)
			{
				return res.status(500).json({ success: false, data: err});
			}
		});
	});
};

		
User.prototype.next = function (err) {
	if(err){
		console.log('Error: ' + err);
	}
};




User.prototype.findByName = function (userName, cb) {

	var query = this.client.query("SELECT * FROM users WHERE usr_login = '" + userName + "'");
	var result = undefined;
	
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


User.prototype.loginValid = function (user) {

	var query = this.client.query("SELECT * FROM users WHERE usr_login = '" + user.login + "'");
	var result = undefined;
	
	query.on('row', function(row) {
		result = row;		
	});
	
	query.on('end', function(){
		if(result){
			console.log("found user with this login: " + row.usr_login);
			return false;
		}
		else{
			return true;
		}
	});
};

User.prototype.comparePassword = function (passw, usrpassw, cb) {
    bcrypt.compare(passw, usrpassw, function (err, isMatch) {
	
        if (err) {
			
            return cb(err, null);
        }
		
        cb(undefined, isMatch);
    });
};


module.exports = new User();
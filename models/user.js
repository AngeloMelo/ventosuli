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

User.prototype.loginValid = function (userName, cb) {

	var query = this.client.query("SELECT * FROM users WHERE usr_login = '" + userName + "'");
	var result = undefined;
	
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		return cb(result);
	});
};

User.prototype.saveUser = function (user, res){

	var client = this.client;
	this.loginValid(user.login, function(usr){
	
		if(usr) return res.json({success: false, msg: 'Username already exists'});
		
		bcrypt.genSalt(10, function (err, salt) {
			if (err) {
				console.log(err);
				return res.status(500).json({ success: false, msg: err});
			}
			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) {
					console.log(err);
					return res.status(500).json({ success: false, msg: err});
				}
				
				try
				{
					client.query("INSERT INTO users (usr_login, usr_pass) values ('" + user.login + "','"+ hash +"')");
				}
				catch(err)
				{
					console.log(err);
					return res.status(500).json({ success: false, msg: err});
				}
				return res.json({success: true, msg: 'User created'});
			});
		});
	});	
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




User.prototype.comparePassword = function (passw, usrpassw, cb) {
    bcrypt.compare(passw, usrpassw, function (err, isMatch) {
	
        if (err) {
			
            return cb(err, null);
        }
		
        cb(undefined, isMatch);
    });
};


module.exports = new User();
var JwtStrategy = require('passport-jwt').Strategy;
 
// load up the user model
var User = require('../models/user');

// get db config file
var config = require('../config/database'); 
 
module.exports = function(passport) {
	var opts = {};
	opts.secretOrKey = config.secret;
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  
		//replaced user id column
		User.findById(jwt_payload.usr_id, function(err, user) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}
		});
	}));
};
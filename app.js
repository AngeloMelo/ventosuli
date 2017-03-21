var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var passport   = require('passport');
var jwt        = require('jwt-simple');
var User       = require('./models/user');
var config     = require('./config/database');
var tokenUtil  = require('./config/token');
var port       = process.env.PORT || 9000;


//configuring body parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//configuring logging
app.use(morgan('dev'));

//configuring passport
app.use(passport.initialize());
require('./config/passport')(passport);


//configuring frontend folder
app.use(express.static(__dirname + '/frontend'));

//handling root requests
app.get('/', function(req, res){
	res.send('API avaliable at http://localhost/'+ port +'/api');
});

//configuring routes
var apiRoutes = express.Router();

//endpoint to authenticate a user
apiRoutes.post('/login', function(req, res) {

	User.findByName(req.body.name, function(err, user) {
	
		if (!user) {
			res.send({success: false, msg: 'Authentication failed. User not found.'});
		} else {
			// check if password matches
			User.comparePassword(req.body.password, user.usr_pass, function (err, isMatch) {
				if (isMatch && !err) {
					// if user is found and password is right create a token
					var token = jwt.encode(user, config.secret);
					
					// return the information including token as JSON
					res.json({success: true, token: 'JWT ' + token});
				} else {
					res.send({success: false, msg: 'Authentication failed. Wrong password.'});
				}
			});
		}
	});
});

//endpoint to create new user
apiRoutes.post('/signup', function(req, res) {
	
	if (!req.body.name || !req.body.password) {
	
		res.json({success: false, msg: 'Please pass name and password.'});
	
	} else {	
	
		var newUser = {
		  login: req.body.name,
		  password: req.body.password
		};
		// save the user
		User.saveUser(newUser, res);
	}
});

//endpoint to show all photos
apiRoutes.get('/photos', function(req, res){
	res.send('photos');
});


//endpoit to test private area
apiRoutes.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
	var token = tokenUtil.getToken(req.headers);
	if (token) {
		var decoded = jwt.decode(token, config.secret);
		var userName = decoded.usr_login;
		
		User.findByName(userName, function(err, user) {
	
			if (!user) {
				return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
			} else {
				res.json({success: true, msg: 'Welcome in the member area ' + userName + '!'});
			}
			
		});
	} else {
		return res.status(403).send({success: false, msg: 'No token provided.'});
	}
});


//configuring all routes under /api/*
app.use('/api', apiRoutes);

app.listen(port);
console.log('server is running...');
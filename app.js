var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var morgan          = require('morgan');
var passport        = require('passport');
var jwt             = require('jwt-simple');
var User            = require('./models/user');
var AircraftDAO     = require('./models/aircraft');
var OperatorDAO     = require('./models/operators');
var PhotographerDAO = require('./models/photographers');
var config          = require('./config/database');
var tokenUtil       = require('./config/token');
var port            = process.env.PORT || 9000;


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


//----------------------------
//Endpoints for aircraft
//----------------------------
app.get('/api/aircrafts', function(req, res){

	AircraftDAO.getAll(function(err, results){
		return res.json(results);
	});

});

app.get('/api/aircrafts/:id', function(req, res){

	var id = req.params.id;
	AircraftDAO.findById(id, function(err, result){
		return res.json(result);
	});

});

app.delete('/api/aircrafts/:id', function(req, res){

	var id = req.params.id;
	AircraftDAO.remove(id, function(err, result){
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Aircraft deleted'});
		}
	});

});

app.put('/api/aircrafts/:id', function(req, res){

	var id = req.params.id;
	var aircraft = req.body;
	aircraft.aircraft_id = id;
	
	AircraftDAO.update(aircraft, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Aircraft updated'});
		}
	});

});

app.post('/api/aircrafts', function(req, res){

	var aircraft = req.body;
	
	AircraftDAO.add(aircraft, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Aircraft created'});
		}
	});

});

//----------------------------
//Endpoints for operator
//----------------------------
app.get('/api/operators', function(req, res){

	OperatorDAO.getAll(function(err, results){
		return res.json(results);
	});

});

app.get('/api/operators/:id', function(req, res){

	var id = req.params.id;
	OperatorDAO.findById(id, function(err, result){
		return res.json(result);
	});

});

app.delete('/api/operators/:id', function(req, res){

	var id = req.params.id;
	OperatorDAO.remove(id, function(err, result){
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Operator deleted'});
		}
	});

});

app.put('/api/operators/:id', function(req, res){

	var id = req.params.id;
	var operator = req.body;
	operator.operator_id = id;
	
	OperatorDAO.update(operator, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Operator updated'});
		}
	});

});

app.post('/api/operators', function(req, res){

	var operator = req.body;
	
	OperatorDAO.add(operator, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Operator created'});
		}
	});

});



//----------------------------
//Endpoints for photographer
//----------------------------
app.get('/api/photographers', function(req, res){

	PhotographerDAO.getAll(function(err, results){
		return res.json(results);
	});

});

app.get('/api/photographers/:id', function(req, res){

	var id = req.params.id;
	PhotographerDAO.findById(id, function(err, result){
		return res.json(result);
	});

});

app.delete('/api/photographers/:id', function(req, res){

	var id = req.params.id;
	PhotographerDAO.remove(id, function(err, result){
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Photographer deleted'});
		}
	});

});

app.put('/api/photographers/:id', function(req, res){

	var id = req.params.id;
	var photographer = req.body;
	photographer.photographer_id = id;
	
	PhotographerDAO.update(photographer, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Photographer updated'});
		}
	});

});

app.post('/api/photographers', function(req, res){

	var photographer = req.body;
	
	PhotographerDAO.add(photographer, function(err, result){
		
		if(err){
			return res.json({ success: false, msg: err});
		} else {
			return res.json({success: true, msg: 'Photographer created'});
		}
	});

});


//configuring all routes under /api/*
app.use('/api', apiRoutes);

app.listen(port);
console.log('server is running...');
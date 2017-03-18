var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var passport   = require('passport');
var port       = process.env.PORT || 8080;


//configuring body parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

//configuring logging
app.use(morgan('dev'));

//configuring passport
app.use(passport.initialize());
require('./config/passport')(passport);

//handling root requests
app.get('/', function(req, res){
	res.send('API avaliable at http://localhost/'+ port +'/api');
});

//configuring routes
var apiRoutes = express.Router();

//endpoint to authenticate a user
apiRoutes.post('/authenticate', function(req, res) {
	res.send('login');
});

//endpoint to create new user
apiRoutes.post('/signup', function(req, res) {
	res.send('signup');
});

//endpoint to show all photos
apiRoutes.get('/photos', function(req, res){
	res.send('photos');
});

//configuring all routes under /api/*
app.use('/api', apiRoutes);

app.listen(port);
console.log('server is running...');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var port       = process.env.PORT || 8080;

//handling root requests
app.get('/', function(req, res){
	res.send('API avaliable at http://localhost/'+ port +'/api');
});

//endpoint to photos
app.get('/api/photos', function(req, res){
	res.send('photos');
});



app.listen(port);
console.log('server is running...');
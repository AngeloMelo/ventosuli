var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


PhotographerDAO = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

PhotographerDAO.prototype.findById = function (id, cb) {

	var query = this.client.query("SELECT photographer_id, photographer_nm, photographer_email FROM photographer WHERE photographer_id = " + id );
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


PhotographerDAO.prototype.add = function (photographer, cb){

	var errMsg = null;
	try
	{
		this.client.query("INSERT INTO photographer(photographer_nm, photographer_email) VALUES('" + photographer.photographer_nm + "','"+ photographer.photographer_email +"')");
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, photographer);
		
};


PhotographerDAO.prototype.update = function (photographer, cb){

	var errMsg = null;
	try
	{	
		this.client.query("UPDATE photographer SET photographer_nm = '" + photographer.photographer_nm + "', photographer_email = '"+ photographer.photographer_email +"' WHERE photographer_id = "+ photographer.photographer_id);
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, photographer);
	
};


PhotographerDAO.prototype.remove = function (id, cb){

	var errMsg = null;
	try
	{
		this.client.query("DELETE FROM photographer WHERE photographer_id = "+ id );
	}
	catch(err)
	{
		errMsg = err.message;
	}

	return cb(errMsg, id);		
};


PhotographerDAO.prototype.getAll = function (cb) {

	var results = [];
	
	var query = this.client.query("SELECT photographer_id, photographer_nm, photographer_email FROM photographer");
	
	query.on('row', function(row) {
		results.push(row);	
	});
	
	query.on('end', function(){
		cb(undefined, results);
	});
};



module.exports = new PhotographerDAO();
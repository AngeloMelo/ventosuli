var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


AircraftDAO = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

AircraftDAO.prototype.findById = function (id, cb) {

	var query = this.client.query("SELECT aircraft_id, aircraft_cd, aircraft_de FROM aircraft WHERE aircraft_id = " + id );
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


AircraftDAO.prototype.add = function (aircraft, cb){

	var errMsg = null;
	try
	{
		this.client.query("INSERT INTO aircraft(aircraft_cd, aircraft_de) VALUES('" + aircraft.aircraft_cd + "','"+ aircraft.aircraft_de +"')");
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, aircraft);
		
};


AircraftDAO.prototype.update = function (aircraft, cb){

	var errMsg = null;
	try
	{	
		this.client.query("UPDATE aircraft SET aircraft_cd = '" + aircraft.aircraft_cd + "', aircraft_de = '"+ aircraft.aircraft_de +"' WHERE aircraft_id = "+ aircraft.aircraft_id);
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, aircraft);
	
};


AircraftDAO.prototype.remove = function (id, cb){

	var errMsg = null;
	try
	{
		this.client.query("DELETE FROM aircraft WHERE aircraft_id = "+ id );
	}
	catch(err)
	{
		errMsg = err.message;
	}

	return cb(errMsg, id);		
};


AircraftDAO.prototype.getAll = function (cb) {

	var results = [];
	
	var query = this.client.query("SELECT aircraft_id, aircraft_cd, aircraft_de FROM aircraft ORDER BY aircraft_de");
	
	query.on('row', function(row) {
		results.push(row);	
	});
	
	query.on('end', function(){
		cb(undefined, results);
	});
};



module.exports = new AircraftDAO();
var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


OperatorDAO = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

OperatorDAO.prototype.findById = function (id, cb) {

	var query = this.client.query("SELECT operator_id, operator_cd, operator_de FROM operators WHERE operator_id = " + id );
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


OperatorDAO.prototype.add = function (operator, cb){

	var errMsg = null;
	try
	{
		this.client.query("INSERT INTO operators(operator_cd, operator_de) VALUES('" + operator.operator_cd + "','"+ operator.operator_de +"')");
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, operator);
		
};


OperatorDAO.prototype.update = function (operator, cb){

	var errMsg = null;
	try
	{	
		this.client.query("UPDATE operators SET operator_cd = '" + operator.operator_cd + "', operator_de = '"+ operator.operator_de +"' WHERE operator_id = "+ operator.operator_id);
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, operator);
	
};


OperatorDAO.prototype.remove = function (id, cb){

	var errMsg = null;
	try
	{
		this.client.query("DELETE FROM operators WHERE operator_id = "+ id );
	}
	catch(err)
	{
		errMsg = err.message;
	}

	return cb(errMsg, id);		
};


OperatorDAO.prototype.getAll = function (cb) {

	var results = [];
	
	var query = this.client.query("SELECT operator_id, operator_cd, operator_de FROM operators");
	
	query.on('row', function(row) {
		results.push(row);	
	});
	
	query.on('end', function(){
		cb(undefined, results);
	});
};



module.exports = new OperatorDAO();
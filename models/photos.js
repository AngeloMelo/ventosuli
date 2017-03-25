var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


PhotoDAO = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

PhotoDAO.prototype.findById = function (id, cb) {

	var query = this.client.query("SELECT photographer_id, photographer_nm, photographer_email FROM photographer WHERE photographer_id = " + id );
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


PhotoDAO.prototype.add = function (photographer, cb){

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


PhotoDAO.prototype.update = function (photographer, cb){

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


PhotoDAO.prototype.remove = function (id, cb){

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


PhotoDAO.prototype.getAll = function (queryStr, cb) {

	var results = [];	
	
	var filter = "";
	if(queryStr.category_cd)
	{
		filter = filter + " and ph.category_cd =  " + queryStr.category_cd; 
	}		
	
	var strQuery = "select ph.photo_id, ph.photo_cd, ph.category_cd, ph.origin ,  "
        + " to_char(ph.photo_dt, 'DD/MM/YYYY') as photo_dt, ph.coments, ph.reg_cd, ph.shift_cd, ph.path_cd, ac.aircraft_de, pg.photographer_nm "
        + " from photos ph  "
		+ " LEFT OUTER JOIN operators op ON op.operator_id = ph.photo_id  "
		+ " LEFT OUTER JOIN aircraft ac ON ph.aircraft_id = ac.aircraft_id "
		+ " LEFT OUTER JOIN photographer pg ON ph.photographer_id = pg.photographer_id "
		+ " WHERE 1 = 1 "
        + filter
        + " ORDER BY ph.photo_dt DESC ";
	try{	
		var query = this.client.query(strQuery);
	} catch (err) {console.log(err.message);}
	
	query.on('row', function(row) {
		results.push(row);	
	});
	
	query.on('end', function(){
		cb(undefined, results);
	});
};



module.exports = new PhotoDAO();
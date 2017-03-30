var pg = require('pg');
var bcrypt = require('bcrypt');
var config = require('../config/database');


PhotoDAO = function(){
	this.client = new pg.Client(config.database);
	this.client.connect();
};

PhotoDAO.prototype.findById = function (id, cb) {

	var strQuery = "select photo_id, photo_cd, category_cd, origin ,  "
        + " to_char(photo_dt, 'YYYY-MM-DD') as photo_dt, coments, reg_cd, " 
		+ " shift_cd, path_cd, aircraft_id, photographer_id, operator_id, to_char(creation_dt, 'DD/MM/YYYY') as creation_dt "
        + " from photos ph  "
		+ " WHERE photo_id = "
        + id;
		
	var query = this.client.query(strQuery);
	
	var result = undefined;
	query.on('row', function(row) {
		result = row;	
	});
	
	query.on('end', function(){
		cb(undefined, result);
	});
};


PhotoDAO.prototype.add = function (photo, cb){

	var errMsg = null;
	try
	{
		var strQueryColumns = "";
		var strQueryValues = "";
		
		if(photo.operator_id) {
			strQueryColumns = strQueryColumns + " operator_id, ";
			strQueryValues = strQueryValues + " " + photo.operator_id + ",";
		}
		
		if(photo.aircraft_id) {
			strQueryColumns = strQueryColumns + " aircraft_id, ";
			strQueryValues = strQueryValues + " " + photo.aircraft_id + ",";
		}
		
		if(photo.photographer_id) {
			strQueryColumns = strQueryColumns + " photographer_id, ";
			strQueryValues = strQueryValues + " " + photo.photographer_id + ",";
		}

		if(!photo.shift_cd) {
			photo.shift_cd = 0;
		}
		strQueryColumns = strQueryColumns + " shift_cd, ";
		strQueryValues = strQueryValues + " " + photo.shift_cd + ",";

		if(photo.category_cd) {
			strQueryColumns = strQueryColumns + " category_cd, ";
			strQueryValues = strQueryValues + " " + photo.category_cd + ",";
		}

		if(photo.photo_cd) {
			strQueryColumns = strQueryColumns + " photo_cd, ";
			strQueryValues = strQueryValues + "'" + photo.photo_cd + "',";
		}

		if(photo.photo_dt) {
			strQueryColumns = strQueryColumns + " photo_dt, ";
			strQueryValues = strQueryValues + "'" + photo.photo_dt + "',";
		}

		if(photo.origin) {
			strQueryColumns = strQueryColumns + " origin, ";
			strQueryValues = strQueryValues + "'" + photo.origin + "',";
		}
		
		if(!photo.coments) {
			photo.coments = "";
		}
		strQueryColumns = strQueryColumns + " coments, ";
		strQueryValues = strQueryValues + "'" + photo.coments + "',";
		
		if(photo.reg_cd) {
			strQueryColumns = strQueryColumns + " reg_cd, ";
			strQueryValues = strQueryValues + "'" + photo.reg_cd + "',";
		}
		
		if(photo.path_cd) {
			strQueryColumns = strQueryColumns + " path_cd, ";
			strQueryValues = strQueryValues + "'" + photo.path_cd + "',";
		}
		
		strQueryColumns = strQueryColumns + " creation_dt ";
		strQueryValues = strQueryValues + "'" + formatDate(new Date()) + "'";
		
		var strQuery = " INSERT INTO photos( " + strQueryColumns + ") VALUES (" + strQueryValues + ")";
		
		console.log('sql:' + strQuery);

		
		this.client.query(strQuery);
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, photo);
		
};


function formatDate(date)
{
	var day = Number(date.getDate());
	var month = Number(date.getMonth()) + 1;
	var year = Number(date.getFullYear());
	
	var result = year + '-';

	if(month <10) result = result + '0';
	result = result + month + '-' ;

	if(day <10) result = result + '0';
	result = result + day;
	
	return result;
}



PhotoDAO.prototype.update = function (photo, cb){

	var errMsg = null;
	try
	{	
	
		var strQuery = "UPDATE photos SET ";
		
		if(photo.operator_id) {
			strQuery = strQuery + " operator_id = " + photo.operator_id + ",";
		}
		
		if(photo.aircraft_id) {
			strQuery = strQuery + " aircraft_id = " + photo.aircraft_id + ",";
		}
		
		if(photo.photographer_id) {
			strQuery = strQuery + " photographer_id = " + photo.photographer_id + ",";
		}

		if(photo.category_cd) {
			strQuery = strQuery + " category_cd = " + photo.category_cd + ",";
		}

		if(photo.photo_dt) {
			strQuery = strQuery + " photo_dt = " + "'" + photo.photo_dt + "',";
		}

		if(photo.origin) {
			strQuery = strQuery + " origin = " + "'" + photo.origin + "',";
		}
		
		if(photo.coments) {
			strQuery = strQuery + " coments = " + "'" + photo.coments + "',";
		}
		
		if(photo.reg_cd) {
			strQuery = strQuery + " reg_cd = " + "'" + photo.reg_cd + "',";
		}
		
		if(!photo.shift_cd) {
			photo.shift_cd = 0;
		}
		strQuery = strQuery + " shift_cd = "  + photo.shift_cd;
		strQuery = strQuery + " WHERE photo_id = "  + photo.photo_id;
		
		console.log('sql:' + strQuery);

		
		this.client.query(strQuery);
		
		
	
		this.client.query(strQuery);
	}
	catch(err)
	{
		errMsg = err.message;
	}
	
	return cb(errMsg, photo);
	
};


PhotoDAO.prototype.remove = function (id, cb){

	var errMsg = null;
	try
	{
		this.client.query("DELETE FROM photos WHERE photo_id = "+ id );
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
        + " to_char(ph.photo_dt, 'DD/MM/YYYY') as photo_dt, ph.coments, ph.reg_cd, " 
		+ " ph.shift_cd, ph.path_cd, ac.aircraft_de, pg.photographer_nm, to_char(ph.creation_dt, 'DD/MM/YYYY') as creation_dt "
        + " from photos ph  "
		+ " LEFT OUTER JOIN operators op ON op.operator_id = ph.photo_id  "
		+ " LEFT OUTER JOIN aircraft ac ON ph.aircraft_id = ac.aircraft_id "
		+ " LEFT OUTER JOIN photographer pg ON ph.photographer_id = pg.photographer_id "
		+ " WHERE 1 = 1 "
        + filter
        + " ORDER BY ph.photo_dt DESC ";
		
		console.log(strQuery)
		
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
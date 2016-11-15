var mongoose = require('mongoose');

exports.db_connect = function()
{
	// try
	// {
	// 	mongoose.connect('mongodb://localhost:27017/MyDBNode',{ server: { poolSize: 1 }});

	// }
	// catch(err)
	// {
	// 	throw Error(err);

	// }
	mongoose.connect('mongodb://127.0.0.1:27017/MyDBNode',{ server: { poolSize: 1 }}, function(err){
  					if(err) 
  					{
  						//throw Error(err);
  						console.error('MongoDB: connection error -> ' + err);
  						return;
  					}

	});
}


exports.db_connect_P = function(done)
{

	mongoose.connect('mongodb://127.0.0.1:27017/MyDBNode',{ server: { poolSize: 1 }}, function(err){
  					if(err) 
  					{
  						done(err)
  						return;
  					}
  					else
  					{
  						done(null);
  					}

	});
}

exports.db_disconnect = function(){
	mongoose.disconnect();
}

exports.getObjectList = function(QueryHelper, ObjectDTO, callback){

	QueryHelper.getObjectList(ObjectDTO,function(err, ObjectDTO){
		if(err) callback(err);

		//console.log('Inside BaseDAO');
		callback(null, ObjectDTO);
	});
}

exports.createObject = function(QueryHelper, ObjectDTO, callback){

	QueryHelper.createObject(ObjectDTO,function(err, ObjectDTO){
		if(err) callback(err);

		callback(null, ObjectDTO);
	});
}

exports.updateObject = function(QueryHelper, ObjectDTO, callback){

	
	QueryHelper.updateObject(ObjectDTO,function(err, ObjectDTO){
		if(err) callback(err);

		callback(null, ObjectDTO);
	});

	
}

exports.getObjectDetail = function(QueryHelper, ObjectDTO, callback){

	
	QueryHelper.getObjectDetail(ObjectDTO,function(err, ObjectDTO){
		if(err) callback(err);

		callback(null, ObjectDTO);
	});

	
}

exports.removeObject = function(QueryHelper, ObjectDTO, callback){

	
	QueryHelper.removeObject(ObjectDTO,function(err, ObjectDTO){
		if(err) callback(err);

		callback(null, ObjectDTO);
	});

	
}
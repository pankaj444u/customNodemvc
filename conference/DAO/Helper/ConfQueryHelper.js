var Conference = require('../../DTO/confDTO.js');

function getObjectList(ObjectDTO,callback){

	Conference.find(function(err, ObjectDTO){
    if(err) callback(err); //res.json(err);

    console.log('*****************************************');
    callback(null, ObjectDTO);
    });    
}

function createObject(ObjectDTO,callback){
    Conference.create({
            empName : ObjectDTO.empName,
            confName : ObjectDTO.confName,
            frmDate : ObjectDTO.frmDate,
	        toDate : ObjectDTO.toDate
            }, function(err, ObjectDTO) {
            if(err) callback(err);
            
            callback(null, ObjectDTO);
        });   
}


module.exports.createObject = createObject;
module.exports.getObjectList = getObjectList;
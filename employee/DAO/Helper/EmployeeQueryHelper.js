var Employee = require('../../DTO/EmployeeDTO.js');

function getObjectList(ObjectDTO,callback){

	Employee.find(function(err, ObjectDTO){
    if(err) callback(err); //res.json(err);

    console.log('Inside queryhelper');
    callback(null, ObjectDTO);
    });    
}


function createObject(ObjectDTO,callback){

	Employee.create({
            empName : ObjectDTO.empName
            }, function(err, ObjectDTO) {
            if(err) callback(err);
            
            callback(null, ObjectDTO);
        });   
}

function updateObject(ObjectDTO,callback){

	// Employee.create({
 //            empName : ObjectDTO.empName
 //            }, function(err, ObjectDTO) {
 //            if(err) callback(err);
            
 //            callback(null, ObjectDTO);
 //        }); 

    Employee.findById(ObjectDTO.id, function ( err, employee ){
                    employee.empName    = ObjectDTO.empName;
                    employee.save( function ( err, ObjectDTO, count ){
                        if( err ) return next( err );
                        //close();
                        callback(null, ObjectDTO);
      
                    });
                });  
}

function getObjectDetail(ObjectDTO,callback){

	Employee.find({_id:ObjectDTO.id},function(err, ObjectDTO){
        if(err) callback(err);

        
        callback(null, ObjectDTO);

    });   
}

function removeObject(ObjectDTO,callback){

	Employee.findById(ObjectDTO.id, function(err, employee){
        employee.remove(function(err, ObjectDTO){
            if(err) callback(err);
            
            callback(null, ObjectDTO);
        });
    });  
}

module.exports.getObjectList = getObjectList;
module.exports.createObject = createObject;
module.exports.updateObject = updateObject;
module.exports.getObjectDetail = getObjectDetail;
module.exports.removeObject = removeObject;
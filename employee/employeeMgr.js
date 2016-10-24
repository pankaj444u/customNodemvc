var employeeDAO = require('../employee/DAO/employeeDAO.js');



exports.saveEmp = function(EmployeeDTO,callback){

    employeeDAO.saveEmp(EmployeeDTO,function(err, employee){
        if(err) callback(err);

        callback(null, employee);
    });
}

exports.getEmpList = function(EmployeeDTO,callback){
    
    employeeDAO.getEmpList(EmployeeDTO,function(err, EmployeeDTO){
        if(err) callback(err);

        callback(null, EmployeeDTO);

   });
}

exports.getEmpDetail = function(EmployeeDTO, callback){

    employeeDAO.getEmpDetail(EmployeeDTO, function(err, employee){
        if(err) callback(err);

        callback(null, employee);
    });
}


exports.delEmp = function(EmployeeDTO, callback){

    employeeDAO.delEmp(EmployeeDTO, function(err, employee){
        if(err) callback(err);
            	
        callback(null, employee);
    });

}
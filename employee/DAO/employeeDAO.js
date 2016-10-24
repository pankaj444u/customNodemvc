var BaseDAO = require('../../BaseDao.js');
var EmployeeQueryHelper = require('../DAO/Helper/EmployeeQueryHelper.js');


function saveEmp(EmployeeDTO, callback)
{
    if(EmployeeDTO.id == undefined || EmployeeDTO.id == "")
    {
        
        BaseDAO.db_connect();
        BaseDAO.createObject(EmployeeQueryHelper, EmployeeDTO,function(err, EmployeeDTO){
            if(err) callback(err);

            BaseDAO.db_disconnect();
            callback(null, EmployeeDTO);

        })    
    }
    else
    {
        
        BaseDAO.db_connect();
        BaseDAO.updateObject(EmployeeQueryHelper, EmployeeDTO,function(err, EmployeeDTO){
            if(err) callback(err);

            BaseDAO.db_disconnect();
            callback(null, EmployeeDTO);

        }) 
    }    
}

function getEmpList (EmployeeDTO,callback)
{    
    
    BaseDAO.db_connect();
    BaseDAO.getObjectList(EmployeeQueryHelper,EmployeeDTO,function(err,EmployeeDTO){
        if(err) callback(err);

         BaseDAO.db_disconnect();
        callback(null, EmployeeDTO);
    });
   

}


function getEmpDetail(EmployeeDTO, callback)
{
    BaseDAO.db_connect();
    BaseDAO.getObjectDetail(EmployeeQueryHelper,EmployeeDTO,function(err,EmployeeDTO){
        if(err) callback(err);

         BaseDAO.db_disconnect();
        callback(null, EmployeeDTO);
    });
}

function delEmp(EmployeeDTO, callback)
{
    BaseDAO.db_connect();
    BaseDAO.removeObject(EmployeeQueryHelper,EmployeeDTO,function(err,EmployeeDTO){
        if(err) callback(err);

         BaseDAO.db_disconnect();
        callback(null, EmployeeDTO);
    });

    
}

module.exports.saveEmp = saveEmp;
module.exports.getEmpList = getEmpList;
module.exports.getEmpDetail = getEmpDetail;
module.exports.delEmp = delEmp;

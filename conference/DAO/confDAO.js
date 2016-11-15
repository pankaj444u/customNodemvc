var BaseDAO = require('../../BaseDao.js');
var ConfQueryHelper = require('../DAO/Helper/ConfQueryHelper.js');


function saveConf(confDTO, callback)
{
    if(confDTO.id == undefined || confDTO.id == ""){
            BaseDAO.db_connect();
            BaseDAO.createObject(ConfQueryHelper, confDTO,function(err, confDTO){
            if(err) callback(err);

            BaseDAO.db_disconnect();
            callback(null, confDTO);

        });
    }  
}

function getConfList (confDTO,callback)
{    
    
    BaseDAO.db_connect();
    BaseDAO.getObjectList(ConfQueryHelper,confDTO,function(err,confDTO){
        if(err) callback(err);

         BaseDAO.db_disconnect();
        callback(null, confDTO);
    });
}

module.exports.saveConf = saveConf;
module.exports.getConfList = getConfList;
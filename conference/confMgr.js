var confDAO = require('../conference/DAO/confDAO.js');



exports.saveConf = function(ConfDTO,callback){

    confDAO.saveConf(ConfDTO,function(err, conference){
        if(err) callback(err);

        callback(null, conference);
    });
}

exports.getConfList = function(ConfDTO, callback){

    confDAO.getConfList(ConfDTO, function(err, conference){
        if(err) callback(err);

        callback(null, conference);
    });
}
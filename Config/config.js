var Map = [
        {ui_action:"saveEmp", handler:"../Handler/employeeHandler.js"},
        {ui_action:"getEmpList", handler:"../Handler/employeeHandler.js"},
        {ui_action:"getEmpDetail", handler:"../Handler/employeeHandler.js"},
        {ui_action:"delEmp", handler:"../Handler/employeeHandler.js"},
        
        {ui_action:"/employee", handler:"./Handler/employeeHandler.js"},
        {ui_action:"/employee/create", handler:"./Handler/employeeHandler.js"},
        {ui_action:"/employee/edit", handler:"./Handler/employeeHandler.js"},
        {ui_action:"/employee/update", handler:"./Handler/employeeHandler.js"},
        {ui_action:"/employee/destroy", handler:"./Handler/employeeHandler.js"},
        {ui_action:"/project", handler:"./Handler/projectHandler.js"},


        {ui_action:"saveBooking", handler:"../Handler/confHandler.js"},



      ]





































var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost:27017/MyDBNode',{ server: { poolSize: 1 }}, function(err){
//   if(err) console.log('MongoDB: connection error -> ' + err);

// }); 
module.exports = mongoose;

var Schema   = mongoose.Schema;

var acl = new Schema({
    action : String,
    role: String
});

var ACL = mongoose.model('ACL',acl);


var checkACL = function(group, actionName) {
      return function(req, res, next) {

        if ("*" === group)
      next();
    else
        ACL.find({action:actionName,role:group},function(err,acls){
          //res.json(acls);
          //next();
          if(acls.length > 0)
            //res.json(acls.length);
            next();
          else
            res.send(401, 'Unauthorized');
        });
        // ACL.create({
       //      action : 'create',
       //      role:'admin'
       //  }, function(err, acl) {
       //      if (err)
       //          res.send(err);

       //      // get and return all the todos after you create another
       //      ACL.find(function(err, acls) {
       //          if (err)
       //              res.send(err)
       //          res.json(acls);
       //      });
       //  });
    
    //     else if ("admin" === group && action==="create")
    //       next();
    //    else if ("user" === group && action==="getDetails")
    //      next();
    //     else
    //       res.send(401, 'Unauthorized');
      };
    };


module.exports.config = Map;
module.exports.checkACL = checkACL;
//module.exports.returnData = returnData;

var config = require('../Config/config.js');
var handler ='../Handler/employeeHandler.js';

var url = require('url');

exports.processRequest= function(req,res,next){
  
    queryObject = url.parse(req.url,true).query;
    //console.log(queryObject);
    ui_Action = queryObject.ui_action;
    console.log(ui_Action);
    //return;

    if(ui_Action == "" || ui_Action == null)
    {
    	ui_Action = req.body.ui_action;
    }
    configObj = config.config.filter(function (el) {
            return (el.ui_action === ui_Action);
        });
        
    handler = configObj[0].handler;
    var HandlerObject = require(handler);

    HandlerObject.execute(req,res,next);

}



































//var app = require('./app');
//var handler ='./Handler/employeeHandler.js';

// var employeeHandler = require('./Handler/employeeHandler.js');
// var app = require('./app');
// var acl = require('./Config/config');
// var http = require('http')
// //var handler ="";
// var action="/employee";
// // app.use(function(req,res,next){

// // 	handler ='./Handler/';
// // 	action = '/employee';
// // 	var Test = acl.returnData();
// // 	console.log(Test.action+' ********* '+ Test.handler);
// // 	if(req.method === "GET")
// // 	{
// // 		handler = handler+Test.handler;
// // 		//action  = action +'/'+ Test.action;
// // 		console.log(action+"****"+ handler);
// // 		var handler = require(handler);
		
// // 		app.get(action,handler.getDetails);
// // 	}
// // 	next();

// // })

//    //app.get('*',employeeHandler.execute);
//    app.get(action,acl.checkACL("*"),employeeHandler.getDetails);
//    app.post(action+'/create',acl.checkACL("admin",'/employee/create'),employeeHandler.create);
//    app.get(action+'/edit/:id',acl.checkACL("admin",'/employee/edit'), employeeHandler.edit);
//    app.post(action+'/update/:id',acl.checkACL("admin",'/employee/update'), employeeHandler.update);
//    app.get(action+'/destroy/:id',acl.checkACL("admin",'/employee/destroy'), employeeHandler.delete);

// app.listen(4444, function(){
// console.log('I am listening port number 4444')
// });


// var url = require('url');
// var handlername = './Handler/employeeHandler.js';

// var employeeHandler = require(handlername);

// exports.execute = function(req,res,next){
    
//     var pathname = url.parse(req.url).pathname;
//     console.log(pathname+"   id:   "+ req.params.id);

//     if(pathname == "/employee")
//     {
//     	//res.json(pathname);

//     	employeeHandler.getDetails(req,res,next);
//     }
//     else if(pathname == "/employee/project")
//     {
//     	//res.json(pathname);
//     	var handlername = './Handler/ProjectHandler.js';
//     	var projectHandler = require(handlername);
//     	projectHandler.getProjectDetails(req,res,next);
//     }

//     else if(pathname == "/employee/edit")
//     {
//     	//res.json(req.body.id+" **** "+ req.body.submit);
//     	if(req.body.submit == "Update")
//     	{
//     		employeeHandler.edit(req,res,next);		
//     	}
//     	else if(req.body.submit =="Delete")
//     	{
//     		employeeHandler.destroy(req,res,next);
//     	}

    
//     }

//     else if(pathname =="/employee/create")
//     {
//     	employeeHandler.create(req,res,next);
//     }
//     else if(pathname =="/employee/edit")
//     {
//     	employeeHandler.edit(req,res,next);
//     }
//     else if(pathname =="/employee/update")
//     {
//     	employeeHandler.update(req,res,next);
//     }
//     else if(pathname =="/employee/destroy")
//     {
//     	employeeHandler.destroy(req,res,next);
//     }
//     else
//     {
// 		res.send(401, 'Unauthorized'+ pathname);
// 		//res.json('M here.......'+ pathname);
//     }


    
//     //employeeMgr.getDetails(req,res,next);

// }







//var Test = require('./GlobalVariables.js');
//var HandlerObject = require(handler);
// var jsonQuery = require('json-query')
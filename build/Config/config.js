var Map=[{ui_action:"saveEmp",handler:"../Handler/employeeHandler.js"},{ui_action:"getEmpList",handler:"../Handler/employeeHandler.js"},{ui_action:"getEmpDetail",handler:"../Handler/employeeHandler.js"},{ui_action:"delEmp",handler:"../Handler/employeeHandler.js"},{ui_action:"/employee",handler:"./Handler/employeeHandler.js"},{ui_action:"/employee/create",handler:"./Handler/employeeHandler.js"},{ui_action:"/employee/edit",handler:"./Handler/employeeHandler.js"},{ui_action:"/employee/update",handler:"./Handler/employeeHandler.js"},{ui_action:"/employee/destroy",handler:"./Handler/employeeHandler.js"},{ui_action:"/project",handler:"./Handler/projectHandler.js"},{ui_action:"saveBooking",handler:"../Handler/confHandler.js"}],mongoose=require("mongoose");module.exports=mongoose;var Schema=mongoose.Schema,acl=new Schema({action:String,role:String}),ACL=mongoose.model("ACL",acl),checkACL=function(e,n){return function(o,a,l){"*"===e?l():ACL.find({action:n,role:e},function(e,n){n.length>0?l():a.send(401,"Unauthorized")})}};module.exports.config=Map,module.exports.checkACL=checkACL;
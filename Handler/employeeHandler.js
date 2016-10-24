var employeeMgr = require('../employee/employeeMgr.js');
var EmployeeDTO = require('../employee/DTO/employeeDTO.js');
var url = require('url');

exports.execute = function(req,res,next){

	//console.log(configObj);
	if(url.parse(req.url).pathname != null)
	{
		if(ui_Action =="saveEmp")
		{
			saveEmp(req,res,next);	
		}
		else if(ui_Action =="getEmpList")
		{
			getEmpList(req,res,next);
		}
		else if(ui_Action =="getEmpDetail")
		{
			getEmpDetail(req,res,next);
		}
		else if(ui_Action =="delEmp")
		{
			delEmp(req,res,next);
		}
		

	}
	
}

function saveEmp(req,res,next){
	EmployeeDTO.id = req.body.id;
	EmployeeDTO.empName = req.body.empName;

	employeeMgr.saveEmp(EmployeeDTO,function(err, employee){
		if(err) res.render('Error',{error: err});

		res.redirect("/employee?ui_action=getEmpList")
	})
}

function getEmpList(req,res,next)
{
	employeeMgr.getEmpList(EmployeeDTO,function(err, EmployeeDTO){
			if(err) res.render('Error',{error: err});

			res.render('employeeList',{emplist: EmployeeDTO, flag:'I', empedit:undefined });

		});	
	
}

function getEmpDetail(req,res,next){
	EmployeeDTO.id =queryObject.id;
	employeeMgr.getEmpDetail(EmployeeDTO,function(err, employee){
		if(err) res.render('Error',{error: err});

		res.render('employeeList',{emplist: undefined, flag:'U',empedit: employee});
	}) 
	
}

function delEmp(req,res,next){
	EmployeeDTO.id = queryObject.id;
	employeeMgr.delEmp(EmployeeDTO, function(err, employee){
		if(err) res.render('Error',{error: err});

		res.redirect('/employee?ui_action=getEmpList')
	})
}


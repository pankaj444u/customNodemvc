var url = require('url');
var confMgr = require('../conference/confMgr.js');
var confDTO = require('../conference/DTO/confDTO.js');

exports.execute = function(req,res,next){
	console.log(ui_Action);
	if(url.parse(req.url).pathname != null)
	{
		if(ui_Action =="saveConf")
		{
			console.log("Hi there....");
			saveConf(req,res,next);
            
		}else if(ui_Action =="getConfList")
		{
			getConfList(req,res,next);
		}
	}
	
}

function saveConf(req,res,next){
	// confDTO.id = req.body.id;
	confDTO.empName = req.user.username;
    confDTO.confName = req.body.confName;
	confDTO.frmDate = req.body.frmDate;
	confDTO.toDate = req.body.toDate;
	confMgr.saveConf(confDTO,function(err, conference){
		if(err) res.render('Error',{error: err});

		res.redirect("/confbooking");
	})

}

function getConfList(req,res,next)
{
	confMgr.getConfList(confDTO,function(err, confDTO){
			if(err) res.render('Error',{error: err});

			//console.log(confDTO);
			res.json(confDTO);
			res.end();

		});	
	
}
var url = require('url');

exports.execute = function(req,res,next){
	//console.log(configObj);
	if(url.parse(req.url).pathname != null)
	{
		if(ui_Action =="saveBooking")
		{
			//saveEmp(req,res,next);
            console.log("Hi there....")
		}
	}
	
}
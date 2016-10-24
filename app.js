    // set up ========================
    var express  = require('express');
    var path = require('path');
    var app      = express();             
    var morgan = require('morgan');    
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var passport = require('passport');
    var session = require('express-session');
    var cookieParser = require("cookie-parser");
    var flash = require('connect-flash');
    
    // configuration start =================

    app.use(express.static(__dirname + '/public'));
    //app.use(morgan('dev'));

    var logger = require("./utils/logger");
    app.use(require('morgan')({ "stream": logger.stream }));

    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json()); 
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({ secret: 'eTouch Systems' }));
    app.use(passport.initialize());
    app.use(passport.session()); 
    app.use(flash());

    app.set('views',path.join(__dirname,'views'));
    app.engine('html',require('ejs').renderFile);
    app.set('view engine','html');

    //Initialize Passport 
    var initPassportLocal = require('./passport/initLocalStrategy');
    initPassportLocal(passport);
    var initPassportFacebook = require('./passport/initFacebookStrategy');
    initPassportFacebook(passport);
    
    //Configure Route
    var routes = require('./routes/index')(passport);
    app.use('/', routes);
    
    

    app.use(function(err, req, res, next){
        if(err){
            //console.log(err.message);
            logger.log('error', 'Error message %j', {error: err.message}, {});
            res.render('Error',{error: err.message});
         }
        else if(req.url=="/favicon.ico"){
            //Somehow skip the next app.use
        }else{
            next(); //otherwise just go to next
        }
    });

    process.on('uncaughtException', function(err, req, res, next){
        //console.error(err.message);
        logger.log('error', 'Error message %j', {error: err.message}, {});
        process.exit(1);
    })

    app.listen(9000, function(){
        console.log('I am listening port number 4444')
    });
var express=require("express"),path=require("path"),app=express(),morgan=require("morgan"),bodyParser=require("body-parser"),methodOverride=require("method-override"),passport=require("passport"),session=require("express-session"),cookieParser=require("cookie-parser"),flash=require("connect-flash");app.use(express["static"](__dirname+"/public"));var logger=require("./utils/logger");app.use(require("morgan")({stream:logger.stream})),app.use(bodyParser.urlencoded({extended:"true"})),app.use(bodyParser.json()),app.use(bodyParser.json({type:"application/vnd.api+json"})),app.use(methodOverride()),app.use(cookieParser()),app.use(session({secret:"eTouch Systems"})),app.use(passport.initialize()),app.use(passport.session()),app.use(flash()),app.set("views",path.join(__dirname,"views")),app.engine("html",require("ejs").renderFile),app.set("view engine","html");var initPassportLocal=require("./passport/initLocalStrategy");initPassportLocal(passport);var initPassportFacebook=require("./passport/initFacebookStrategy");initPassportFacebook(passport);var routes=require("./routes/index")(passport);app.use("/",routes),app.use(function(e,r,s,o){e?(logger.log("error","Error message %j",{error:e.message},{}),s.render("Error",{error:e.message})):"/favicon.ico"==r.url||o()}),process.on("uncaughtException",function(e,r,s,o){logger.log("error","Error message %j",{error:e.message},{}),process.exit(1)}),app.listen(4444,function(){console.log("I am listening port number 4444")});
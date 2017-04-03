
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(passport){


	var FACEBOOK_APP_ID = "1460398460654561";//646849658748331
    var FACEBOOK_APP_SECRET = "9792eebed828552c0fd6a96a158e32af";//4bac711ac48ddbd751e6e8fca27ec683

    
    passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:9000/auth/facebook/callback",
    //callbackURL: "http://ec2-52-24-171-150.us-west-2.compute.amazonaws.com:9000/auth/facebook/callback",
    profileFields: ['id', 'emails', 'first_name', 'last_name', 'gender'],
    scope: ['public_profile', 'email']
    },
          function(req, token, tokenSecret, profile, done) {
            process.nextTick(function () {
              // To keep the example simple, the user's Facebook profile is returned to
              // represent the logged-in user.  In a typical application, you would want
              // to associate the Facebook account with a user record in your database,
              // and return that user instead.
              console.log(profile);
              //console.log(profile.emails[0].value);
              return done(null, profile);
            });
          }
    ));

}
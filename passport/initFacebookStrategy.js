
var FacebookStrategy = require('passport-facebook').Strategy;


module.exports = function(passport){


	var FACEBOOK_APP_ID = "646849658748331"
    var FACEBOOK_APP_SECRET = "4bac711ac48ddbd751e6e8fca27ec683";

    
    passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:4444/auth/facebook/callback"
      },
          function(accessToken, refreshToken, profile, done) {
            process.nextTick(function () {
              // To keep the example simple, the user's Facebook profile is returned to
              // represent the logged-in user.  In a typical application, you would want
              // to associate the Facebook account with a user record in your database,
              // and return that user instead.
              return done(null, profile);
            });
          }
    ));

}
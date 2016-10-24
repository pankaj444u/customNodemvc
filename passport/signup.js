var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var BaseDAO = require('../BaseDao');

module.exports = function(passport){

passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                BaseDAO.db_connect();
                User.findOne({ 'username' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        BaseDAO.db_disconnect();
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        BaseDAO.db_disconnect();
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.username = username;
                        newUser.password = createHash(password);
                        
                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                BaseDAO.db_disconnect();
                                console.log('Error in Saving user: '+err);  
                                throw err;  
                            }
                            BaseDAO.db_disconnect();
                            console.log('User Registration succesful');    
                            return done(null, newUser);
                        });
                    }
                });
                
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}



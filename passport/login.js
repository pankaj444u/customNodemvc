var LocalStrategy   = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');
var BaseDAO = require('../BaseDao');

module.exports = function(passport){

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
            
            BaseDAO.db_connect_P(function(err){
                if(err) done(err);//return done(null, false, req.flash('message', err.message)); 
                else
                {
                    User.findOne({ 'username' :  username }, 
                    function(err, user) {
                    
                    if (err)
                        return done(err);
                    
                    if (!user){
                        BaseDAO.db_disconnect();
                        console.log('User Not Found with username '+username);
                        return done(null, false, req.flash('message', 'User Not found.'));                 
                    }
                    // User exists but wrong password, log the error 
                    if (!isValidPassword(user, password)){
                        BaseDAO.db_disconnect();
                        console.log('Invalid Password');
                        return done(null, false, req.flash('message', 'Invalid Password')); 
                    }
                    
                    BaseDAO.db_disconnect();
                    return done(null, user);
                }
            );
                }
            });
            

        })
    );

    // passport.use('login', new LocalStrategy({
    //         passReqToCallback : true
    //     },
    //     function(req, username, password, done) { 
    //         // check in mongo if a user with username exists or not
    //         BaseDAO.db_connect();
    //         User.findOne({ 'username' :  username }, 
    //             function(err, user) {
    //                 // In case of any error, return using the done method
    //                 if (err)
    //                     return done(err);
    //                 // Username does not exist, log the error and redirect back
    //                 if (!user){
    //                     BaseDAO.db_disconnect();
    //                     console.log('User Not Found with username '+username);
    //                     return done(null, false, req.flash('message', 'User Not found.'));                 
    //                 }
    //                 // User exists but wrong password, log the error 
    //                 if (!isValidPassword(user, password)){
    //                     BaseDAO.db_disconnect();
    //                     console.log('Invalid Password');
    //                     return done(null, false, req.flash('message', 'Invalid Password')); // redirect back to login page
    //                 }
    //                 // User and password both match, return user from done method
    //                 // which will be treated like success
    //                 BaseDAO.db_disconnect();
    //                 return done(null, user);
    //             }
    //         );

    //     })
    // );


    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }

    }

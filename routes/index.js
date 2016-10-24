var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next) {
      if (req.isAuthenticated()) { return next(); }
      res.redirect('/login')
    }



module.exports= function(passport){

	router.get('/', function(req, res){
      res.render('index', { user: req.user });
    });

    router.get('/account', ensureAuthenticated, function(req, res){
      console.log(req.user);
      res.render('account', { user: req.user });
    });

    router.get('/login', function(req, res){
      res.render('login', { message: req.flash('message') });
    });


    /* Handle Login POST */
    router.post('/login', passport.authenticate('login', {
      successRedirect: '/employee?ui_action=getEmpList',
      failureRedirect: '/login',
      failureFlash : true  
    }));

    /* GET Registration Page */
    router.get('/signup', function(req, res){
      res.render('signup',{message: req.flash('message')});
    });

    /* Handle Registration POST */
    router.post('/signup', passport.authenticate('signup', {
      successRedirect: '/employee?ui_action=getEmpList',
      failureRedirect: '/signup',
      failureFlash : true  
    }));

    router.get('/auth/facebook',
      passport.authenticate('facebook'),
      function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
      });

    router.get('/auth/facebook/callback', 
      passport.authenticate('facebook', { failureRedirect: '/login' }),
      function(req, res) {
        res.redirect('/employee?ui_action=getEmpList');
      });

    router.get('/logout', function(req, res){
      req.logout();
      res.redirect('/login');
    });

    var applicationController = require('./ApplicationController');

    router.get('*',ensureAuthenticated,applicationController.processRequest);
    router.post('*',ensureAuthenticated,applicationController.processRequest);

    return router;
}
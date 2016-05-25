'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
  new GoogleStrategy({
    clientID: '488614920698-klt7m403nsrtff8f488614920698-klt7m403nsrtff8fsrbvncp8s63l4q7r.apps.googleusercontent.comsrbvncp8s63l4q7r.apps.googleusercontent.com',
    clientSecret: '98oTX4K8ZCvt5rH2GQ-gDFjE',
    callbackURL: 'YOUR_CALLBACK_URL'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    /*
    --- fill this part in ---
    */
    
  })
);


app.use(require('./logging.middleware'));

app.use(session({
    // this mandatory configuration ensures that session IDs are not predictable
    secret: 'tongiscool', // or whatever you like
    cookie: {
        maxAge: 60 * 1000
    }
}));

app.use(require('./request-state.middleware'));

app.use(require('./statics.middleware'));

app.use(require('./session-router'));

app.use(passport.initialize());

app.use(passport.session());


app.use(function(req, res, next) {
    console.log('session', req.session);
    next();
});

app.use('/api', require('../api/api.router'));

// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/stories', // or wherever
    failureRedirect : '/signup' // or wherever
  })
);


var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function(stateRoute) {
    app.get(stateRoute, function(req, res) {
        res.sendFile(indexPath);
    });
});

app.use(require('./error.middleware'));

module.exports = app;

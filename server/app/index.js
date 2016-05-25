'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(
  new GoogleStrategy({
    clientID: '488614920698-klt7m403nsrtff8fsrbvncp8s63l4q7r.apps.googleusercontent.com',
    clientSecret: '98oTX4K8ZCvt5rH2GQ-gDFjE',
    callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
  },
  // Google will send back the token and profile
  function (token, refreshToken, profile, done) {
  
    console.log('---', 'in verification callback', profile, '---');
      
    var info = {
      name: profile.displayName,
      email: profile.emails[0].value,
      photo: profile.photos ? profile.photos[0].value : undefined
    };


    User.findOrCreate({
      where: {googleId: profile.id},
      defaults: info
      })
    .spread(function(user){
      done(null,user)

      console.log('-------------------------',user,'=====================');

    })
    .catch(done)

  })
);

passport.serializeUser(function(user,done){
  done(null,user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});


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
    console.log('++++++++++++++++++++Reg.user++++++++++++++++',req.user)

    next();
});

app.use('/api', require('../api/api.router'));

// Google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after Google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/users', // or wherever
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

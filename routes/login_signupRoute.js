const { Router } = require('express');
const passport = require('passport');
const IsAuthenticate = require('../middleware/IsAuthenticate')
const logSignController = require('../controller/logSignController')

let loginSignupRoute = Router();

require('../middleware/googleAuthentication');

//      home routes   //

loginSignupRoute.get('/index', IsAuthenticate.IsAuthenticated, logSignController.loadIndex);

//      signup routes     //

loginSignupRoute.get('/signup', logSignController.loadSignup);

loginSignupRoute.post('/signup', logSignController.postSignup);

//  profile route   //

loginSignupRoute.get('/profile', IsAuthenticate.IsAuthenticated, logSignController.loadProfile);

//      login routes     //

loginSignupRoute.get('/login', logSignController.loadLogin);

loginSignupRoute.post('/login', passport.authenticate('local'), logSignController.postLogin);

loginSignupRoute.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginSignupRoute.get
    ('/google/callback',
        passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/index' })
    );

module.exports = loginSignupRoute;
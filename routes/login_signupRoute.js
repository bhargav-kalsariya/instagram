const { Router } = require('express');
const { users } = require('../models/userShema');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { IsAuthenticated } = require('../middleware/IsAuthenticate');

let loginSignupRoute = Router();

require('../middleware/googleAuthentication');

//      home routes   //

loginSignupRoute.get('/index', IsAuthenticated, (req, res) => {
    res.render('index');
});

//      signup routes     //

loginSignupRoute.get('/signup', (req, res) => {
    res.render('signup');
})

loginSignupRoute.post('/signup', async (req, res) => {
    let user = await users.findOne({ username: req.body.username });
    if (!user) {
        let hashedpassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedpassword
        let newUser = await users.create(req.body)
        res.render('index');
        console.log(newUser);
    }
    else {
        res.send('user already exists');
    }
})

//      login routes     //

loginSignupRoute.get('/login', (req, res) => {
    res.render('login');
})

loginSignupRoute.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/index');
});

loginSignupRoute.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

loginSignupRoute.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', successRedirect: '/index' }));

module.exports = loginSignupRoute;
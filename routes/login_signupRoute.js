const { Router } = require('express');
const { users } = require('../models/userShema');
const bcrypt = require('bcrypt');

let loginSignupRoute = Router();

loginSignupRoute.get('/index', (req, res) => {
    res.render('index');
});

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

module.exports = loginSignupRoute;
const { users } = require('../models/userShema');
const bcrypt = require('bcrypt');

let loadIndex = (req, res) => {
    res.render('index', { user: req.user });
};

let loadSignup = (req, res) => {
    res.render('signup');
};

let postSignup = async (req, res) => {
    let user = await users.findOne({ username: req.body.username });
    if (!user) {
        let hashedpassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedpassword;
        let newUser = await users.create(req.body);
        res.render('index');
        console.log(newUser);
    }
    else {
        res.send('user already exists');
    };
};

let loadProfile = (req, res) => {
    res.render('profile', { user: req.user });
};

let loadLogin = (req, res) => {
    res.render('login');
};

let postLogin = (req, res) => {
    console.log(req.user);
    res.redirect('/index');
};

module.exports = { loadIndex, loadLogin, loadProfile, loadSignup, postLogin, postSignup };
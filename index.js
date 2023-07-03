const express = require('express');
const loginSignupRoute = require('./routes/login_signupRoute');
const { DatabaseConnect } = require('./config/databaseConnect');
const { initializePassport } = require('./middleware/passportLocal');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();
require('ejs');

let app = express();

DatabaseConnect();
initializePassport(passport);

//   passport local start     //

app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//   passport local end     //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views'+ __dirname + 'views');

//      Routes       // 

app.use('/', loginSignupRoute);

//      port       // 

app.listen(process.env.port, () => {
    console.log('listening on port ' + process.env.port);
})
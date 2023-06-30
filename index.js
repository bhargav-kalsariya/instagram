const express = require('express');
const loginSignupRoute = require('./routes/login_signupRoute');
const { DatabaseConnect } = require('./config/databaseConnect');

require('dotenv').config();
require('ejs');

let app = express();

DatabaseConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

//      Routes       // 

app.use('/', loginSignupRoute);

//      port       // 

app.listen(process.env.port, () => {
    console.log('listening on port ' + process.env.port);
})
const express = require('express');
const { DatabaseConnect } = require('./config/databaseConnect');
const { LoginSignupRouter } = require('./routes/login_signupRoute');

require('ejs');
require('dotenv').config();

DatabaseConnect();

let app = express();

app.use('view engine', 'ejs');
app.use('/users', LoginSignupRouter)
// app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env.port || 7000, () => {
    console.log('listening on port ' + process.env.port);
});

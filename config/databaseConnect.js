const mongoose = require('mongoose');

exports.DatabaseConnect = async () => {

    console.log('Database Connecting...');
    await mongoose.connect(process.env.databaseURL);
    console.log('Database Connected successfully');
    
}
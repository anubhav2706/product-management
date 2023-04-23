const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/zone')

const db = mongoose.connection;

//error
db.on('error', console.error.bind(console, 'error in connecting to db'));


//up and runnning
db.once('open', function() {
    console.log("successfully connected to the database");
});
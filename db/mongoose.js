const mongoose = require('mongoose');

const mongoDB = process.env.MONGODB_URI + '/' + process.env.MONGODB_NAME;

// quick fix to clear a deprecation warning
mongoose.set('useCreateIndex', true);

//Set up default mongoose connection
mongoose.connect(mongoDB, { useNewUrlParser: true });

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// this export is used for seeding:
module.exports = db;
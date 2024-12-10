const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/taskTracker';

const connectToApp = async ()=>{
    await mongoose.connect(mongoURI);
    console.log("Server has been successfully connected to the Database");
}

module.exports = connectToApp;
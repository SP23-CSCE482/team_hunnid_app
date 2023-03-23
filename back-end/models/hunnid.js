const mongoose = require("mongoose"); //import mongoose

// hunnid schema
const HunnidSchema = new mongoose.Schema({
    username: String,
    password: String    
});

const Hunnid = mongoose.model('Hunnid', HunnidSchema); //convert to model named Hunnid
module.exports = Hunnid; //export for controller use
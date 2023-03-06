const mongoose = require("mongoose"); //import mongoose

// hunnid schema
const ResourceSchema = new mongoose.Schema({
    resource_name: String,
    resource_type: String,
    tags: String    
});

const Resource = mongoose.model('resources', ResourceSchema); //convert to model named Hunnid
module.exports = Resource; //export for controller use
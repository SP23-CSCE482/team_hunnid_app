const mongoose = require("mongoose"); //import mongoose

// login schema
const LoginSchema = new mongoose.Schema({
    user_email: String,
    user_name: String
});

const Login = mongoose.model('Login', LoginSchema); //convert to model named Login
module.exports = Login; //export for controller use
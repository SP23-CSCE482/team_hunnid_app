const mongoose = require("mongoose"); //import mongoose

// questions schema
const QuestionsSchema = new mongoose.Schema({
    user_id: String,
    question_clob: String
});

const Questions = mongoose.model('Questions', QuestionsSchema); //convert to model named Questions
module.exports = Questions; //export for controller use
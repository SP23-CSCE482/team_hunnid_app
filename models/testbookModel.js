const mongoose = require("mongoose"); //import mongoose

// testbook schema
const TestbookSchema = new mongoose.Schema({
    topic_name: String,
    chapter_num: Number
});

const Testbook = mongoose.model('Testbook', TestbookSchema); //convert to model named Testbook
module.exports = Testbook; //export for controller use
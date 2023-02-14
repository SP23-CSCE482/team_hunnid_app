const express = require('express'); //import express
const router  = express.Router(); 
const questionsController = require('../controllers/questionsController'); 
const multer = require('multer');
const upload = multer();



//Create
router.post('/questions/createOne', upload.none(), questionsController.insertOneQuestions);
router.post('/questions/createMany', upload.none(), questionsController.insertManyQuestions);

//Read
router.get('/questions/findOne/:id', questionsController.findOneQuestions); 
router.get('/questions/findMany/:field', questionsController.findManyQuestions);

//Update
router.post('/questions/updateOne/:id', upload.none(), questionsController.updateOneQuestions);
router.post('/questions/updateMany/:field', upload.none(), questionsController.updateManyQuestions); 
router.post('/questions/replaceOne/:id', upload.none(), questionsController.replaceOneQuestions); 

//Delete
router.delete('/questions/deleteOne/:id', questionsController.deleteOneQuestions); 
router.delete('/questions/deleteMany/:field', questionsController.deleteManyQuestions);

module.exports = router; // export to use in server.js
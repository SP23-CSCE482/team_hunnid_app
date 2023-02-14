const express = require('express'); //import express
const router  = express.Router(); 
const loginController = require('../controllers/loginController'); 
const multer = require('multer');
const upload = multer();



//Create
router.post('/login/createOne', upload.none(), loginController.insertOneLogin);
router.post('/login/createMany', upload.none(), loginController.insertManyLogin);

//Read
router.get('/login/findOne/:id', loginController.findOneLogin); 
router.get('/login/findMany/:field', loginController.findManyLogin);

//Update
router.post('/login/updateOne/:id', upload.none(), loginController.updateOneLogin);
router.post('/login/updateMany/:field', upload.none(), loginController.updateManyLogin); 
router.post('/login/replaceOne/:id', upload.none(), loginController.replaceOneLogin); 

//Delete
router.delete('/login/deleteOne/:id', loginController.deleteOneLogin); 
router.delete('/login/deleteMany/:field', loginController.deleteManyLogin);

module.exports = router; // export to use in server.js
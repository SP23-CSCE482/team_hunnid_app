const express = require('express'); //import express
const router  = express.Router(); 
const testbookController = require('../controllers/testbookController'); 
const multer = require('multer');
const upload = multer();



//Create
router.post('/testbook/createOne', upload.none(), testbookController.insertOneTestbook);
router.post('/testbook/createMany', upload.none(), testbookController.insertManyTestbook);

//Read
router.get('/testbook/findOne/:id', testbookController.findOneTestbook); 
router.get('/testbook/findMany/:field', testbookController.findManyTestbook);

//Update
router.post('/testbook/updateOne/:id', upload.none(), testbookController.updateOneTestbook);
router.post('/testbook/updateMany/:field', upload.none(), testbookController.updateManyTestbook); 
router.post('/testbook/replaceOne/:id', upload.none(), testbookController.replaceOneTestbook); 

//Delete
router.delete('/testbook/deleteOne/:id', testbookController.deleteOneTestbook); 
router.delete('/testbook/deleteMany/:field', testbookController.deleteManyTestbook);

module.exports = router; // export to use in server.js
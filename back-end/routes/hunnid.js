const express = require('express'); //import express
const router  = express.Router(); 
const hunnidController = require('../controllers/hunnid'); 
const multer = require('multer');
const upload = multer();



//Create
router.post('/hunnid/createOne', upload.none(), hunnidController.insertOneHunnid);
router.post('/hunnid/createMany', upload.none(), hunnidController.insertManyHunnid);

//Read
router.get('/hunnid/findOne/:id', hunnidController.findOneHunnid); 
router.get('/hunnid/findMany/:field', hunnidController.findManyHunnid);

//Update
router.post('/hunnid/updateOne/:id', upload.none(), hunnidController.updateOneHunnid);
router.post('/hunnid/updateMany/:field', upload.none(), hunnidController.updateManyHunnid); 
router.post('/hunnid/replaceOne/:id', upload.none(), hunnidController.replaceOneHunnid); 

//Delete
router.delete('/hunnid/deleteOne/:id', hunnidController.deleteOneHunnid); 
router.delete('/hunnid/deleteMany/:field', hunnidController.deleteManyHunnid);

module.exports = router; // export to use in server.js
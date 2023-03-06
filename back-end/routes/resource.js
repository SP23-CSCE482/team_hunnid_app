const express = require('express'); //import express
const router  = express.Router(); 
const resourceController = require('../controllers/resource'); 
const multer = require('multer');
const upload = multer();

//Read
router.get('/resource/findByTag/:tag', resourceController.findResourcesByTag); 

module.exports = router; // export to use in server.js
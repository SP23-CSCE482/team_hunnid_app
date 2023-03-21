const express = require('express'); //import express
const router  = express.Router(); 
const resourceController = require('../controllers/resource'); 
const multer = require('multer');
const upload = multer();

//Read
router.get('/resource/findByTag/:tag', resourceController.findResourcesByTag);

router.get('/resource/findByTagThroughWebscraping/:tag', resourceController.findResourcesByTagThroughWebscraping);

router.get('/resource/findVideoResources/:tag', resourceController.findVideoResources);

module.exports = router; // export to use in server.js
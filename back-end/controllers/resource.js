//import hunnid model
const Resource = require('../models/resource');

//GET '/resource/findByTag/:tag'
const findResourcesByTag = (req, res, next) => {
    let tagToSearch = req.params.tag; // will filter using the tags 
    Resource.find({ tags: tagToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};



//export controller functions CRUD Default
module.exports = {
    //get
    findResourcesByTag
};
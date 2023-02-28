//import hunnid model
const Resource = require('../models/resource');

//Create
// router.post('/hunnid/createOne', upload.none(), hunnidController.insertOneHunnid);
// router.post('/hunnid/createMany', upload.none(), hunnidController.insertManyHunnid);

//GET '/resource/findByTag/:tag'
const findResourcesByTag = (req, res, next) => {
    let tagToSearch = req.params.tag;
    Resource.find({ tags: tagToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};



//export controller functions CRUD Default
module.exports = {
    //read
    findResourcesByTag
};
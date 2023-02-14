//import hunnid model
const Hunnid = require('../models/hunnid');

//Create
// router.post('/hunnid/createOne', upload.none(), hunnidController.insertOneHunnid);
// router.post('/hunnid/createMany', upload.none(), hunnidController.insertManyHunnid);

//POST '/hunnid/createOne'
const insertOneHunnid = (req, res, next) => {

    //check if the hunnid _username already exists in db
    Hunnid.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new hunnid object using the Hunnid model and req.body
            const newHunnid = new Hunnid({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newHunnid.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneHunnid function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the hunnid is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneHunnid function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};

//POST '/hunnid/createMany'
const insertManyHunnid = (req, res, next) => {

    //check if the hunnid _username already exists in db
    Hunnid.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new hunnid object using the Hunnid model and req.body
            const newHunnid = new Hunnid({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newHunnid.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneHunnid function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the hunnid is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneHunnid function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};



//Read
// router.get('/hunnid/findOne/:id', hunnidController.findOneHunnid); 
// router.get('/hunnid/findMany/:field', hunnidController.findManyHunnid);

//GET '/hunnid/findOne/:id'
const findOneHunnid = (req, res, next) => {
    let usernameToSearch = req.params.id;
    Hunnid.findOne({ username: usernameToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/hunnid/findMany/:field'
const findManyHunnid = (req, res, next) => {
    let passwordToSearch = req.params.field;
    Hunnid.find({ password: passwordToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

// Update
// router.post('/hunnid/updateOne/:id', upload.none(), hunnidController.updateOneHunnid);
// router.post('/hunnid/updateMany/:field', upload.none(), hunnidController.updateManyHunnid); 
// router.post('/hunnid/replaceOne/:id', upload.none(), hunnidController.replaceOneHunnid); 

// updateOne documentation
// const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

//Post '/hunnid/updateOne/:id'
const updateOneHunnid = (req, res, next) => {
    let userNameToUpdate = req.params.id;
    Hunnid.updateOne({ username: userNameToUpdate }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log(usernameToSearch);
        console.log(req.body);
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
}



//POST '/hunnid/updateMany/:field'
const updateManyHunnid = (req, res, next) => {
    let passwordsToReplace = req.params.field
    Hunnid.updateMany({ password: passwordsToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

//POST '/hunnid/replaceOne/:id'
const replaceOneHunnid = (req, res, next) => {
    let accountToReplace = req.params.id
    Hunnid.replaceOne({ username: accountToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

// Delete
// router.delete('/hunnid/deleteOne/:id', hunnidController.deleteOneHunnid); 
// router.delete('/hunnid/deleteMany/:field', hunnidController.deleteManyHunnid);

//DELETE '/hunnid/deleteOne/:id'
const deleteOneHunnid = (req, res, next) => {
    let usernameToDelete = req.params.id;
    Hunnid.deleteOne({ username: usernameToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteOneHunnid" });
    })


};

//DELETE '/hunnid/deleteMany/:field'
const deleteManyHunnid = (req, res, next) => {
    let accountsToDelete = req.params.field;
    Hunnid.deleteMany({ password: accountsToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteManyHunnid" });
    })
};




//export controller functions CRUD Default
module.exports = {
    // Create
    insertOneHunnid,
    insertManyHunnid,
    // Read
    findOneHunnid,
    findManyHunnid,
    // Update
    updateOneHunnid,
    updateManyHunnid,
    replaceOneHunnid,
    // Delete
    deleteOneHunnid,
    deleteManyHunnid,
};
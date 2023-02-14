//import testbook model
const Testbook = require('../models/testbookModel');

//Create
// router.post('/testbook/createOne', upload.none(), testbookController.insertOneTestbook);
// router.post('/testbook/createMany', upload.none(), testbookController.insertManyTestbook);

//POST '/testbook/createOne'
const insertOneTestbook = (req, res, next) => {

    //check if the testbook _username already exists in db
    Testbook.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new testbook object using the Testbook model and req.body
            const newTestbook = new Testbook({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newTestbook.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneTestbook function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the testbook is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneTestbook function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};

//POST '/testbook/createMany'
const insertManyTestbook = (req, res, next) => {

    //check if the testbook _username already exists in db
    Testbook.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new testbook object using the Testbook model and req.body
            const newTestbook = new Testbook({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newTestbook.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneTestbook function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the testbook is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneTestbook function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};



//Read
// router.get('/testbook/findOne/:id', testbookController.findOneTestbook); 
// router.get('/testbook/findMany/:field', testbookController.findManyTestbook);

//GET '/testbook/findOne/:id'
const findOneTestbook = (req, res, next) => {
    let usernameToSearch = req.params.id;
    Testbook.findOne({ username: usernameToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/testbook/findMany/:field'
const findManyTestbook = (req, res, next) => {
    let passwordToSearch = req.params.field;
    Testbook.find({ password: passwordToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

// Update
// router.post('/testbook/updateOne/:id', upload.none(), testbookController.updateOneTestbook);
// router.post('/testbook/updateMany/:field', upload.none(), testbookController.updateManyTestbook); 
// router.post('/testbook/replaceOne/:id', upload.none(), testbookController.replaceOneTestbook); 

// updateOne documentation
// const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

//Post '/testbook/updateOne/:id'
const updateOneTestbook = (req, res, next) => {
    let userNameToUpdate = req.params.id;
    Testbook.updateOne({ username: userNameToUpdate }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log(usernameToSearch);
        console.log(req.body);
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
}



//POST '/testbook/updateMany/:field'
const updateManyTestbook = (req, res, next) => {
    let passwordsToReplace = req.params.field
    Testbook.updateMany({ password: passwordsToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

//POST '/testbook/replaceOne/:id'
const replaceOneTestbook = (req, res, next) => {
    let accountToReplace = req.params.id
    Testbook.replaceOne({ username: accountToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

// Delete
// router.delete('/testbook/deleteOne/:id', testbookController.deleteOneTestbook); 
// router.delete('/testbook/deleteMany/:field', testbookController.deleteManyTestbook);

//DELETE '/testbook/deleteOne/:id'
const deleteOneTestbook = (req, res, next) => {
    let usernameToDelete = req.params.id;
    Testbook.deleteOne({ username: usernameToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteOneTestbook" });
    })


};

//DELETE '/testbook/deleteMany/:field'
const deleteManyTestbook = (req, res, next) => {
    let accountsToDelete = req.params.field;
    Testbook.deleteMany({ password: accountsToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteManyTestbook" });
    })
};




//export controller functions CRUD Default
module.exports = {
    // Create
    insertOneTestbook,
    insertManyTestbook,
    // Read
    findOneTestbook,
    findManyTestbook,
    // Update
    updateOneTestbook,
    updateManyTestbook,
    replaceOneTestbook,
    // Delete
    deleteOneTestbook,
    deleteManyTestbook,
};
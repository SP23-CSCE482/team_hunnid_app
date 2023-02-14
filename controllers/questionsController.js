//import questions model
const Questions = require('../models/questionsModel');

//Create
// router.post('/questions/createOne', upload.none(), questionsController.insertOneQuestions);
// router.post('/questions/createMany', upload.none(), questionsController.insertManyQuestions);

//POST '/questions/createOne'
const insertOneQuestions = (req, res, next) => {

    //check if the questions _username already exists in db
    Questions.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new questions object using the Questions model and req.body
            const newQuestions = new Questions({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newQuestions.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneQuestions function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the questions is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneQuestions function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};

//POST '/questions/createMany'
const insertManyQuestions = (req, res, next) => {

    //check if the questions _username already exists in db
    Questions.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new questions object using the Questions model and req.body
            const newQuestions = new Questions({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newQuestions.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneQuestions function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the questions is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneQuestions function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};



//Read
// router.get('/questions/findOne/:id', questionsController.findOneQuestions); 
// router.get('/questions/findMany/:field', questionsController.findManyQuestions);

//GET '/questions/findOne/:id'
const findOneQuestions = (req, res, next) => {
    let usernameToSearch = req.params.id;
    Questions.findOne({ username: usernameToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/questions/findMany/:field'
const findManyQuestions = (req, res, next) => {
    let passwordToSearch = req.params.field;
    Questions.find({ password: passwordToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

// Update
// router.post('/questions/updateOne/:id', upload.none(), questionsController.updateOneQuestions);
// router.post('/questions/updateMany/:field', upload.none(), questionsController.updateManyQuestions); 
// router.post('/questions/replaceOne/:id', upload.none(), questionsController.replaceOneQuestions); 

// updateOne documentation
// const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

//Post '/questions/updateOne/:id'
const updateOneQuestions = (req, res, next) => {
    let userNameToUpdate = req.params.id;
    Questions.updateOne({ username: userNameToUpdate }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log(usernameToSearch);
        console.log(req.body);
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
}



//POST '/questions/updateMany/:field'
const updateManyQuestions = (req, res, next) => {
    let passwordsToReplace = req.params.field
    Questions.updateMany({ password: passwordsToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

//POST '/questions/replaceOne/:id'
const replaceOneQuestions = (req, res, next) => {
    let accountToReplace = req.params.id
    Questions.replaceOne({ username: accountToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

// Delete
// router.delete('/questions/deleteOne/:id', questionsController.deleteOneQuestions); 
// router.delete('/questions/deleteMany/:field', questionsController.deleteManyQuestions);

//DELETE '/questions/deleteOne/:id'
const deleteOneQuestions = (req, res, next) => {
    let usernameToDelete = req.params.id;
    Questions.deleteOne({ username: usernameToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteOneQuestions" });
    })


};

//DELETE '/questions/deleteMany/:field'
const deleteManyQuestions = (req, res, next) => {
    let accountsToDelete = req.params.field;
    Questions.deleteMany({ password: accountsToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteManyQuestions" });
    })
};




//export controller functions CRUD Default
module.exports = {
    // Create
    insertOneQuestions,
    insertManyQuestions,
    // Read
    findOneQuestions,
    findManyQuestions,
    // Update
    updateOneQuestions,
    updateManyQuestions,
    replaceOneQuestions,
    // Delete
    deleteOneQuestions,
    deleteManyQuestions,
};
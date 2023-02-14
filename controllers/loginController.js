//import login model
const Login = require('../models/loginModel');

//Create
// router.post('/login/createOne', upload.none(), loginController.insertOneLogin);
// router.post('/login/createMany', upload.none(), loginController.insertManyLogin);

//POST '/login/createOne'
const insertOneLogin = (req, res, next) => {

    //check if the login _username already exists in db
    Login.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new login object using the Login model and req.body
            const newLogin = new Login({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newLogin.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneLogin function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the login is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneLogin function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};

//POST '/login/createMany'
const insertManyLogin = (req, res, next) => {

    //check if the login _username already exists in db
    Login.findOne({ username: req.body.username }, (err, data) => {
        //if username not in db, add the object
        if (!data) {
            //create a new login object using the Login model and req.body
            const newLogin = new Login({
                username: req.body.username,
                password: req.body.password,
            })
            // save this object to database
            newLogin.save((err, data) => {
                if (err) {
                    console.log(data.username);
                    return res.json(`insertOneLogin function Error insideElse :  ${err}`);
                }
                return res.json(data);
            })

            //if there's an error or the login is in db, return a message         
        } else {
            if (err) {
                return res.json(`insertOneLogin function Error outsideElse :  ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};



//Read
// router.get('/login/findOne/:id', loginController.findOneLogin); 
// router.get('/login/findMany/:field', loginController.findManyLogin);

//GET '/login/findOne/:id'
const findOneLogin = (req, res, next) => {
    let usernameToSearch = req.params.id;
    Login.findOne({ username: usernameToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/login/findMany/:field'
const findManyLogin = (req, res, next) => {
    let passwordToSearch = req.params.field;
    Login.find({ password: passwordToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

// Update
// router.post('/login/updateOne/:id', upload.none(), loginController.updateOneLogin);
// router.post('/login/updateMany/:field', upload.none(), loginController.updateManyLogin); 
// router.post('/login/replaceOne/:id', upload.none(), loginController.replaceOneLogin); 

// updateOne documentation
// const res = await Person.updateOne({ name: 'Jean-Luc Picard' }, { ship: 'USS Enterprise' });
// res.matchedCount; // Number of documents matched
// res.modifiedCount; // Number of documents modified
// res.acknowledged; // Boolean indicating everything went smoothly.
// res.upsertedId; // null or an id containing a document that had to be upserted.
// res.upsertedCount; // Number indicating how many documents had to be upserted. Will either be 0 or 1.

//Post '/login/updateOne/:id'
const updateOneLogin = (req, res, next) => {
    let userNameToUpdate = req.params.id;
    Login.updateOne({ username: userNameToUpdate }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log(usernameToSearch);
        console.log(req.body);
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
}



//POST '/login/updateMany/:field'
const updateManyLogin = (req, res, next) => {
    let passwordsToReplace = req.params.field
    Login.updateMany({ password: passwordsToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

//POST '/login/replaceOne/:id'
const replaceOneLogin = (req, res, next) => {
    let accountToReplace = req.params.id
    Login.replaceOne({ username: accountToReplace }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data);
    })
};

// Delete
// router.delete('/login/deleteOne/:id', loginController.deleteOneLogin); 
// router.delete('/login/deleteMany/:field', loginController.deleteManyLogin);

//DELETE '/login/deleteOne/:id'
const deleteOneLogin = (req, res, next) => {
    let usernameToDelete = req.params.id;
    Login.deleteOne({ username: usernameToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteOneLogin" });
    })


};

//DELETE '/login/deleteMany/:field'
const deleteManyLogin = (req, res, next) => {
    let accountsToDelete = req.params.field;
    Login.deleteMany({ password: accountsToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data.deletedCount + " documents within deleteManyLogin" });
    })
};




//export controller functions CRUD Default
module.exports = {
    // Create
    insertOneLogin,
    insertManyLogin,
    // Read
    findOneLogin,
    findManyLogin,
    // Update
    updateOneLogin,
    updateManyLogin,
    replaceOneLogin,
    // Delete
    deleteOneLogin,
    deleteManyLogin,
};
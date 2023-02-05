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
    for (let elem in req.body) {
        //check if the hunnid _username already exists in db
        Hunnid.findOne({ username: elem.username }, (err, data) => {
            //if username not in db, add the object
            if (!data) {
                //create a new hunnid object using the Hunnid model and req.body
                const newHunnid = new Hunnid({
                    username: elem.username,
                    password: elem.password,
                })
                // save this object to database
                newHunnid.save((err, data) => {
                    if (err) {
                        console.log(data.username);
                        return res.json({ Error: err });
                    }
                    return res.json(data);
                })
                //if there's an error or the hunnid is in db, return a message         
            } else {
                if (err) {
                    return res.json({ Error: err });
                    //return res.json(`insertOneHunnid function Error outsideElse :  ${err}`);
                }
                return res.json({ message: "Username already exists for this User" });
            }
        })
    }
};



//Read
// router.get('/hunnid/findOne/:id', hunnidController.findOneHunnid); 
// router.get('/hunnid/findMany/:field', hunnidController.findManyHunnid);

//GET '/hunnid/findOne/:id'
const findOneHunnid = (req, res, next) => {
    let usernameToSearch = req.params._id;
    Hunnid.findOne({ username: usernameToSearch }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//GET '/hunnid/findMany/:field'
const findManyHunnid = (req, res, next) => {
    Hunnid.find({ username: usernameToSearch }, (err, data) => {
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
    Hunnid.updateOne({ username: req.param.id }, req.body, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data.acknowledged);
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
        return res.json(data.acknowledged);
    })
};

//POST '/hunnid/replaceOne/:id'
const replaceOneHunnid = (req, res, next) => {
    let accountToReplace = req.params.id
    Hunnid.replaceOne({ username: accountToReplace }, replacement, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        console.log("Matched count: " + data.matchedCount + " Modified Count: " + data.modifiedCount);
        return res.json(data.acknowledged);
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
        return res.json({ message: "Deleted " + data + " documents within deleteOneHunnid" });
    })


};

//DELETE '/hunnid/deleteMany/:field'
const deleteManyHunnid = (req, res, next) => {
    let accountsToDelete = req.params.field;
    Hunnid.deleteMany({ password: accountsToDelete }, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json({ message: "Deleted " + data + " documents within deleteManyHunnid" });
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





//GET '/hunnid'
const findtesOneHunnid = (req, res, next) => {
    Hunnid.find({}, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//POST '/hunnid'
const newHunnid = (req, res) => {
    let _username = req.params._username;

    //check if the hunnid _username already exists in db
    Hunnid.findOne({ _username: req.body.username }, (err, data) => {
        //if hunnid not in db, add it
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
                    return res.json({ Error: err });
                }
                return res.json(data);
            })

            //if there's an error or the hunnid is in db, return a message         
        } else {
            if (err) {
                return res.json(`Error in newHunnid POST ${err}`);
            }
            return res.json({ message: "Username already exists" });
        }
    })
};

//DELETE '/hunnid'
const deleteAllHunnid = (req, res, next) => {
    Hunnid.deleteMany({}, (err) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json("Deleted all Hunnid");
    })
};

//GET '/hunnid/:_username'
const getOneHunnid = (req, res, next) => {
    let _username = req.params._username;
    // Note, this is by user ID, not the Hunnid Object Id
    Hunnid.findOne({ _username: _username }, (err, data) => {
        if (err || !data) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
};

//POST '/hunnid/:_username'
const newComment = (req, res, next) => {
    let _username = req.params._username;
    let newComment = req.body.comment; //get the comment

    const comment = {
        text: newComment,
        date: new Date()
    }

    Hunnid.findOne({ _username: _username }, (err, data) => {
        if (err || !data || !newComment) {
            return res.json({ Error: err });
        } else {
            data.comments.push(comment);
            data.save(err => {
                if (err) {
                    return res.json({ message: "Comment failed to add.", error: err });
                }
                return res.json(data);
            })
        }
    })
};


//DELETE '/hunnid/:_username'
const deleteOneHunnidt = (req, res, next) => {
    let _username = req.params._username;

    Hunnid.deleteOne({ _username: _username }, (err, data) => {
        if (data.deletedCount == 0) {
            return res.json({ message: "User doesn't exist." });
        } else if (err) {
            return res.json({ Error: err });
        } else {
            return res.json({ message: "User deleted." });
        }
    })
};
require('dotenv').config();

const mongoose = require('mongoose');
const express = require ('express');
const hunnidRoutes = require('./routes/hunnid'); // import the routes
const hunnidRoutes = require('./routes/loginRoute'); // import the routes
const hunnidRoutes = require('./routes/questionsRoute'); // import the routes
const hunnidRoutes = require('./routes/testbookRoute'); // import the routes
const app = express();

app.use(express.json());
app.use('/', hunnidRoutes); 

// database conn
mongoose.connect(
    process.env.MONGODB_URI,
    {useUnifiedTopology: true, useNewUrlParser: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection : Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3001, () => {
    console.log('App listening on port ' + listener.address().port)
})


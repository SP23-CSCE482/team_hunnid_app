require('dotenv').config();

const mongoose = require('mongoose');
const express = require ('express');
const hunnidRoutes = require('./routes/hunnid'); // import the routes
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const getText = require("./readPdfText");

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 * 1024 //10MB max file size
    },
}));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));


app.post('/pdfToText', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No pdf uploaded'
            });
        } else {
            let pdf = req.files.pdf;
            const filePath = `./uploads/${pdf.name}`;
            await pdf.mv(filePath);

            getText(filePath).then(function(textArray) {
                if(textArray.length > 0) {
                    // delete pdf file locally after we are done with it
                    fs.unlink(filePath, function (error) {
                        if(error) {
                            console.error(error);
                        }
                    });
                    console.log(textArray);
                    res.send({
                        status: true,
                        message: 'Pdf is uploaded',
                        data: {
                            name: pdf.name,
                            size: pdf.size,
                            text: textArray
                        }
                    });
                } else {
                    res.send({
                        status: false,
                        message: 'There was an issue parsing the pdf file',
                        text: ["Could not parse pdf file"]
                    });
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


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


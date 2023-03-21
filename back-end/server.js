require('dotenv').config()

const mongoose = require('mongoose');
const express = require ('express');
const hunnidRoutes = require('./routes/hunnid'); // import the routes
const resourceRoutes = require('./routes/resource');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const getText = require("./readPdfText");
var request = require('request');


const app = express();

const port = process.env.PORT || 3002;

const recommendationURL = 'http://localhost:'+port+'/resource/findByTag/'
const recommendationURL2 = 'http://localhost:'+port+'/resource/findByTagThroughWebscraping/'
const recommendationURL3 = 'http://localhost:'+port+'/resource/findVideoResources/'

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, //10MB max file size
    },
  }),
)


app.post('/rawPdf', async (req, res) => {
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

            getText(filePath).then(function (textArray) {
                if (textArray.length > 0) {
                    fs.unlink(filePath, function (error) {
                        if (error) {
                            console.error(error);
                        }
                    });
                    try {

                        res.send({
                            status: true,
                            message: 'Just The Text bb',
                            data: {
                                name: pdf.name,
                                size: pdf.size,
                                text: [textArray]
                            }
                        });

                    } catch (err) {
                        console.log("Incomplete parse : ", err)
                        res.send({
                            status: false,
                            message: 'There was an issue parsing the pdf file',
                            text: ["Parsed but incomplete"]
                        });
                    }

                } else {
                    console.log("Failed parse : ", err)
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
                    
                    try {
                        console.log("Testing Child Process : ");

                        const { spawn } = require('child_process');
                        const pyProg = spawn('python', ['./modelQuery.py', textArray]);

                        pyProg.stdout.on('data', function (data) {

                            //console.log(data.toString());
                            console.log("Success Child Process : ", data.toString());
                            res.send({
                                status: true,
                                message: 'Pdf is uploaded',
                                data: {
                                    name: pdf.name,
                                    size: pdf.size,
                                    text: data.toString()
                                }
                            });
                        });


                    } catch (err) {
                        console.log("Failed Child Process : ", err)
                    }


                    
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
    res.status(500).send(err)
  }
});

app.post('/TextBoxToRecommendation', async (req, res) => {
    try {
        let textArray = req.body.question
        let tag
        console.log("array is: "+textArray)
        try {
            console.log("Testing Child Process : ");

            const { spawn } = require('child_process');
            const pyProg = spawn('python', ['./modelQueryForPlainText.py',textArray]);
        
            pyProg.stdout.on('data', async function(data) {
                
                //console.log(data.toString());
                console.log("Success Child Process : ", data.toString());
                tag =  data.toString()
                console.log('Tag is:'+tag)
                // findResourcesByTag(tag, function(result){
                //     console.log(result)
                // });
                console.log('Url is: '+recommendationURL+tag)
                request({
                    url: recommendationURL2+tag, //on 3000 put your port no.
                    method: 'GET',
                }, function (error, response, body) {
                    console.log({body: body});
                    res.send({
                        id: Math.random(), //done so the card can be either of style choice
                        status: true,
                        resources:  JSON.parse(body),
                        tag: tag,
                        question: [textArray]
                    });
                });

                // const reccURL = await fetch({
                //     url: recommendationURL, //on 3000 put your port no.
                //     method: 'GET',
                //     json: {
                //         template: template.toLowerCase(),
                //         obj: tag
                //     }
                // }, function (error, response, body) {
                //     console.log({error: error, response: response, body: body});
                // });
                // console.log(typeof reccURL)
                
            });            
        } catch (err) {
            console.log("Failed Child Process : ", err)
            throw err
        }
        
    } catch (err) {
        res.status(500).send(err);
    }
});

app.use('/', hunnidRoutes); 
app.use('/', resourceRoutes); 

// database conn
mongoose.connect(
    MONGODB_URI = 'mongodb+srv://tempUser:03s7lkF0JNtn2YwX@cluster000.vlqdobt.mongodb.net/?retryWrites=true&w=majority',
    {useUnifiedTopology: true, useNewUrlParser: true},
    (err) => {
        if (err) return console.log("Error: ", err);
        console.log("MongoDB Connection : Ready state is:", mongoose.connection.readyState);
    }
);

const listener = app.listen(process.env.PORT || 3002, () => {
  console.log('App listening on port ' + listener.address().port)
})

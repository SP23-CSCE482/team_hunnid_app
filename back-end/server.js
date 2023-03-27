require('dotenv').config()

const cors = require('cors');
const mongoose = require('mongoose');
const express = require ('express');
const hunnidRoutes = require('./routes/hunnid'); // import the routes
const resourceRoutes = require('./routes/resource');
const fileUpload = require('express-fileupload');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const morgan = require('morgan');
const getText = require("./readPdfText");
var request = require('request');


const app = express();

const port = process.env.PORT || 3001;

const recommendationURL = 'http://localhost:'+port+'/resource/findByTag/'
const recommendationURL2 = 'http://localhost:'+port+'/resource/findAllResources/'
const recommendationURL3 = 'http://localhost:'+port+'/resource/findVideoResources/'

app.use(cors()); //uncomment if building using seperate servers
app.use(express.json());
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

const buildPath = path.join(__dirname,'..', 'build');
app.use(express.static(buildPath));

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

                        pyProg.stdout.on('data', async function (data) {
                            let tempData = []
                            data = JSON.parse(data)
                            let itr = 0
                            for (elem in data) {
                                // request({
                                //     url: recommendationURL2+tag, //on 3000 put your port no.
                                //     method: 'GET',
                                // }, function (error, response, body) {
                                //     console.log({body: body});
                                //     res.send({
                                //         id: Math.round(Math.random()), //done so the card can be either of style choice
                                //         status: true,
                                //         resources:  JSON.parse(body),
                                //         tag: tag,
                                //         question: [textArray]
                                //     });
                                // });
                                const result = await fetch(recommendationURL2+elem);
                                if (!result.ok) {
                                  throw new Error('API call 2 failed');
                                }
                                const resourcesArray = await result.json();
                                console.log()
                                tempData.push({
                                id: itr,
                                tag: elem,
                                question: data[elem],
                                resources: resourcesArray                // Insert your resource request here
                                })
                                itr += 1
                            }
                            console.log(tempData)
                            res.send({
                                status: true,
                                message: 'Pdf is uploaded',
                                data: tempData
                                ,
                            })
                        })
                    } catch (err) {
                        console.log('Failed Child Process : ', err)
                    }
                } else {
                res.send({
                    status: false,
                    message: 'There was an issue parsing the pdf file',
                    text: ['Could not parse pdf file'],
                })
                }
            })
        }
    } catch (err) {
    res.status(500).send(err)
  }
})

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
                        id: Math.round(Math.random()), //done so the card can be either of style choice
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
app.post('/reqResults', async (req, res) => {
    console.log(JSON.parse(req.body.data));
    console.log(req.body.data);
    try {
        console.log('Testing Child Process')
        const { spawn } = require('child_process')
        const pyProg = spawn('python', ['./modelQueryJSON.py', req.body.data])
      
        pyProg.stdout.on('data', async function (data) {
        console.log(typeof data)
        console.log('Success Child Process : ', data.toString())
  
        let tempData = []
        data = JSON.parse(data)
        let itr = 0
        for (elem in data) {
          const result = await fetch(recommendationURL2+elem);
          if (!result.ok) {
              throw new Error('API call 2 failed');
          }
          const resourcesArray = await result.json();
          tempData.push({
            id: itr,
            tag: elem,
            question: data[elem],
            resources: resourcesArray                  // Insert your resource request here
          })
          itr += 1
        }
        console.log(tempData)
        res.send({
          status: true,
          message: 'Sent',
          data: tempData
          ,
        })
      })
    } catch (err) {
      console.log('Failed Child Process : ', err)
    }
  })
  
  
app.post('/reqQuestions', async (req, res) => {
try {
    if (!req.files) {
    res.send({
        status: false,
        message: 'No pdf uploaded',
    })
    } else {
    let pdf = req.files.pdf
    const filePath = `./uploads/${pdf.name}`
    await pdf.mv(filePath)

    getText(filePath).then(function (textArray) {
        if (textArray.length > 0) {
        // delete pdf file locally after we are done with it
        fs.unlink(filePath, function (error) {
            if (error) {
            console.error(error)
            }
        })
        console.log(typeof textArray)
        console.log(textArray.length, ' is the returned Length.')

        try {
            let pdfTextArray = textArray.split("Problem")
            let tempData = [];
            let pItr = 1;
            for (let itr = 0; itr < pdfTextArray.length; itr++) {
            tempArr = pdfTextArray[itr].split("(a)");
            (tempArr.length > 1) ? tempData.push({ id: pItr, tag: "Problem " + (pItr++).toString(), question: [tempArr[0]], resources: ["NULL"] }) : 0;
            }
            res.send({
            status: true,
            message: 'Returning Problems',
            data: tempData
            })
        } catch (err) {
            console.log('Failed Problem Parsing : ', err)
        }
        } else {
        res.send({
            status: false,
            message: 'There was an issue parsing the pdf file',
            text: ['Could not parse pdf file'],
        })
        }
    })
    }
} catch (err) {
    res.status(500).send(err)
}
})
  
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

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port ' + listener.address().port)
})

require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const hunnidRoutes = require('./routes/hunnid') // import the routes
const resourceRoutes = require('./routes/resource')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const getText = require('./readPdfText')
const { text } = require('body-parser')

const app = express()

const port = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, //10MB max file size
    },
  }),
)

app.post('/pdfToText', async (req, res) => {
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
            const { spawn } = require('child_process')
            const pyProg = spawn('python3', ['./modelQuery.py', textArray])

            pyProg.stdout.on('data', function (data) {
              console.log(typeof data)
              console.log(data.toString().length)
              console.log('Success Child Process : ', data.toString())

              let tempData = []
              data = JSON.parse(data)
              let itr = 0
              for (elem in data) {
                tempData.push({
                  id: itr,
                  tag: elem,
                  question: data[elem],
                  resources: ["Chapter Request 1", "Chapter Request 2"]                   // Insert your resource request here
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


app.post('/reqResults', async (req, res) => {
  try {
      const { spawn } = require('child_process')
      const pyProg = spawn('python3', ['./modelQuery.py', textArray])

      pyProg.stdout.on('data', function (data) {
        console.log(typeof data)
        console.log(data.toString().length)
        console.log('Success Child Process : ', data.toString())

        let tempData = []
        data = JSON.parse(data)
        let itr = 0
        for (elem in data) {
          tempData.push({
            id: itr,
            tag: elem,
            question: data[elem],
            resources: ["Chapter Request 1", "Chapter Request 2"]                   // Insert your resource request here
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
    res.status(500).send(err)
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


app.use('/', hunnidRoutes)

// database conn
mongoose.connect(
  process.env.MONGODB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err) => {
    if (err) return console.log('Error: ', err)
    console.log(
      'MongoDB Connection : Ready state is:',
      mongoose.connection.readyState,
    )
  },
)

const listener = app.listen(process.env.PORT || 3001, () => {
  console.log('App listening on port ' + listener.address().port)
})

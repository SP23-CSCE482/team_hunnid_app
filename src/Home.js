import './App.css'
import React, { useContext, useState } from 'react'
import UserContext from './components/user'
import hunnidpng from './resources/hunnidpng.png'
import PdfUpload from './components/pdfUpload'
import TextUpload from  './components/textUpload'

const url = 'http://localhost:3001/pdfToText'
const urlForText = 'http://localhost:3001/TextBoxToRecommendation'

function Home() {
  const [pdfText, setPdfText] = useState(null)
  const [resourceArray, setResourceArray] = useState(null)
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null

  const handleUploadedFile = (file) => {
    let formData = new FormData()
    formData.append('pdf', file[0], file[0].name)
    formData.append('Content-Type', 'application/pdf')

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    }

    fetch(url, requestOption)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result)
        setPdfText(parsedResult.data.text)
      })
      .catch((error) => console.log('error', error))
  }
  const handleUploadedText = (event) => {
    event.preventDefault()
    let formData = new FormData()
    formData.append("question",document.getElementById('questionToCategorize').value)
    const requestOptions = {
      method: 'POST',
      body: formData,
    }

    fetch(urlForText, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parsedResult = JSON.parse(result)
        console.log(parsedResult.data)
        console.log(Array.isArray(parsedResult.data))
        setResourceArray(parsedResult.data)
        console.log(resourceArray)
      })
      .catch((error) => console.log('error', error))
      document.getElementById('questionToCategorize').value =''
  }
  return (
    <div data-testid="home-1" className="App-background">
      <div data-testid="home-2" className="App-header">
        {!isLoggedin && (
          <div className={'d-flex flex-column align-items-center py-5'}>
            <img src={hunnidpng} width={250} />
            <h2
              data-testid="welcome"
              className={'text-center font-weight-bold'}
            >
              Personalized studying, personalized learning.<br></br>
              Login to get started.
            </h2>
          </div>
        )}
        {isLoggedin && (
          <div className={'d-flex flex-column align-items-center '}>
            <h2
              data-testid="welcomeUser"
              className={'text-center font-weight-bold'}
            >
              Howdy {user.given_name}!
            </h2>
            <img src={hunnidpng} width={250} />
            <p className={'instructions'}>
              Upload your assignment below, and we&apos;ll recommend you study
              materials that best suit your needs.
            </p>
            <div className="upload-section">
              <form onSubmit={handleUploadedText}>
                  <label>
                    Input Question to Categorize:
                    <textarea id="questionToCategorize" rows="4" cols="50">
                    </textarea>
                  </label>
                <input type="submit" value="Submit"/>
              </form>
              <PdfUpload
                data-testid="FileUpload"
                accept=".pdf"
                updateFileCb={handleUploadedFile}
              />
              <div className="extracted-text-section">

                {/* {resourceArray &&
                  resourceArray.map ((resources) => (<p key={resources._id}>{resources.resource_name +" is a recommendation based on: "+ resources.tags}</p>))} */}
                {resourceArray &&
                  resourceArray.map ((resources) => (<p key = {resources}>{resources}</p>))}
                {pdfText &&
                  pdfText.map((page, index) => <p key={index}>{page}</p>)}
                
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Home

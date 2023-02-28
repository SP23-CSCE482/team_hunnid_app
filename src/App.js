import './App.css'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import { useEffect, useState } from 'react'
import UserContext from './components/user'
import Upload from './components/upload'
import PdfUpload from './components/pdfUpload'

//import styled from 'styled-components';


// <div className="extracted-text-section">
// {pdfText && pdfText.map((page, index) => <p key={index}>{page}</p>)}
// </div>


// Substitute with proper string according to api.
const url = "http://localhost:3001/pdfToText";

function App() {
  
  const [pdfText, setPdfText] = useState(null);
  const [user, setUser] = useState({})

  const handleUploadedFile = (file) => {
    let formData = new FormData();
    formData.append("pdf", file[0], file[0].name);
    formData.append("Content-Type", "application/pdf");

    const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    };

    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        const parsedResult = JSON.parse(result);
        setPdfText(parsedResult.data.text);
      })
      .catch(error => console.log('error', error));
    }

    function handleSignOut(event) {
      setUser({}) // set user back to empty object
      document.getElementById('signInDiv').hidden = false
    }
    function handleCallbackResponse(response) {
      console.log('Encoded JWT ID token: ' + response.credential)
      var userObject = jwt_decode(response.credential)
      console.log(userObject)
      setUser(userObject)
      document.getElementById('signInDiv').hidden = true
    }
    useEffect(() => {
      /* global google*/
      window.google.accounts.id.initialize({
        client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
        callback: handleCallbackResponse,
      })

      window.google.accounts.id.renderButton(
        document.getElementById('signInDiv'),
        {
          theme: 'outline',
          size: 'large',
        },
      )

      window.google.accounts.id.prompt()
    }, [])

    //If there is no user, show sign in button, if user, show home page
    return (
      <>
        <UserContext.Provider value={user}>
          <div id="signInDiv" className="App-background"></div>

          {Object.keys(user).length != 0 && ( // signed in
            <div className="App-background" data-testid="signedin">
              <button
                type="button"
                className="btn btn-light"
                onClick={(e) => handleSignOut(e)}
              >
                Sign Out
              </button>
              <h3 className="text-light ">{user.name}</h3>
              <img className="rounded" src={user.picture}></img>
            </div>
          )}
          <div className="App-background">
            <div className="App-component">
              <div className="container">
              <div className="upload-section">
                  <p className="title">
                    Upload a .pdf file to extract its text
                  </p>
                  <PdfUpload
                    accept=".pdf"
                    updateFileCb = {handleUploadedFile}
                  />
                </div>

              </div>
            </div>
          </div>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </UserContext.Provider>
      </>
    )
  }


  export default App

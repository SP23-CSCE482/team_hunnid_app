import './App.css'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import { useEffect, useState } from 'react'
import UserContext from './components/user'

function App(props) {
  console.log(process.env.CHEESE)
  console.log(process.env.GOOGLE_OAUTH_CLIENT_ID)
  const [user, setUser] = useState({})
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
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App

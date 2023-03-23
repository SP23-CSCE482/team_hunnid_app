import './App.css'
import jwt_decode from 'jwt-decode'
import * as React from 'react'
import Home from './Home'
import { useEffect, useState } from 'react'
import UserContext from './components/user'
//import styled from 'styled-components';

// Substitute with proper string according to api.

function App() {
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
      client_id: 'process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID',
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
        <div
          id="signInDiv"
          className="App-background"
          data-testid="signInDiv"
        ></div>

        {Object.keys(user).length != 0 && ( // signed in
          <div className="App-background" data-testid="signedin">
            <button
              type="button"
              className="signOutButton"
              onClick={(e) => handleSignOut(e)}
            >
              Sign Out
            </button>
            <div className="card">
              <img src={user.picture} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
              </div>
            </div>
          </div>
        )}
        <Home />
      </UserContext.Provider>
    </>
  )
}

export default App

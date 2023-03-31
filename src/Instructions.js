import './styles/App.css'
import hunnidpng from './resources/hunnidpng.png'
import UserContext from './components/user'
import React, { useContext, useState } from 'react'
import singleResource from './resources/singleResource.gif'
import uploadapdf from './resources/uploadapdf.gif'
function Instructions() {
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null
  return (
    <div data-testid="instructions-1" className="App-background">
      <div data-testid="instructions-2" className="App-header">
        {!isLoggedin && (
          <div className={'d-flex flex-column align-items-center py-5'}>
            <img src={hunnidpng} data-testid="hunnidlogodefault" width={250} />
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
          <div className={'d-flex flex-column align-items-center'}>
            <h2
              data-testid="welcomeUser"
              className={'text-center font-weight-bold'}
            >
              Howdy {user.given_name}!
            </h2>
            <img src={hunnidpng} width={250} data-testid="hunnidlogo" />
            <div className="instructions">
              Hunnid supports the below two methods of finding resources for
              Calculus-based questions.
            </div>

            <div className="instructions-container">
              <div className="instructions-col">
                <div className="instructions-title">Single Question </div>
                <div className="instructions-content">
                  1. Enter your question in the input box provided.
                </div>
                <div className="instructions-content">
                  2. Click the &apos;Get Resources&apos; button.
                </div>
                <div className="img-div">
                  <img
                    src={singleResource}
                    style={{ paddingTop: 5 }}
                    width={500}
                  />
                </div>
              </div>
              <div className="instructions-col">
                <div className="instructions-title">Uploading a File </div>
                <div className="instructions-content">
                  1. Upload your assignment by clicking the &apos;Upload
                  Assignment&apos; button.
                </div>
                <div className="instructions-content">
                  2. After uploading your assignment, you&apos;ll be prompted to
                  check the questions you would like to receive study
                  recommendations for.
                </div>
                <div className="instructions-content">
                  3. Once you have checked off the question you&apos;d like,
                  click the &apos;Retrieve My Resources&apos; button to receive
                  your recommendations.
                </div>
                <div className="img-div">
                  <img
                    src={uploadapdf}
                    width={500}
                    style={{
                      paddingBottom: 10,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Instructions

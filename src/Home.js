import './App.css'
import React, { useContext } from 'react'
import UserContext from './components/user'
import FileUpload from './components/upload'
import hunnidpng from './resources/hunnidpng.png'
function Home(props) {
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null
  return (
    <div data-testid="home-1" className="App-background">
      <div data-testid="home-2" className="App-header">
        {!isLoggedin && (
          <div className={'d-flex flex-column align-items-center '}>
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
              Howdy, {user.given_name}!
            </h2>
            <img src={hunnidpng} width={250} />
            <p>
              Upload your assignment below, and we&apos;ll recommend you study
              materials that best suit your needs.
            </p>
          </div>
        )}
        {isLoggedin && <FileUpload data-testid="FileUpload" />}
      </div>
    </div>
  )
}
export default Home

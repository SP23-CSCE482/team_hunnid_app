import './App.css'
import React, { useContext } from 'react'
import UserContext from './components/user'
import FileUpload from './components/upload'
function Home(props) {
  const user = useContext(UserContext)
  const isLoggedin = user ? Object.keys(user).length != 0 : null
  return (
    <div data-testid="home-1" className="App-background">
      <div data-testid="home-2" className="App-header">
        {!isLoggedin && (
          <h2 data-testid="welcome">
            Welcome to AI Personalized Learning, please login using your google
            account
          </h2>
        )}
        {isLoggedin && (
          <h2 data-testid="welcomeUser">
            Welcome to AI Personalized Learning, {user.given_name}
          </h2>
        )}
        {isLoggedin && <FileUpload data-testid="FileUpload" />}
      </div>
    </div>
  )
}
export default Home

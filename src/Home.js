import './App.css'
import React, { useContext } from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import UserContext from './components/user'
import FileUpload from './components/upload'
const Home = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }
  const user = useContext(UserContext)
  const welcometext = 'please login using your google account'
  const isLoggedin = Object.keys(user).length != 0
  return (
    <div className="App-background">
      <div className="App-header">
        <h2>
          Welcome to AI Personalized Learning,{' '}
          {isLoggedin ? user.given_name : welcometext}
        </h2>
        {isLoggedin && <FileUpload />}
      </div>
    </div>
  )
}
export default Home

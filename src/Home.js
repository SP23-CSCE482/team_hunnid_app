import './App.css'
import React from 'react'
import { Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
  }
  return (
    <div className="App-background">
      <div className="d-flex flex-row-reverse">
        <div className="p-2">
          <button
            type="button"
            className="btn btn-light"
            onClick={navigateLogin}
          >
            Login
          </button>
        </div>
      </div>

      <div className="App-header">
        <h2>Welcome to AI Personalized Learning</h2>
        <button type="button" className="btn btn-light" onClick={navigateLogin}>
          Login
        </button>
      </div>
    </div>
  )
}
export default Home

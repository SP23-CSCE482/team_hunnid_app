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
      <div class="d-flex flex-row-reverse">
        <div class="p-2">
          <button
            type="button"
            class="btn btn-light"
            variant="contained"
            onClick={navigateLogin}
          >
            Login
          </button>
        </div>
      </div>

      <div className="App-header">
        <h2>Welcome to AI Personalized Learning</h2>
        <button type="button" class="btn btn-light" onClick={navigateLogin}>
          Login
        </button>
      </div>
    </div>
  )
}
export default Home

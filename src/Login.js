import './Login.css'
import LoginButton from './components/login'
import LogoutButton from './components/logout'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom'

const clientId =
  '521713186873-do0pk7f1oi7sc6r127jr3v01h2uk2jmc.apps.googleusercontent.com'

const Login = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }

    gapi.load('client:auth2', start)
  })
  const navigate = useNavigate()

  const navigateSignup = () => {
    navigate('/signup')
  }
  return (
    <div className="Login-background">
      <div className="Login-header">
        <h2 class="text-white">Login</h2>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <button class="btn-white" onClick={navigateSignup}>
          Sign Up
        </button>
      </div>
    </div>
  )
}
export default Login

import logo from './logo.svg'
import './App.css'
import LoginButton from './components/login'
import LogoutButton from './components/logout'
import { gapi } from 'gapi-script'
import { useEffect } from 'react'
const clientId =
  '521713186873-do0pk7f1oi7sc6r127jr3v01h2uk2jmc.apps.googleusercontent.com'
function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }

    gapi.load('client:auth2', start)
  })
  return (
    <div className="App">
      <header className="App-header">
        <button type="button" class="btn-lg btn-light">
          Welcome to AI Personalized Learning
        </button>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
      </header>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  )
}

export default App

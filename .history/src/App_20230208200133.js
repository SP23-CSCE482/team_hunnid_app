import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button className={`btn-primary`}>
          Welcome to AI Personalized Learning
        </button>
        <div className="btn-group">
          <button
            className={`text-capitalize btn btn-lg"`}
            type="button"
          ></button>
          <button type="button" className={`btn btn-large btn-primary`}>
            <h2>I AM A BUTTON</h2>
            <span className="visually-hidden">Toggle Dropdown</span>
          </button>
        </div>
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

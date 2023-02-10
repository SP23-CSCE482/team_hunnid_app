import logo from './logo.svg'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Welcome to AI Personalized Learning</h2>
        <div className="btn-group">
          <button
            className={`text-capitalize btn btn-lg"`}
            type="button"
          ></button>
          <button
            type="button"
            className={`btn btn-lg dropdown-toggle dropdown-toggle-split`}
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
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

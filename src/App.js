import logo from './logo.svg'
import './App.css'

import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './Login'
import Home from './Home'
import Signup from './signup'

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App

import './App.css';
import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <>
      <Routes>
        <Route exact path= "/" element={<Home />} />
        <Route exact path= "/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

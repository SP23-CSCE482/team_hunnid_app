import './App.css';
import * as React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import UserPage from './UserPage';

function App() {
  return (
    <>
      <Routes>
        <Route exact path= "/" element={<Home />} />
        <Route exact path= "/login" element={<Login />} />
        <Route exact path= "/userpage" element={<UserPage />} />
      </Routes>
    </>
  );
}

export default App;

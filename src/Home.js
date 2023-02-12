import './App.css';
import React from 'react';
import { Button } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
const Home = () =>{
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }
    return (
        <div className="App-background">
            <div className='App-header'>
                <h2>Welcome to AI Personalized Learning</h2>
                <Button variant="contained" onClick={navigateLogin}>
                    Login
                </Button>
                
            </div>

        </div>
    );
}
export default Home;
import './Login.css'
import { Button } from '@material-ui/core';
import {useNavigate} from 'react-router-dom';
const Login = () =>{
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/userpage');
    }
    return (
        <div className='Login-background'>
            <div className='Login-header'>
                <h2>Login</h2>
                <Button variant="contained" onClick={navigateLogin}>
                    Sign-In
                </Button>
                <Button variant="contained">
                    Sign-Up
                </Button>
                
            </div>
        </div>
    )
}
export default Login;
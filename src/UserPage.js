import './UserPage.css'
import { Button } from '@material-ui/core';
import FileUpload from './components/upload.js';
import {useNavigate} from 'react-router-dom';
const Login = () =>{
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/login');
    }
    return (
        <div className='App-background'>
            <div className='App-header'>
                <h2>User Page</h2>
                <Button variant="contained" onClick={navigateLogin}>
                    Sign-Out
                </Button>
                <FileUpload />
            </div>
        </div>
    )
}
export default Login;
import './Login.css'
import FileUpload from './component/Upload.js';
const Login = () =>{
    return (
        <div className='Login-background'>
            <div className='Login-header'>
                <h2>Login</h2>
                <FileUpload />
            </div>
        </div>
    )
}
export default Login;
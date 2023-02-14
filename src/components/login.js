import { GoogleLogin } from 'react-google-login'

const clientId =
  '521713186873-do0pk7f1oi7sc6r127jr3v01h2uk2jmc.apps.googleusercontent.com'

function Login() {
  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user:', res.profileObj)
  }

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res: ', res)
  }
  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  )
}
export default Login
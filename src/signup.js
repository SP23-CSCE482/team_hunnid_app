import './signup.css'
import { useEffect } from 'react'
import { gapi } from 'gapi-script'

const clientId =
  '521713186873-do0pk7f1oi7sc6r127jr3v01h2uk2jmc.apps.googleusercontent.com'

const Login = () => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      })
    }

    gapi.load('client:auth2', start)
  })
  return (
    <div className="Login-background">
      <div className="Login-header">
        <h1 class="text-light">Sign up here!</h1>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1" class="text-light">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="text-light">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>

          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
export default Login

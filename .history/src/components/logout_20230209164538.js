import {GoogleLogout} from 'react-google-login';

const clientId = "521713186873-do0pk7f1oi7sc6r127jr3v01h2uk2jmc.apps.googleusercontent.com"

function Logout(){
    const onSuccess = () =>{
        console.log("Log out successful!");
    }

    return (
        <div id = "signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
        </div>
    )
}
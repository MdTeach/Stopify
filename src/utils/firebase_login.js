import * as firebase from "firebase/app";
import "firebase/auth";
import app from './firebase'

const handleGoogleLogin = async()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    app.auth().signInWithPopup(provider).then(function(result) {
        }).catch(function(error) {
            console.log(error)
        });
}

const handleFacebookLogin = async()=>{
    const provider = new firebase.auth.FacebookAuthProvider();
    app.auth().signInWithPopup(provider).then(function(result) {
        }).catch(function(error) {
            console.log(error)
        });
}


const handleLogout = ()=>{
    app.auth().signOut();
}

export {handleGoogleLogin,handleLogout,handleFacebookLogin};
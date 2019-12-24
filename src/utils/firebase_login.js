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

const registerWithEmail = (data)=>{
    console.log(data.email)
    app.auth()
        .createUserWithEmailAndPassword(data.email, data.pass)
        .then(()=>{
            console.log("Registered new user")
            //success
        })
        .catch((err)=>{
            console.log(err);
            alert(err.message);
        })
}

const loginWithEmail = (data)=>{
    console.log(data.email)
    app.auth()
        .signInWithEmailAndPassword(data.email, data.pass)
        .then(()=>{
            console.log("Registered new user")
            //success
        })
        .catch((err)=>{
            console.log(err);
            alert(err.message);
        })
}

const handleLogout = ()=>{
    app.auth().signOut();
}

export {
    handleGoogleLogin,
    handleLogout,
    handleFacebookLogin,
    registerWithEmail,
    loginWithEmail
};
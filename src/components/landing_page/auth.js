import React, { Component } from "react"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"
import SignedIn from "./signedIn";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



firebase.initializeApp({
    apiKey: "AIzaSyDyVwvz3K-QBehn9HEa161q9ACFQU8ohj0",
    authDomain: "auth-a3c8b.firebaseapp.com"
  })
  
  class Auth extends Component {
     state = { isSignedIn: false }
    uiConfig = {
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
      ],
      callbacks: {
        signInSuccess: () => false
      }
    }
  
    componentDidMount = () => {
      firebase.auth().onAuthStateChanged(user => {
        this.setState({ isSignedIn: !!user })
        console.log("user", user)
      })
    }
  
    render() {
      return (
        <Router>
        <div className="App">
          {this.state.isSignedIn ? (
           //<Link to='/signedIn'></Link>
          
           <span>
           console.clear()
      <div>hello</div>
       <div>Signed In!</div>
       <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
       <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
       <img
         alt="profile picture"
         src={firebase.auth().currentUser.photoURL}
       />
     </span>           ) : (
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          )}
          
        </div>
        </Router>
      )
    }
   
  }
  
  export default Auth;
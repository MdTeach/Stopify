import React from 'react'
import {Link} from 'react-router-dom'

import {registerWithEmail} from '../../../utils/firebase_login'

import './signUp.css'
import logo from "./logo2.png";

import GoogleButton from "./social_buttons/googel"
import FacebookButton from "./social_buttons/facebook"

const Register = ()=>{
    //defining the refrence to the input fileds
    let email1 = React.createRef();
    let email2 = React.createRef();
    let pass = React.createRef();
    let name = React.createRef();
    let dob = React.createRef();

    const handleRegister = (event)=>{
        event.preventDefault();
        if(email1.current.value !== email1.current.value){
            alert("Email did't match")
        }else{
            const data = {email:email1.current.value,pass:pass.current.value} //data to be registered
            registerWithEmail(data)
        }
    }

    return <div className="register-wrapper">
        <div className="center">  <img src={logo} width="100%" height="100%" alt="img"/></div>
        <hr/>
        <FacebookButton/>
        <GoogleButton/>
        <br/>
        <h1>OR</h1>
        <br/>
        <h2><b>Sign up with your email address</b></h2>
        <form onSubmit={handleRegister}>
            <input type="email" ref={email1} required placeholder="Email" className="formss"/><br/><br/>
            <input type="email" ref={email2} required placeholder="Confirm Email" className="formss"/><br/><br/>
            <input type="password" ref={pass} required placeholder="Password" className="formss"/><br/><br/>
            <input type="text" ref={name} required placeholder="What should we call you?"className="formss"/><br/><br/>
            <h3 >Date of birth</h3>
            <input type="date" ref={dob} required placeholder="Date of Birth" className="formss"/>
            <br/><hr/>
            <input type="submit" className='button_log' value="Sign Up"/>
                    
        </form>
        <br/>
        <h4 className="last">Already have account? <br/><Link to="/login" className ="already">Log In</Link></h4>
        
    </div>
}

export default Register;
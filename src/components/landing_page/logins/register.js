import React from 'react'
import {Link} from 'react-router-dom'

import './signUp.css'
import logo from "./logo2.png";

import GoogleButton from "./social_buttons/googel"
import FacebookButton from "./social_buttons/facebook"

const Register = ()=>{
    return <div className="register-wrapper">
        <div class="center">  <img src={logo} width="100%" height="100%"/></div>
        <hr/>
        <FacebookButton/>
        <GoogleButton/>
        <br/>
        <h1>OR</h1>
        <br/>
        <h2><b>Sign up with your email address</b></h2>
        <form>
            <input type="email" required placeholder="Email" class="formss"/><br/><br/>
            <input type="email" required placeholder="Confirm Email" class="formss"/><br/><br/>
            <input type="password" required placeholder="Password"class="formss"/><br/><br/>
            <input type="text" required placeholder="What should we call you?"class="formss"/><br/><br/>
            <h3 >Date of birth</h3>
            <input type="date" required placeholder="Date of Birth" class="formss"/>
            <br/><hr/>
            <button class='button_log'>
                SIGN UP
            </button>
        </form>
        <br/>
        <h4 class="last">Already have account? <br/><Link to="/login" className ="already">Log In</Link></h4>
        
    </div>
}

export default Register;
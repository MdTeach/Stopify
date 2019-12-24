import React from 'react'
import {Link} from 'react-router-dom'

import './login.css'
import logo from "./logo2.png";

import GoogleButton from "./social_buttons/googel"
import FacebookButton from "./social_buttons/facebook"

const Login = ()=>{
    return (
        <div className="login-wrapper">
            <div className="login-logo"><img src={logo} width="100%" height="100%" alt="img"/></div>
            <h3 className="login-text1">To continue, log in to Stopify</h3>
            <hr/>
            <br/>
            <FacebookButton/>
            <GoogleButton/>
            <hr/>
            <h5>OR</h5>
            <form className="input-form">
                <input type="email" required placeholder="E-mail address" className="upass"/><br/><br/>
                <input type="password" required placeholder="Password" className="upass"/>
                <br/><br/>
                <button className='button_log'>
                    LOG IN
                </button>
                <hr/>
                
            </form>
            <h1 className='center'><b>Don't have an account?</b></h1>
            <br/>
            <Link to="/register"><button className="button_signUp">SIGN UP FOR SPOTIFY</button></Link>
            
        </div>
    );
}

export default Login
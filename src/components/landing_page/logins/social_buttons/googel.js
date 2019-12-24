import React from 'react'

import {handleGoogleLogin} from '../../../../utils/firebase_login';

import './social_button_style.css'
export default ()=>{
    return(
        <button className="loginBtn loginBtn--google" onClick={handleGoogleLogin}>
                Login with Google
        </button>
    )
};
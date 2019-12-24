import React from 'react'
import {handleFacebookLogin} from '../../../../utils/firebase_login';


import './social_button_style.css'

export default ()=>{
    return(
        <button onClick={handleFacebookLogin} className="loginBtn loginBtn--facebook">
                Login with Facebook
        </button>
    )
};
import React,{useContext} from 'react'

import {handleLogout} from '../../utils/firebase_login'
import {AuthContext} from '../../auth/Auth';

export default ()=>{
    const { currentUser } = useContext(AuthContext);
    return(
        <div>
            <hr/>
            <p>Log in as {currentUser.email} by {currentUser.displayName}</p>
            <button onClick={handleLogout}>Log out</button>
        </div>
    );
}
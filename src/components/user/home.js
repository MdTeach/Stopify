import React from 'react'

import {handleLogout} from '../../utils/firebase_login'
export default ()=>(
    <>
    <h1>Home</h1>
    <button onClick={handleLogout}>Log out</button>
    </>
)
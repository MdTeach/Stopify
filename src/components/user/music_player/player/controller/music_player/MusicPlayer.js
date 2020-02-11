import React from 'react'

import PlayerWrapper from './wrapper/Wrapper'
export default ()=>{
    const url ="https://firebasestorage.googleapis.com/v0/b/auth-a3c8b.appspot.com/o/songs%2FMemories%20-%20Maroon%205.mp3?alt=media&token=94b50f5e-325d-4ebd-a498-1a5f084b9d4a"
    const audio = new Audio(url)
    return(
        <div className="musicPlayer">
            <PlayerWrapper audio={audio}/>
        </div>
    )
}
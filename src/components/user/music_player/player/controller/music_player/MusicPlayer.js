import React from 'react'

import PlayerWrapper from './wrapper/Wrapper'
export default (props)=>{
    return(
        <div className="musicPlayer">
            <PlayerWrapper audioInstance={props.audioInstance}/>
        </div>
    )
}
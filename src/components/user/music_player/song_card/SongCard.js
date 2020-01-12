import React from 'react'
export default (props)=>{
    return(
        <div>
            <img src={props.data.imageUrl} alt="image cover" width="100" height="100" />
            <h4>{props.data.name}</h4>
            <h5>{props.data.artist}</h5>
        </div>
    )
}
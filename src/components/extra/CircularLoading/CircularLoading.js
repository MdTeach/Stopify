import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Returns circular progress indicator 
 * @param color color of the progress bar default secondary
*/
export default (props)=>(
    <div style={{
        width:"100%",
        height:"100%",
        textAlign:"center"
    }}>
        <CircularProgress 
            color={(props.color) ? props.color : "secondary"  } 
        />
    </div>
);
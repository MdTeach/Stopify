import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

/**
 * Returns circular progress indicator 
 * @param color color of the progress bar default secondary
*/
export default (props)=>(
    <CircularProgress color={(props.color) ? props.color : "secondary"  } />
);
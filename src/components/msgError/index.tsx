import React from 'react';

import {Error} from './styles';

const MsgError = ({ error }) => { 
    return error ? ( 
        <Error>
            {error}1
        </Error>
    ) : null 
} 
 
export default MsgError;
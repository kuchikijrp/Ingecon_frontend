import React from 'react';

import {OverlayContent} from './styles';

import Spinner from 'react-spinkit';

const Loading = ({ loading, message }) => { 
    return loading ? ( 
        <OverlayContent> 
            <div className='wrapper'> 
                <Spinner 
                    name='wave' 
                    fadeIn='none' 
                    color='white' 
                /> 
                <span className='message'> 
                    {message} 
                </span> 
            </div> 
        </OverlayContent> 
    ) : null 
} 
 
export default Loading;
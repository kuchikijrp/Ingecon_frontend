import React from 'react';

import {Container} from './styles';

const PageHeader = ({ header }) => { 
    return ( 
    <Container>
        <h2>{header}</h2>
    </Container>
    )  
} 
 
export default PageHeader;
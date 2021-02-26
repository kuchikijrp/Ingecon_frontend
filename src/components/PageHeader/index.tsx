import React from 'react';

import logoIngecon from '../../assets/logo_Ingecon.svg';

import {Container} from './styles';

const PageHeader = ({ header }) => { 
    return ( 
    <Container>
        <h2>{header}</h2>
        <img src={logoIngecon} />
        
    </Container>
    )  
} 
 
export default PageHeader;
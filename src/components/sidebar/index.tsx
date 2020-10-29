import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

import { Container  } from './styles';
import Menu from '../../pages/menu';


const SibeBar: React.FC = () => {

  return (
    <Container>
        <ul>
            {/* <li><a href="#">Home</a></li> */}
            <li><a >Montagem Externa</a>
                <ul>
                    <li><NavLink to="/solicitacoesMontagem">Minhas Solicitações</NavLink></li>
                </ul> 
            </li>

        </ul>
    </Container>
    );
}

export default SibeBar;
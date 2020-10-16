import React, { useEffect, useState } from 'react';

import { Container  } from './styles';
import Menu from '../../pages/menu';


const SibeBar: React.FC = () => {

  return (
    <Container>
        <ul>
            {/* <li><a href="#">Home</a></li> */}
            <li><a href="#">Montagem Externa</a>
                <ul>
                    <li><a href="/solicitacoesMontagem">Minhas Solicitações</a></li>
                </ul> 
            </li>

        </ul>
    </Container>
    );
}

export default SibeBar;
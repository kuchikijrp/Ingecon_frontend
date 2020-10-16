import React from 'react';

import {ContainerButton} from './styles';

interface ButtonProps {
    name: string | any;
    onClicks?: any;
}

const Button : React.FC<ButtonProps> = ({
    name, onClicks
}) => {
    return(
        <ContainerButton>
            <button onClick={onClicks} >{name}</button>
        </ContainerButton>
    )
}

export default Button;
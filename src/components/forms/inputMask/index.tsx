import React, { InputHTMLAttributes, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { mask, unMask } from 'remask';


import { Container, ContainerInput, Headerinput, Title, Error } from './styles';

const Input : React.FC<InputHTMLAttributes<HTMLInputElement>> = ({... props}) => {
    // console.log(mask('juliano', ['AAAS']))
    return (
        <>  
            <Container>
                <ContainerInput>
                    <input {... props} />
                </ContainerInput>
            </Container>
        </>
    )
}

export default Input
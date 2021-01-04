import React, { InputHTMLAttributes, useState, useCallback } from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { mask, unMask } from 'remask';

import { Cep, Currency } from './masks'

import { Container, ContainerInput, Headerinput, Title, Error } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    mask?: "cep" | "currency",
    title?: string;
    errors?: FieldError | undefined;
}

const Input : React.FC<InputProps> = ({mask, title, errors, ...props}) => {
    // console.log(mask('juliano', ['AAAS']))
    const handleKeyUp = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        if(mask ==='cep'){
            Cep(e);
        }
        if(mask ==='currency'){
            Currency(e);
        }

    }, [mask])
    return (
        <>  
            <Container>
                <Headerinput>
                    <Title>{title}:</Title>
                    <Error>{errors?.message}</Error>
                </Headerinput>
                <ContainerInput>
                    <input {...props} onKeyUp={handleKeyUp} />
                    {errors && <FiAlertCircle size={20} />}
                </ContainerInput>
            </Container>
        </>
    )
}

export default Input
import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi';
import { mask, unMask } from 'remask';


import { Container, ContainerInput, Headerinput, Title, Error } from './styles';


type RefReturn =
| string
|((instance: HTMLInputElement | null) => void)
|React.RefObject<HTMLInputElement>
|null
|undefined;

export interface InputProps {
    name: string;
    type: string;
    placeholder?: string;
    title?: string;
    register?: RefReturn;
    errors?: FieldError | undefined;
    setData?: any;
    disabled?: boolean;
    value?: string;
}

const Input : React.FC<InputProps> = ({
    name, type, placeholder, title, register, errors, setData, disabled, value
}) => {
    // console.log(mask('juliano', ['AAAS']))
    return (
        <>  
            <Container>
                <Headerinput>
                    <Title>{title}:</Title>
                    <Error>{errors?.message}</Error>
                </Headerinput>
                <ContainerInput>
                    {/* <input name={name} type={type} ref={register} placeholder={placeholder} onChange={setData} disabled={disabled} step="any"/> */}
                    <input name={name} type={type} ref={register} placeholder={placeholder} onChange={setData} disabled={disabled} value={value ? value : ''} step="any"/>
                    {errors && <FiAlertCircle size={20} />}
                </ContainerInput>
            </Container>
        </>
    )
}

export default Input
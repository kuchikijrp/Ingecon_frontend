import React from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi'


import { Container, ContainerTextArea, HeaderTextArea, Title, Error } from './styles';


type RefReturn =
    | string
    |((instance: HTMLTextAreaElement | null) => void)
    |React.RefObject<HTMLTextAreaElement>
    |null
    |undefined;

export interface TextAreaProps {
    name: string;
    title?: string;
    register: RefReturn;
    errors: FieldError | undefined;
    disabled?: boolean;
    value?: string;
    rows: number;
    cols: number;
    setData: any;
}

const Input : React.FC<TextAreaProps> = ({
    name, title, register, errors, disabled, value, rows, cols, setData
}) => {
    // console.log(value);
    return (
        <>  
            <Container>
                <HeaderTextArea>
                    <Title>{title}:</Title>
                    <Error>{errors?.message}</Error>
                </HeaderTextArea>
                <ContainerTextArea>
                    <textarea name={name} rows={rows} cols={cols} onChange={setData}/>
                    {errors && <FiAlertCircle size={20} />}
                </ContainerTextArea>
            </Container>
        </>
    )
}

export default Input
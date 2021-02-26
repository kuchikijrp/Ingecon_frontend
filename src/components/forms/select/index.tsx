import React from 'react';
import { FieldError } from 'react-hook-form';
import { FiAlertCircle } from 'react-icons/fi'

import { Container, ContainerSelect, Headerselect, Title, Error } from './styles';

type RefReturn =
    | string
    |((instance: HTMLSelectElement | null) => void)
    |React.RefObject<HTMLSelectElement>
    |null
    |undefined;

interface FieldData {
    id: number;
    name: string;
}

interface SelectProps {
    name: string;
    title?: string;
    register?: RefReturn;
    errors?: FieldError | undefined;
    data: FieldData[];
    value?: string;
    disabled?: boolean;
    setData?: any | undefined;
}

const Select : React.FC<SelectProps> = ({
    name, title, register, errors, data, setData, value, disabled
}) => {
    // console.log(data);
    return (
    
        <>  
            <Container>
                <Headerselect>
                    {title && <Title>{title}:</Title>}
                </Headerselect>
                <ContainerSelect>
                    <select disabled={disabled} value={value} name={name} ref={register} onChange={setData}>
                        <option value="" disabled hidden>--SELECIONE</option>

                        {
                            data.map(option => (<option key={option.id}>{option.name}</option>))
                        }
                    </select>
                    {errors && <FiAlertCircle size={20} />}
                </ContainerSelect>
                    <Error>{errors?.message}</Error>
            </Container>
        </>
    )
}

export default Select
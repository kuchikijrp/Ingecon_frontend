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
    register: RefReturn;
    errors: FieldError | undefined;
    data: FieldData[];
    setData: any | undefined;
}

const Select : React.FC<SelectProps> = ({
    name, title, register, errors, data, setData
}) => {
    return (
        <>  
            <Container>
                <Headerselect>
                    <Title>{title}:</Title>
                    <Error>{errors?.message}</Error>
                </Headerselect>
                <ContainerSelect>
                    <select defaultValue={''} name={name} ref={register} onChange={setData}>
                        <option value="" disabled hidden>--SELECIONE</option>

                        {
                            data.map(option => (<option key={option.id}>{option.name}</option>))
                        }
                    </select>
                    {errors && <FiAlertCircle size={20} />}
                </ContainerSelect>
            </Container>
        </>
    )
}

export default Select
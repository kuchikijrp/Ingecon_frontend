import React, { useState, useEffect } from 'react';
import {RouteComponentProps, useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {Container, Content, LogoIngecon, WrapperInput, LogoMarelli } from '../styles';

import api from '../../../services/api';

import Loading from '../../../components/Loading';

import logoIngecon from '../../../assets/logo_Ingecon.svg';
import logoMarelli from '../../../assets/logo_marelli.svg';


const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { userID = ""} = useParams();

    async function handleSubmit(event: any){
        event.preventDefault();

        setLoading(true);
        if(password === '' || confirmPassword ===''){
            setLoading(false);
            return toast.error('Informe uma senha.');
        }

        if(password !== confirmPassword){
            setLoading(false);
            return toast.error('Confirmar senha diferente de senha.');
        }
        
        const resetPass = await api.put(`/users/resetSenha/${userID}`,
        {
            userID,
            password
        })

        setLoading(false);
        if(resetPass.status = 200){
            toast.success('Senha alterada com sucesso.');
            history.push('/');
        }

        // console.log(resetPass)
    }

    return (
    <>
        <Loading loading={loading} message={''} />
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
        />
        <Container>
            <Content>
                <LogoIngecon src={logoIngecon} />
                <form >

                    <WrapperInput>
                        <input 
                            type="password" 
                            onChange= {event => setPassword(event.target.value)}
                            required/>
                        <label>Password:</label>
                    </WrapperInput>
                    
                    <WrapperInput>
                        <input 
                            type="password" 
                            onChange= {event => setConfirmPassword(event.target.value)}
                            required/>
                        <label>Confirma Password:</label>
                    </WrapperInput>

                    <button onClick={handleSubmit}>Salvar</button>
                </form>
                <LogoMarelli src={logoMarelli} />
            </Content>
        </Container>
    
    </>
    )
};

export default Login;
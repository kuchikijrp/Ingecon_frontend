import React, { useState } from 'react';

import {Container, Content, LogoIngecon, Form, UserInfo, User, Password, LoginBtn, LogoMarelli } from './styles';

import logoIngecon from '../../assets/logo_Ingecon.svg';
import logoMarelli from '../../assets/logo_marelli.svg';


const Login: React.FC = () => {
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(){
        // event.preventDefault();

        console.log(usuario, password);

    }

    return (
    <>
        <Container>
            <Content>
                <LogoIngecon src={logoIngecon} />
                <Form >
                    <UserInfo>
                        <User 
                            placeholder="Entre com seu email" 
                            onChange={event => setUsuario(event.target.value)} 
                            autoFocus 
                        />
                        <Password 
                            type="Password" 
                            placeholder="Entre com sua senha" 
                            onChange={event => setPassword(event.target.value)}
                        />
                        
                    </UserInfo>
                    <LoginBtn 
                        type="submit" 
                        onClick={handleSubmit}
                    > Sing In </LoginBtn>
                </Form>
                <LogoMarelli src={logoMarelli} />
            </Content>
        </Container>
    
    </>
    )
};

export default Login;
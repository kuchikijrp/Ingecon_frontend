import React, { useState, useEffect } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {Container, Content, LogoIngecon, WrapperInput, LogoMarelli } from './styles';

import api from '../../services/api';

import Loading from '../Loading';

import logoIngecon from '../../assets/logo_Ingecon.svg';
import logoMarelli from '../../assets/logo_marelli.svg';


const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [loading, setLoading] = useState(false);

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        function Logout(){
          localStorage.removeItem("user");
          sessionStorage.removeItem("token");
        }
    
        Logout();
      }, [])

    async function handleSubmit(event: any){
        event.preventDefault();

    setLoading(true);

        const response = await api.post('/auth', {
            usuario, password
          });

          if (response.data.error) {
            toast.error(response.data.error);
            // setMsg(response.data.error);
            setLoading(false);
        } else {
            
            localStorage.setItem("user", JSON.stringify(response.data.user));
            localStorage.setItem("rules", JSON.stringify(response.data.rules));
            sessionStorage.setItem('token', response.data.token);
            history.push('/solicitacoesMontagem');
        }
    setLoading(false);
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
                            type="text" 
                            onChange= {event => setUsuario(event.target.value)}
                            required/>
                        <label>Usuário:</label>
                    </WrapperInput>
                    
                    <WrapperInput>
                        <input 
                            type="password" 
                            onChange= {event => setPassword(event.target.value)}
                            required/>
                        <label>Senha:</label>
                    </WrapperInput>

                    <button onClick={handleSubmit}>Logar</button>
                </form>
                <LogoMarelli src={logoMarelli} />
            </Content>
        </Container>
    
    </>
    )
};

export default Login;
import React, { useState, useEffect } from 'react';
import {RouteComponentProps} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import {Container, Content, LogoIngecon, WrapperInput } from './styles';

import api from '../../services/api';

import Loading from '../../components/Loading';

import logoIngecon from '../../assets/logo_Ingecon.svg';

const Login: React.FC<RouteComponentProps> = ({history}) => {
    const [loading, setLoading] = useState(false);

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        function Logout(){
          localStorage.removeItem("user");
          localStorage.removeItem("rules");
          localStorage.removeItem("itensMenu");
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
            // console.log(response.data)
            if(response.data?.user?.reset_pass === 1){
                    // toast.info('Senha temporária, necessario mudar');
                    alert('Senha temporária, necessario mudar');
                    history.push(`/resetPassword/${response.data.user.id}`);
                
                }else{
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    localStorage.setItem("rules", JSON.stringify(response.data.rules));
                    sessionStorage.setItem('token', response.data.token);

                    const menu = await api.get('/montarMenu', 
                    {
                        headers: {
                            "authorization": `Bearer ${response.data.token}`
                        }
                    });

                    if(menu?.data){
                        localStorage.setItem("itensMenu", JSON.stringify(menu.data))
                    }

                    history.push('/menu');
                }
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
            </Content>
        </Container>
    
    </>
    )
};

export default Login;
import React, {useEffect, useState} from 'react';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

import { ToastContainer, toast } from 'react-toastify';

import SideBar from '../../../components/sidebar2';
import Navbar from '../../../components/navbar';

import PagerHeader from '../../../components/PageHeader';

import Input from '../../../components/forms/input';
import Select from '../../../components/forms/select';
import Button from '../../../components/forms/button';

import api from '../../../services/api';

import Loading from '../../../components/Loading';

import { Menu, NavbarContainer, Wrapper, Content, } from './styles';
import { Grid } from '../../../styles/grid';
import { useParams } from 'react-router-dom';


type InputsProps={
    name: string;
    user: string;
    email: string;
    reset: string;
}

const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    user: yup.string().required('Campo obrigatório'),
    email: yup.string().required('Campo obrigatório'),
    reset: yup.string().required('Compo obrigatótio')
});

// const schemaAprovacao = yup.object().shape({
//     aprovacao: yup.string().required('Escolha uma opção')
//   })

const NewUser: React.FC  = () => {
    const [loading, setLoading] = useState(false);
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [reset, setReset] = useState('');
    const [pass, setPass] = useState('');

    const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
    });

    const { userID="" } = useParams();
    
    useEffect(() => {
        async function handle_getUser(){
            try {
                setLoading(true);
                
                const token = sessionStorage.getItem('token');
                
                const response = await api.get(`/users/${userID}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                console.log(response)
                
                if(response?.data?.id){
                    setNome(response.data.name)
                    setUsuario(response.data.usuario)
                    setEmail(response.data.email)
                    setPass(response.data.password)
                    setReset(response.data.reset_pass)
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
                toast.error(error)
            }
        }
        console.log(userID)
        if(userID !== ""){
            handle_getUser()
        }
    }, [])

    async function handle_salvarNovoUsuario(event : any){
      // event.preventDefault();
      setLoading(true);
      const token = sessionStorage.getItem('token');
        try {
            
            const user = await api.post('/users', 
            {
                nome,
                usuario,
                email,
                reset
            },
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });
            
            // console.log(user);
            setLoading(false);
            if (user.data.original){
                toast.error(user.data.original.message);
            }
            if (user.data.error){
                toast.error(user.data.error);
            }
            
            if (user.data.user){
                setPass(user.data.pass)
                toast.success('Usuário criado com sucesso');
            }
            
        } catch (error) {
            setLoading(false)
            toast.error(error);
        }
    }
  return (
    <>
        <Loading loading={loading} message={''}/>
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
        <Grid>
            <Menu >
                <SideBar />
            </Menu>
            <NavbarContainer>
                <Navbar />
            </NavbarContainer>

            <Wrapper>
            <PagerHeader  header={'Usuário'} />

                {/* <InputMask placeholder="hola" setData={event => setBudgeted(event.target.value)} />    */}

                <Content>
                    <form >
                            <Input 
                                title={'Nome'} 
                                name={'name'} 
                                type={'text'} 
                                register={register} 
                                errors={errors.name} 
                                value={nome}
                                setData={event => setNome(event.target.value)} 
                                // disabled={type === 'Montagem Externa' || idMounts ? true : false}
                                focus={true}
                            /> 

                            <Input 
                                title={'Usuário'} 
                                name="user" 
                                type={'text'} 
                                register={register}
                                errors={errors.user}
                                value={usuario}
                                setData={event => setUsuario(event.target.value)}
                            />    

                            <Input 
                                title={'Email'}
                                name={'email'}
                                type={'text'}
                                register={register}
                                errors={errors.email}                                
                                value={email}
                                setData={event => setEmail(event.target.value)}    
                            />
                            <Select 
                                title={'Resetar Senha'}
                                name={'reset'} 
                                data={[{id: 1, name: 'Sim'},{id: 2, name: 'Não'}]} 
                                register={register} 
                                errors={errors.reset} 
                                value={reset}
                                setData={event => setReset(event.target.value)} 
                                // disabled={!userRule ? true : false}
                                />
                            <div className="separator"></div>
                       {reset ?
                            <Input 
                                title={'Senha Temporária'}
                                name={'senhaTemp'}
                                type={'text'}
                                value={pass}
                                disabled={true}
                            />
                       : ''}
                 <Button onClicks={handleSubmit(handle_salvarNovoUsuario)} name={'Salvar'} />


                    </form>
                </Content>
            </Wrapper>
        </Grid>
    </>
    );
}

export default NewUser;
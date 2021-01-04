import React, {useState, useEffect, useCallback} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { mask } from 'remask';

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import SideBar from '../../../components/sidebar';

import PagerHeader from '../../../components/PageHeader';

import Input from '../../../components/forms/input';
import InputMask from '../../../components/forms/inputMask';
import Select from '../../../components/forms/select';
import Button from '../../../components/forms/button';
import TextArea from '../../../components/forms/textArea';

import api from '../../../services/api';

import Loading from '../../../components/Loading';

import { Menu, Wrapper, Content, } from './styles';
import { Grid } from '../../../styles/grid';
import { Cep } from '../../../components/forms/inputMask/masks';

interface Montagem {
    teste: string;
    price: number;
}


const SolicitacaoMontagem: React.FC  = () => {
    const [loading, setLoading] = useState(false);
    const [montagem, setMontagem] = useState<Montagem>({} as Montagem)

    const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
        setMontagem({
            ... montagem,
            [e.currentTarget.name]: e.currentTarget.value
        })
    }, []);


    async function handle_salvarSolicitacao(e: React.FormEvent<HTMLInputElement>){
        e.preventDefault();
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')  || '');

        const emailUser = user.email;

        console.log(montagem.teste);
        console.log(montagem.price)

        setLoading(true);
    
        // const response = await api.post('/requestmounts',
        // {
        //     type : type,
        //     id_at: idAt,
        //     client: 1,
        //     store: store,
        //     contact_store: contact_store,
        //     contact_phone: contact_phone,
        //     type_work: type_work,
        //     start_work: start_work,
        //     end_work: end_work,
        //     qtd_fitters: qtd_fitters,
        //     budgeted: budgeted,
        //     time_discharge: time_discharge,
        //     time_work: time_work,
        //     obs: obs,
        //     emailUser
        // },{
        //     headers: {
        //         authorization: `Bearer ${token}`
        //     }
        // });
        // // console.log(response)
        //     if (response.data.original){
        //         toast.error(response.data.original.message);
        //     }
        //     if (response.data.error){
        //         toast.error(response.data.error);
        //     }

        //     if (response.data.id)
        //         toast.success('Solicitação eviada');
        //     // console.log(response.data);

    setLoading(false);
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

            <Wrapper>
            <PagerHeader  header={'Solicitação Montagem'} />


                <Content>
                    {/* <form > */}
                        <InputMask placeholder="hola" title={"Teste"} name="teste" mask={'cep'} onChange={handleChange}/>   
                        <InputMask placeholder="hola" title={"Orçamento"} name="price" mask={'currency'} onChange={handleChange}/>   

                        <Button onClicks={handle_salvarSolicitacao} name={'Solicitar'} />
                    {/* </form> */}
                </Content>
            </Wrapper>
        </Grid>
    </>
    );
}

export default SolicitacaoMontagem;
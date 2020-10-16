import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";
import { ToastContainer, toast } from 'react-toastify';

import SideBar from '../../components/sidebar';

import PagerHeader from '../../components/PageHeader';

import Input from '../../components/forms/input';
import Select from '../../components/forms/select';
import Button from '../../components/forms/button';
import TextArea from '../../components/forms/textArea';

import api from '../../services/api';

import Loading from '../../components/Loading';

import { Container, Menu, Wrapper, Content, } from './styles';

type InputsProps={
    tipo: string;
    numAt: string;
    nomeAbrev: string;
    contatoLoja: string;
    tipoLoja: string;
    inicioMontagem: string;
    fimMontagem: string;
    horaDescarga: string;
    horaMontagem: string;
    orcamento: string;
    qtdMontadeores: string;
    obs: string;
}

const schema = yup.object().shape({
    tipo: yup.string().required('Escolha o tipo de serviço'),
    numAt: yup.string().required(),
    nomeAbrev: yup.string().required('Informe o nome abreviado da loja'),
    contatoLoja: yup.string().required('Informe o contato da loja'),
    tipoLoja: yup.string().required('Escolha o tipo de loja'),
    inicioMontagem: yup.string().required('Informe a data do inicio da montagem'),
    fimMontagem: yup.string().required('Informe a data de finalização da montagem'),
    horaDescarga: yup.string().required('Informe a hora do inicio da descarga'),
    horaMontagem: yup.string().required('Informe a hora do inicio do serviço'),
    orcamento: yup.string().required('Informe o valor do orçamento'),
    qtdMontadores : yup.string().required('Informe a quantidade de montadores'),
    obs: yup.string(),
  });

const SolicitacaoMontagem: React.FC  = () => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
      });

    const [loading, setLoading] = useState(false);

    const [type, setType] = useState('');
    const [idAt, setIdAt] = useState('');
    const [client, setClient] = useState('');
    const [store, setStore] = useState('');
    const [contact_store, setContact_store] = useState('');
    const [type_work, setTypeWork] = useState('');
    const [start_work, setStartWork] = useState('');
    const [end_work, setEndWork] = useState('');
    const [qtd_fitters, setQtdFitters] = useState('');
    const [budgeted, setBudgeted] = useState('');
    const [time_discharge, setTimeDischarge] = useState('');
    const [time_work, setTimeWork] = useState('');
    const [obs, setObs] = useState('');

      useEffect(() => {

      }, [type])


    async function handle_salvarSolicitacao(event: any){
        // event.preventDefault();
        const token = sessionStorage.getItem('token');
    
        setLoading(true);
    
        const response = await api.post('/requestmounts',
        {
            type : type,
            id_at: idAt,
            client: 1,
            store: store,
            contact_store: contact_store,
            type_work: type_work,
            start_work: start_work,
            end_work: end_work,
            qtd_fitters: qtd_fitters,
            budgeted: budgeted,
            time_discharge: time_discharge,
            time_work: time_work,
            obs: obs
        },{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        // console.log(response)
            if (response.data.original){
                toast.error(response.data.original.message);
            }
            if (response.data.error){
                toast.error(response.data.error);
            }

            if (response.data.id)
                toast.success('Solicitação eviada');
            // console.log(response.data);

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
        <Container>
            <Menu >
                <SideBar />
            </Menu>

            <Wrapper>
            <PagerHeader  header={'Solicitação Montagem'} />
                <Content>
                    <form >
                        <div className="formControl">
                            <Select 
                                title={'Tipo Serviço'} 
                                name={'tipo'} 
                                data={[{id: 1, name: 'Montagem Externa'},{id: 2, name: 'Assistencia Tecnica'}]} 
                                register={register} 
                                errors={errors.tipo} 
                                setData={event => setType(event.target.value)}
                                />
                                
                            <Input 
                                title={'Núm. AT'} 
                                name={'numAt'} 
                                type={'number'} 
                                register={register} 
                                errors={errors.numAt} 
                                setData={event => setIdAt(event.target.value)} 
                                disabled={type === 'Montagem Externa' ? true : false}
                            /> 

                            <Select title={'Tipo Obra'} name={'tipoLoja'} data={[{id: 1, name: 'Abertura'},{id: 2, name: 'Reforma'},{id: 3, name: 'Reforma Parcial'},{id: 4, name: 'Extra'}]} register={register} errors={errors.tipoLoja} setData={event => setTypeWork(event.target.value)} />
                        </div>

                        <Input title={'Nome Abrev'} name="nomeAbrev" type={'text'} register={register} errors={errors.nomeAbrev} setData={event => setStore(event.target.value)}/>
                        <Input title={'Contato Loja'} name="contatoLoja" type={'text'} register={register} errors={errors.contatoLoja} setData={event => setContact_store(event.target.value)}/>
                        
                        <div className="formControl">

                            <Input title={'Inicio Montagem'} name="inicioMontagem" type={'date'} register={register} errors={errors.inicioMontagem} setData={event => setStartWork(event.target.value)}/>
                            <Input title={'Fim Montagem'} name="fimMontagem" type={'date'} register={register} errors={errors.fimMontagem} setData={event => setEndWork(event.target.value)}/>

                        </div>
                        <div className="formControl">
                            <Input title={'Hora Descarregamento'} name="horaDescarga" type={'time'} register={register} errors={errors.horaDescarga} setData={event => setTimeDischarge(event.target.value)}/>
                            <Input title={'Hora Montagem'} name="horaMontagem" type={'time'} register={register} errors={errors.horaMontagem} setData={event => setTimeWork(event.target.value)}/>
                        </div>
                        <div className="formControl">
                            <Input title={'Orçamento'} name="orcamento" type={'number'} register={register} errors={errors.orcamento} setData={event => setBudgeted(event.target.value)}/>
                            <Input title={'Qtd. Montadores'} name="qtdMontadores" type={'number'} register={register} errors={errors.qtdMontadores} setData={event => setQtdFitters(event.target.value)}/>
                        </div>
                        <div className="formControl">
                            <TextArea title={"OBS."} name={"obs"} rows={4} cols={50} register={register} errors={errors.obs} setData={event => setObs(event.target.value)}/>
                        </div>

                        <div className="buttonControl">
                            <Button onClicks={handleSubmit(handle_salvarSolicitacao)} name={'Solicitar'} />
                        </div>
                    </form>
                </Content>
            </Wrapper>
        </Container>
    </>
    );
}

export default SolicitacaoMontagem;
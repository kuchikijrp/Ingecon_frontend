import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

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
import TextArea from '../../../components/forms/textArea';

import api from '../../../services/api';

import Loading from '../../../components/Loading';

import { Menu, NavbarContainer, Wrapper, Content, } from './styles';
import { Grid } from '../../../styles/grid';


type InputsProps={
    tituloProblema: string;
    localProblema: string;
    equipamento: string;
    situacaoEquipamento: string;
    tipoManutencao: string;
    tipoServico: string;
    // descricaoProblema: string;
}

const schema = yup.object().shape({
    tituloProblema: yup.string().required('Defina um título para o serviço'),
    localProblema: yup.string().required('Informa o local onde será o serviço'),
    equipamento: yup.string().required('Informe qual máquina/equipamento'),
    situacaoEquipamento: yup.string().required('Escolha a situação do equipamento'),
    tipoManutencao: yup.string().required('Escolha o tipo de manutenção'),
    tipoServico: yup.string().required('Escolha o tipo de Serviço'),
    // descricaoProblema: yup.string().required('Informe a descrição do problema apresentado')
});

const SolicitacaoMontagem: React.FC  = () => {
    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(false);
    

    const [tituloProblema, setTituloProblema] = useState('');
    const [localProblema, setLocalProblema] = useState('');
    const [equipamento, setEquipamento] = useState('');
    const [situacaoEquipamento, setSituacaoEquipamento] = useState('');
    const [tipoManutencao, setTipoManutencao] = useState('');
    const [tipoServico, setTipoServico] = useState('');
    const [descricaoProblema, setDescricaoProblema] = useState('');
    const [status, setStatus] = useState('');

    const [tecnico, setTecnico] = useState('');
    const [inicioAtendimento, setInicioAtendimento] = useState('');
    const [fimAtendimento, setFimAtendimento] = useState('');
    const [parecerTecnico, setParecerTecnico] = useState('');

    const { id } = useParams<Record<string, string | undefined>>();
    
    async function handle_salvarSolicitacao(event: any){
        // event.preventDefault();
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')  || '');

        setLoading(true);
        try {
            const response = await api.post(`manutencaoInterna/new`,
            {
                tituloProblema,
                localProblema,
                equipamento,
                situacaoEquipamento,
                tipoManutencao,
                tipoServico,
                descricaoProblema

            },{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if (response.data.original){
                toast.error(response.data.original.message);
            }
            if (response.data.error){
                toast.error(response.data.error);
            }

            if (response.data.id)
                toast.success('Solicitação eviada');

        } catch (error) {
            toast.error(error)
        }
        setLoading(false)        
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');

        async function handle_getSolicitacaoManutencao(){
            const response = await api.get(`/manutencaoInterna/${id}`,
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })

            if (response?.data){
                setTituloProblema(response?.data.titulo_problema.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setLocalProblema(response?.data.local_ocorrencia.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setEquipamento(response?.data.equipamento.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setSituacaoEquipamento(response?.data.situacao_equipamento.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setTipoManutencao(response?.data.tipo_manutencao.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setTipoServico(response?.data.tipo_servico.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setDescricaoProblema(response?.data.descricao_problema.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                
                setStatus(response?.data.status?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));

                setTecnico(response?.data?.manutencoesToTecnico?.name?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setInicioAtendimento(!response?.data.inicio_atendimento? '' : new Date(response?.data.inicio_atendimento).toLocaleDateString('en-GB') + ' '+ new Date(response?.data.inicio_atendimento).toLocaleTimeString('en-GB'));
                setFimAtendimento(!response?.data.fim_atendimento? '' : new Date(response?.data.fim_atendimento).toLocaleDateString('en-GB') + ' '+ new Date(response?.data.fim_atendimento).toLocaleTimeString('en-GB'));
                setParecerTecnico(response?.data.parecer_tecnico?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
            }
        }

        handle_getSolicitacaoManutencao()
    }, [])
 
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
            <PagerHeader  header={`Solicitação Manutenção ${id? ' - ' + id : ''}`} />

                {/* <InputMask placeholder="hola" setData={event => setBudgeted(event.target.value)} />    */}
                <Content>
                    <form >
                        <div className="formControl">
                        
                            <Input 
                                title={'Título Problema'} 
                                name="tituloProblema" 
                                type={'text'} 
                                register={register} 
                                value={tituloProblema }
                                errors={errors.tituloProblema} 
                                setData={event => setTituloProblema(event.target.value)}
                                disabled={id ? true : false}
                            />
                            <Input 
                                title={'Local'} 
                                name="localProblema" 
                                type={'text'} 
                                register={register} 
                                value={localProblema}
                                errors={errors.localProblema} 
                                setData={event => setLocalProblema(event.target.value)}
                                disabled={id ? true : false}
                            />    
                            <Input 
                                title={'Equipamento'} 
                                name="equipamento" 
                                type={'text'} 
                                register={register} 
                                value={equipamento}
                                errors={errors.equipamento} 
                                setData={event => setEquipamento(event.target.value)}
                                disabled={id ? true : false}
                            />  
                        </div>
                        <div className="formControl">  
                            <Select 
                                title={'Situação Equipamento'} 
                                name={'situacaoEquipamento'} 
                                data={[{id: 1, name: 'Erro Continuo'},{id: 2, name: 'Parada'},{id: 3, name: 'Operacional'},{id: 4, name: 'Estragada'}]} 
                                register={register} 
                                errors={errors.situacaoEquipamento} 
                                value={situacaoEquipamento}
                                setData={event => setSituacaoEquipamento(event.target.value)}
                                disabled={id ? true : false}
                            />
                            <Select 
                                title={'Tipo Manutenção'} 
                                name={'tipoManutencao'} 
                                data={[{id: 1, name: 'Corretiva'},{id: 2, name: 'Preventiva'},{id: 3, name: 'Preditiva'},{id: 4, name: 'Melhoria'}]} 
                                register={register} 
                                errors={errors.tipoManutencao} 
                                value={tipoManutencao}
                                setData={event => setTipoManutencao(event.target.value)}
                                disabled={id ? true : false}
                            />
                            <Select 
                                title={'Tipo Serviço'} 
                                name={'tipoServico'} 
                                data={[{id: 1, name: 'Mecânica'},{id: 2, name: 'Elétrica / Eletrônica'},{id: 3, name: 'Civil / Predial'}]} 
                                register={register} 
                                errors={errors.tipoServico} 
                                value={tipoServico}
                                setData={event => setTipoServico(event.target.value)}
                                disabled={id ? true : false}
                            />
                        </div>
                        <div className="formControl">
                            <TextArea 
                                title={"Descrição Problema"} 
                                name={'descricaoProblema'} 
                                rows={4} 
                                // cols={50} 
                                register={register} 
                                value={descricaoProblema}
                                // value ={!obssAprovador? obs : obs? obs + '\n' + obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**") : obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**")}
                                // errors={errors.descricaoProblema} 
                                setData={event => setDescricaoProblema(event.target.value)}
                                disabled={id ? true : false}
                            />       
                        </div>
                        {id?
                            <>
                                <div className="separator"></div>
                                <Select 
                                    title={'Status'} 
                                    name={'tipoServico'} 
                                    data={[{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'}, {id: 3, name: `${status}`}]} 
                                    register={register} 
                                    errors={errors.tipoServico} 
                                    value={tipoServico}
                                    setData={event => setTipoServico(event.target.value)}
                                    disabled={id ? true : false}
                                />
                                <div className="formControl">
                                    <Input 
                                        title={'Técnico'} 
                                        name="tecnico" 
                                        type={'text'} 
                                        // register={register} 
                                        value={tecnico}
                                        // errors={errors.equipamento} 
                                        setData={event => setTecnico(event.target.value)}
                                        disabled={id ? true : false}
                                    />  
                                    <Input 
                                        title={'Inicio Atendimento'} 
                                        name="dtInicioAtendimento" 
                                        type={'text'} 
                                        // register={register} 
                                        value={inicioAtendimento}
                                        // errors={errors.equipamento} 
                                        setData={event => setInicioAtendimento(event.target.value)}
                                        disabled={id ? true : false}
                                    />
                                    <Input 
                                        title={'Fim Atendimento'} 
                                        name="dtFimAtendimento" 
                                        type={'text'} 
                                        // register={register} 
                                        value={fimAtendimento}
                                        // errors={errors.equipamento} 
                                        setData={event => setFimAtendimento(event.target.value)}
                                        disabled={id ? true : false}
                                    />  
                                </div>
                                <div className="formControl">
                                    <TextArea 
                                        title={"Descrição da Solução e Atividades Realizadas"} 
                                        name={'parecerTecnico'} 
                                        rows={4} 
                                        // cols={50} 
                                        register={register} 
                                        value={parecerTecnico}
                                        // value ={!obssAprovador? obs : obs? obs + '\n' + obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**") : obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**")}
                                        // errors={errors.descricaoProblema} 
                                        setData={event => setParecerTecnico(event.target.value)}
                                        disabled={id ? true : false}
                                    />       
                                </div>
                            </>
                        :
                            ''    
                        }

                        {!id? 
                            <div className="formControl">
                                <br></br>
                                <Button onClicks={handleSubmit(handle_salvarSolicitacao)} name={'Solicitar'} />
                            </div>
                        :
                            ''    
                        }
                                   
                    </form>
                </Content>
            </Wrapper>
        </Grid>
    </>
    );
}

export default SolicitacaoMontagem;
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
import { Console } from 'console';
import { textChangeRangeIsUnchanged } from 'typescript';

interface rules{
    id: number;
    name: string;
}

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
    const [userLogged, setUserLogged] = useState('');
    

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

    const [funcionarios, setFuncionarios]= useState([]);

    const [rule, setRule] = useState('');

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

    async function handle_EditarSolicitacao(event: any){
        event.preventDefault();

        const token = sessionStorage.getItem('token');
        try {
            console.log(status, tecnico, parecerTecnico)
            const response = await api.put(`/manutencaoInterna/${id}`,
            {
                status: status.toLowerCase(),
                tecnico,
                parecerTecnico,
                dtIni: inicioAtendimento,
                dtFim: fimAtendimento

            },{
                headers: {
                    authorization: `Bearer ${token}`
                }
            })

            if(response.data.msg){
                toast.success(`${response.data.msg}`);
            }else if(response.data.Erro){
                toast.error(`${response.data.Erro}`);
            }

        } catch (error) {
            console.log(error);
            toast.error(error);            
        }
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        const userLoged = JSON.parse(localStorage.getItem('user') || '');
        setUserLogged(userLoged.name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));

        const rules: string | any = localStorage.getItem('rules');

        setRule(JSON.parse(rules)
            .filter(rule => rule.name === 'manutencaoInterna_ADM')
            .map(rule => {return rule.name }))

        async function handle_getSolicitacaoManutencao(){
            const response = await api.get(`/manutencaoInterna/${id}`,
            {
                headers:{
                    authorization: `Bearer ${token}`
                }
            })
            console.log(response?.data)
            if (response?.data){
                setTituloProblema(response?.data.titulo_problema.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setLocalProblema(response?.data.local_ocorrencia.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setEquipamento(response?.data.equipamento.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setSituacaoEquipamento(response?.data.situacao_equipamento.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setTipoManutencao(response?.data.tipo_manutencao.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setTipoServico(response?.data.tipo_servico.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setDescricaoProblema(response?.data.descricao_problema.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                
                setStatus(response?.data.status?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));

                setTecnico(response?.data.tipo_atendimento === 'Terceiro' ? 'Terceiro' : response?.data?.manutencoesToTecnico?.name?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
                setInicioAtendimento(!response?.data.inicio_atendimento? '' : new Date(response?.data.inicio_atendimento).toLocaleDateString('en-GB') + ' '+ new Date(response?.data.inicio_atendimento).toLocaleTimeString('en-GB'));
                setFimAtendimento(!response?.data.fim_atendimento? '' : new Date(response?.data.fim_atendimento).toLocaleDateString('en-GB') + ' '+ new Date(response?.data.fim_atendimento).toLocaleTimeString('en-GB'));
                setParecerTecnico(response?.data.parecer_tecnico?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();}));
            }
        }

        async function handle_getFuncionariosManutencao(){
            try {
                setLoading(true)
                const responseManutencao = await api.get(`/funcionariosPorLotacao/manutencao`,
                {
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })

                if (responseManutencao.data.error){
                    toast.error(responseManutencao.data.error)
                }else{
                    setFuncionarios(responseManutencao.data.rhFuncionarios.map(funcionario => {
                        return {'id':funcionario.id, 'name': funcionario.nm_nome.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();})}
                    }))
                    // setFuncionarios(responseManutencao.data.terceiro.map(funcionario => {
                    //     return {funcionarios, ...{'id':funcionario.id, 'name': funcionario.name.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {return a.toUpperCase();})}}
                    // }))


                }

                setLoading(false)
            } catch (error) {
                setLoading(false);
                toast.error(error);      
            }
        }

        handle_getSolicitacaoManutencao();
        handle_getFuncionariosManutencao();

        console.log(rule)
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
                                {console.log(rule.length)}
                                <Select 
                                    title={'Status'} 
                                    name={'tipoServico'} 
                                    // data={userLogged === tecnico ? [{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'}, {id: 3, name: `${status}`}] : rule.length !== 0 ? [{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'},{id: 3, name: 'Reprovado'}, {id: 4, name: `${status}`}] : [{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'}, {id: 3, name: `${status}`}]} 
                                    data={rule.length !== 0 || (rule.length !== 0 && tecnico === 'Terceiro') ? [{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'},{id: 3, name: 'Reprovado'}, {id: 4, name: `${status}`}] : [{id: 1, name: 'Iniciado'},{id: 2, name: 'Finalizado'}, {id: 3, name: `${status}`}]}
                                    register={register} 
                                    errors={errors.status} 
                                    value={status}
                                    setData={event => setStatus(event.target.value)}
                                    // disabled={userLogged !== tecnico && (rule.length !== 0 && tecnico === 'Terceiro') ? true : false}
                                    disabled={userLogged === tecnico || (rule.length !== 0 && tecnico === 'Terceiro') ? false : true}
                                />
                                <div className="formControl">
                                    <Select 
                                        title={'Técnico'} 
                                        name={'tecnico'} 
                                        data={funcionarios} 
                                        register={register} 
                                        value={tecnico}
                                        setData={event => setTecnico(event.target.value)}
                                        disabled={rule.length !== 0 ? false : true}
                                    />
                                    <Input 
                                        title={'Tipo Atendimento'} 
                                        name="dtInicioAtendimento" 
                                        type={'text'} 
                                        // register={register} 
                                        value={tecnico? tecnico?.toLowerCase() === 'terceiro'? 'Terceiro' :'Interno' : ''}
                                        // errors={errors.equipamento} 
                                        // setData={event => setInicioAtendimento(event.target.value)}
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
                                        disabled={userLogged === tecnico || (rule.length !== 0 && tecnico === 'Terceiro') ? false : true}
                                    />       
                                </div>
                            </>
                        :
                            ''    
                        }

                            <div className="formControl">
                                <br></br>
                                 {!id? 
                                    <Button onClicks={handleSubmit(handle_salvarSolicitacao)} name={'Solicitar'} />
                                :userLogged === tecnico || (rule.length !== 0 && tecnico === 'Terceiro') ? 
                                    <Button onClicks={handle_EditarSolicitacao} name={'Salvar'} />
                                : rule.length !== 0 ? 
                                    <Button onClicks={handle_EditarSolicitacao} name={'Direcionar'} />
                                :
                                    ''    
                                }
                            </div>
                                   
                    </form>
                </Content>
            </Wrapper>
        </Grid>
    </>
    );
}

export default SolicitacaoMontagem;
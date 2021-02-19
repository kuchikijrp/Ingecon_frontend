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
    formPagto: string;
    qtdMontadeores: string;
    obs: string;
    aprovacao: string;
}

const schema = yup.object().shape({
    tipo: yup.string().required('Escolha o tipo de serviço'),
    numAt: yup.string().when("tipo", {is: 'Assistência Técnica', then: yup.string().required()}),
    // numAt: yup.string(),
    nomeAbrev: yup.string().required('Informe o nome abreviado da loja'),
    contatoLoja: yup.string().required('Informe o contato da loja'),
    tipoLoja: yup.string().required('Escolha o tipo de loja'),
    inicioMontagem: yup.string().required('Informe a data do inicio da montagem'),
    fimMontagem: yup.string().required('Informe a data de finalização da montagem'),
    horaDescarga: yup.string().required('Informe a hora do inicio da descarga'),
    horaMontagem: yup.string().required('Informe a hora do inicio do serviço'),
    orcamento: yup.string().required('Informe o valor do orçamento'),
    formPagto: yup.string().required('Informe a forma de pagamento'),
    qtdMontadores : yup.string().required('Informe a quantidade de montadores'),
    obs: yup.string(),
});

// const schemaAprovacao = yup.object().shape({
//     aprovacao: yup.string().required('Escolha uma opção')
//   })

const SolicitacaoMontagem: React.FC  = () => {
    const [idMounts, setIdMounts]= useState('');
    const [userRule, setUserRule] = useState(false);
    
    const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
    });

    const [loading, setLoading] = useState(false);

    const [type, setType] = useState('');
    const [idAt, setIdAt] = useState('');
    // const [client, setClient] = useState('');
    const [store, setStore] = useState('');
    const [address, setAddress] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [uf, setUf] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCEP] = useState('');
    const [contact_store, setContact_store] = useState('');
    const [contact_phone, setContact_Phone] = useState('');
    const [type_work, setTypeWork] = useState('');
    const [start_work, setStartWork] = useState('');
    const [end_work, setEndWork] = useState('');
    const [qtd_fitters, setQtdFitters] = useState('');
    const [budgeted, setBudgeted] = useState('');
    const [formPagto, setFormPagto] = useState('');
    const [time_discharge, setTimeDischarge] = useState('');
    const [time_work, setTimeWork] = useState('');
    const [obs, setObs] = useState('');
    const [emailDonoMont, setEmailDonoMont] = useState('');

    const [branches, setBranches] = useState([]);
    const [formPagtData, setFormPagtoData] = useState([]);

    const [aprovacao, setAprovacao] = useState('');
    const [obsAprovador, setObsAprovador] = useState('');
    const [obssAprovador, setObssAprovador] = useState('');

    const [alimentacao, setAlimentacao] = useState('');
    const [material, setMaterial] = useState('');
    const [deslocamento, setDeslocamento] = useState('');
    const [combustivel, setCombustivel] = useState('');
    const [passagem, setPassagem] = useState('');
    const [hospedagem, setHospedagem] = useState('');
    const [terceiros, setTerceiros] = useState('');
    const [outros, setOutros] = useState('');
    const [despesas, setDespesas] = useState('');
    const [diarias, setDiarias] = useState('');
    const [impostos, setImpostos] = useState('');
    const [txADMEquipe, setTxADMEquipe] = useState('');

    const { idMount="" } = useParams();
    
    useEffect(() => {
        setIdMounts(idMount);
        
        async function getMount(){
        const token = sessionStorage.getItem('token');

        const rules = JSON.parse(localStorage.getItem('rules') || '');
        rules.map(rule => {
            if(rule.name === 'montagemExterna_ADM' || rule.name === 'ROLE_SUPER'){
                return setUserRule(rule.name);
            }

            return setUserRule(false);
        })
        // console.log(userRule)
        setLoading(true);

        try {
            const mount = await api.get(`/requestmounts/${idMount}`,
                {
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })
                // console.log(mount)

            if (mount.data.error){
                toast.error(mount.data.error)
            }else{
                setType(mount.data?.type || null);
                setIdAt(mount.data?.id_at || null);
                setTypeWork(mount.data?.type_work || null);
                setStore(mount.data?.store || null);
                setContact_store(mount.data?.contact_store || null);
                setContact_Phone(mount.data?.contact_phone || null);
                setStartWork(new Date(mount.data?.start_work || null).toISOString().split('T')[0]);
                setEndWork(new Date(mount.data?.end_work || null).toISOString().split('T')[0]);
                setTimeDischarge(mount.data?.time_discharge || null);
                setTimeWork(mount.data?.time_work || null);
                setBudgeted(mount.data?.budgeted || null);
                setFormPagto(mount.data?.form_pagto || null);
                setQtdFitters(mount.data?.qtd_fitters || null);
                setObs(mount.data?.obs || null);
                setEmailDonoMont(mount.data.mountsToUser?.email || null);

                setAlimentacao(mount.data?.vl_alimentacao || '')
                setMaterial(mount.data?.vl_material || '')
                setDeslocamento(mount.data?.vl_deslocamento || '')
                setCombustivel(mount.data?.vl_combustivel || '')
                setPassagem(mount.data?.vl_passagem || '')
                setHospedagem(mount.data?.vl_hospedagem || '')
                setTerceiros(mount.data?.vl_terceiros|| '')
                setOutros(mount.data?.vl_outros|| '')
                setDiarias(mount.data?.vl_diarias|| '')
                setImpostos(mount.data?.vl_impostos|| '')
                // console.log(new Date(mount.data?.start_work).toISOString().split('T')[0])
                // setImpostos(mount.data?.budgeted === 0 ? '0' : (parseFloat(mount.data?.budgeted || '') * 0.11).toString())
                // setImpostos(mount.data?.budgeted === 'null' ? '0' : (parseFloat(mount.data?.budgeted || '') * 0.11).toString())

                if(mount.data?.status !== "Em Analise")
                    setAprovacao(mount.data?.status || null);

                
                const approvals = await api.get(`/approvalmounts/${idMount}`,
                {
                    headers:{
                        authorization: `Bearer ${token}`
                    }
                })

                if (approvals.data.error){
                    toast.error(approvals.data.error)
                }else{
                    setObssAprovador(approvals.data.map(approval =>{
                        return (`**${new Date(approval.createdAt).toLocaleDateString('en-GB') } - ${new Date(approval.createdAt).toLocaleTimeString('en-GB') } : ${approval.user_name} - ${approval.status}${approval.obs? ' : ' + approval.obs : ''}**`)
                    }))

                }
                
            }
            
            
            
            // getFiliais()
            // getFormaPagto()
            // console.log(obssAprovador)

            // console.log(mount)
        } catch (err) {
            setLoading(false);
            toast.error(err);
        }

        setLoading(false);
        }

        async function getFiliais(){
            const token = sessionStorage.getItem('token');
            setLoading(true);
                try {
                    const response = await api.get('/clienteFilial',
                    {
                        headers:{
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (response.data.error){
                        toast.error(response.data.error)
                    }else{
                        setBranches(response.data.map(filiais => {

                            return {'id':filiais.id_filial, 'name': filiais.nm_desc_filial}
                        }))
        
                    }
                    // console.log(response)
                } catch (error) {
                    setLoading(false);
                    toast.error(error);  
                }
            setLoading(false)

        }
        async function getFormaPagto(){
            const token = sessionStorage.getItem('token');
            setLoading(true);
                try {
                    const response = await api.get('/formasPagamento',
                    {
                        headers:{
                            authorization: `Bearer ${token}`
                        }
                    })

                    if (response.data.error){
                        toast.error(response.data.error)
                    }else{
                        setFormPagtoData(response.data.map(pagto => {

                            return {'id':pagto.id, 'name': pagto.nm_desc_condicao_pagto}
                        }))
        
                    }
                    // console.log(response)
                } catch (error) {
                    setLoading(false);
                    toast.error(error);  
                }
            setLoading(false)

        }
        
        getFiliais()
        getFormaPagto()
        
        if (idMount !== "")
        getMount()
        
        // if (idMount === "")        

      }, [])

      useEffect(() =>{
        async function getStore(){
            const token = sessionStorage.getItem('token');

            try {

                const response = await api.get(`/clienteFilial/${store}`,
                {
                headers: {
                    authorization: `Bearer ${token}`
                }})
                // console.log(response)
                if (response.data.error){
                    toast.error(response.data.error)
                }else{
                    setAddress(response.data?.nm_endereco || null);
                    setNeighborhood(response.data?.nm_bairro || null);
                    setUf(response.data?.nm_uf || null);
                    setCidade(response.data?.nm_cidade || null);
                    setCEP(response.data?.nr_cep || null)
                }

                
            } catch (error) {
                    
            }
        }

        getStore()
      }, [store])

    useEffect(() => {
        const vAlimentacao = alimentacao !== ''? parseFloat(alimentacao) : parseFloat(alimentacao?.replace(',', '.')) || 0;
        const vMaterial = material !== '' ? parseFloat(material) : parseFloat(material.replace(',', '.')) || 0;
        const vDeslocamento = deslocamento !== ''? parseFloat(deslocamento) : parseFloat(deslocamento.replace(',', '.')) || 0;
        const vCombustivel = combustivel !== ''? parseFloat(combustivel) : parseFloat(combustivel.replace(',', '.')) || 0;
        const vPassagem = passagem !== ''? parseFloat(passagem) : parseFloat(passagem.replace(',', '.')) || 0;
        const vHospedagem = hospedagem !== ''? parseFloat(hospedagem) : parseFloat(hospedagem.replace(',', '.')) || 0;
        const vTerceiros = terceiros !== ''? parseFloat(terceiros) : parseFloat(terceiros.replace(',', '.')) || 0;
        const vOutros = outros !== ''? parseFloat(outros) : parseFloat(outros.replace(',', '.')) || 0;
        const vDiarias = diarias !== ''? parseFloat(diarias) : parseFloat(diarias.replace(',', '.')) || 0;
        // const vImpostos = impostos !== ''? parseFloat(impostos) : parseFloat(impostos.replace(',', '.')) || 0;
        
        const desp = vAlimentacao + vMaterial + vDeslocamento + vCombustivel + vPassagem + vHospedagem + vTerceiros + vOutros + vDiarias;

        const txAdmEquipe = (desp * 0.1) + (desp + (desp * 0.1)) * 0.4

        const vImposto = (desp + txAdmEquipe) * 0.11
        
        // console.log(vAlimentacao)
        setTxADMEquipe(txAdmEquipe.toFixed(2).toString())
        setImpostos(vImposto.toFixed(2).toString())

        setDespesas((desp + txAdmEquipe + vImposto).toFixed(2).toString())
    }, [alimentacao, material, deslocamento, combustivel, passagem, hospedagem, terceiros, outros, diarias, impostos])

    async function handle_salvarSolicitacao(event: any){
        // event.preventDefault();
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')  || '');

        const emailUser = user.email;

        // console.log(emailUser.email)

        setLoading(true);
    
        const response = await api.post('/requestmounts',
        {
            type : type,
            id_at: idAt,
            client: '',
            store: store,
            contact_store: contact_store,
            contact_phone: contact_phone,
            type_work: type_work,
            start_work: start_work,
            end_work: end_work,
            qtd_fitters: qtd_fitters,
            budgeted: budgeted,
            form_pagto: formPagto,
            time_discharge: time_discharge,
            time_work: time_work,
            obs: obs,
            emailUser
        },{
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        console.log(response)
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

    async function handle_editSolicitacao(event : any){
        event.preventDefault();
        const token = sessionStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user')  || '');

        const emailUser = user.email;


            if (!aprovacao){
                return toast.error('Escolha uma opção de aprovação')
            }

            setLoading(true);
            try {
                const response = await api.put(`/requestmounts/${idMounts}`,
                {
                    idMount : idMounts,
                    status : aprovacao,
                    obs : obsAprovador,
                    obsTotal: !obssAprovador? obs : obs? obs + '\n' + obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**") : obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**"),
                    emailUser,
                    emailDonoMont,
                    alimentacao,
                    material,
                    deslocamento,
                    combustivel,
                    passagem,
                    hospedagem,
                    terceiros,
                    outros,
                    despesas,
                    diarias,
                    impostos

                },{
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })

                if(response.data.mount = 1)
                    toast.success(`${aprovacao}`);

            } catch (error) {
                toast.error(error)
            }
            setLoading(false)
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
            <PagerHeader  header={`Solicitação Montagem ${idMount? ' - ' + idMount : ''}`} />

                {/* <InputMask placeholder="hola" setData={event => setBudgeted(event.target.value)} />    */}

                <Content>
                    <form >
                        <div className="formControl">
                            <Select 
                                title={'Tipo Serviço'} 
                                name={'tipo'} 
                                data={[{id: 1, name: 'Montagem Externa'},{id: 2, name: 'Assistência Técnica'}]} 
                                register={register} 
                                errors={errors.tipo} 
                                value={type}
                                setData={event => setType(event.target.value)}
                                disabled={idMounts ? true : false}
                                />
                            <Input 
                                title={'Núm. AT'} 
                                name={'numAt'} 
                                type={'number'} 
                                register={register} 
                                errors={type === 'Montagem Externa' ? errors.tipo : errors.numAt} 
                                value={idAt}
                                setData={event => setIdAt(event.target.value)} 
                                disabled={type === 'Montagem Externa' || idMounts ? true : false}
                            /> 

                            <Select 
                                title={'Tipo Obra'} 
                                name={'tipoLoja'} 
                                data={[{id: 1, name: 'Abertura'},{id: 2, name: 'Reforma'},{id: 3, name: 'Reforma Parcial'},{id: 4, name: 'Extra'}]} 
                                register={register} 
                                errors={errors.tipoLoja} 
                                value={type_work}
                                setData={event => setTypeWork(event.target.value)} 
                                disabled={idMounts ? true : false}
                            />
                        </div>

                        <div className="formControl"> 
                            <Select 
                                title={'Nome Abrev'}
                                name={'nomeAbrev'}
                                data = {branches}
                                register={register}
                                errors={errors.nomeAbrev}
                                value={store}
                                setData={event => setStore(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            <Input 
                                title={'Endereço'} 
                                name="endereco" 
                                type={'text'} 
                                register={register}
                                errors={errors.endereco}
                                value={address}
                                disabled={true}
                            />    
                        </div>

                        <div className="formControl">   
                            <Input 
                                title={'Bairro'}
                                name={'bairro'}
                                type={'text'}
                                register={register}
                                errors={errors.bairro}                                
                                value={neighborhood}   
                                disabled={true}
                            />
                            <Input 
                                title={'Cidade'}
                                name={'cidade'}
                                type={'text'}
                                value={cidade}   
                                register={register}
                                errors={errors.uf}
                                disabled={true}
                            />
                            <Input 
                                title={'CEP'}
                                name={'cidade'}
                                type={'text'}
                                value={cep}   
                                register={register}
                                errors={errors.uf}
                                disabled={true}
                            />
                            <Input 
                                title={'UF'}
                                name={'uf'}
                                type={'text'}
                                value={uf}   
                                register={register}
                                errors={errors.uf}
                                disabled={true}
                            />
                        </div>

                        <div className="formControl">
                            <Input 
                                title={'Contato Loja'} 
                                name="contatoLoja" 
                                type={'text'} 
                                register={register} 
                                value={contact_store}
                                errors={errors.contatoLoja} 
                                setData={event => setContact_store(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            <Input 
                                title={'Telefone Contato'} 
                                name="telfoneContato" 
                                type={'text'} 
                                register={register} 
                                // value={mask(contact_phone, ['(99) 9999-9999', '(99) 9 9999-9999'])}
                                value={contact_phone}
                                errors={errors.contactTelefone} 
                                setData={event => setContact_Phone(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                        </div>
                        
                        <div className="formControl">

                            <Input 
                                title={'Inicio Montagem'} 
                                name="inicioMontagem" 
                                type={'date'} 
                                register={register} 
                                value={start_work}
                                errors={errors.inicioMontagem} 
                                setData={event => setStartWork(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            <Input 
                                title={'Fim Montagem'} 
                                name="fimMontagem" 
                                type={'date'} 
                                register={register} 
                                value={end_work}
                                errors={errors.fimMontagem} 
                                setData={event => setEndWork(event.target.value)}
                                disabled={idMounts ? true : false}
                            />

                        </div>
                        <div className="formControl">
                            <Input 
                                title={'Hora Descarregamento'} 
                                name="horaDescarga" 
                                type={'time'} 
                                register={register} 
                                value={time_discharge}
                                errors={errors.horaDescarga} 
                                setData={event => setTimeDischarge(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            <Input 
                                title={'Hora Montagem'} 
                                name="horaMontagem" 
                                type={'time'} 
                                register={register} 
                                value={time_work}
                                errors={errors.horaMontagem} 
                                setData={event => setTimeWork(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                        </div>
                        <div className="formControl">
                            <Input 
                                title={'Orçamento'} 
                                name="orcamento" 
                                type={'number'} 
                                register={register} 
                                // value={mask(budgeted, ['99','9,99','99,99','999,99','9.999,99','99.999,99','999.999,99'])}
                                value={budgeted}
                                errors={errors.orcamento} 
                                setData={event => setBudgeted(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            <Select 
                                title={'Forma Pagamento'}
                                name={'formPagto'}
                                data = {formPagtData}
                                register={register}
                                errors={errors.formPagto}
                                value={formPagto}
                                setData={event => setFormPagto(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                            {/* <InputMask 
                                title={'Orçamento'} 
                                name="orcamento" 
                                type={'text'} 
                                register={register} 
                                value={budgeted}
                                errors={errors.orcamento} 
                                setData={event => setBudgeted(mask(event.target.value, ['999.999.999']))}
                                disabled={idMounts ? true : false}
                            /> */}
                            <Input 
                                title={'Qtd. Montadores'} 
                                name="qtdMontadores" 
                                type={'number'} 
                                register={register} 
                                value={qtd_fitters}
                                errors={errors.qtdMontadores} 
                                setData={event => setQtdFitters(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                        </div>
                        <div className="formControl">
                            <TextArea 
                                title={"OBS."} 
                                name={"obs"} 
                                rows={6} 
                                // cols={50} 
                                register={register} 
                                // value={obssAprovador}
                                value ={!obssAprovador? obs : obs? obs + '\n' + obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**") : obssAprovador.toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**").toString().replace(",**", "\n**")}
                                errors={errors.obs} 
                                setData={event => setObs(event.target.value)}
                                disabled={idMounts ? true : false}
                            />
                        </div>
                            <div className="separator"></div>
                                {idMounts?
                                    // userRule?
                                    <>
                                    <div className="formControl">
                                            <Select 
                                                name={'aprovacao'} 
                                                title={'Status'}
                                                data={[{id: 1, name: 'Pendente'},{id: 2, name: 'Aprovado'},{id: 3, name: 'Reprovado'},{id: 4, name: 'Serviço Iniciado'},{id: 5, name: 'Serviço Finalizado'}]} 
                                                register={register} 
                                                errors={errors.aprovacao} 
                                                value={aprovacao}
                                                setData={event => setAprovacao(event.target.value)} 
                                                disabled={!userRule ? true : false}
                                                />
                                    </div>
                                        {!userRule ? '' :
                                    <>
                                    <div className="separator"></div>
                                    <div className="formControl">
                                        <Input 
                                            title={"Diarias"}
                                            name={'vlDiarias'}
                                            type={'number'}
                                            value={diarias}
                                            setData={event => setDiarias(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                        />   
                                        <Input 
                                            title={"Hospedagem"}
                                            name={'vlHospedagem'}
                                            type={'number'}
                                            value={hospedagem}
                                            setData={event => setHospedagem(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />
                                        <Input 
                                            title={"Deslocamento"}
                                            name={'vlDeslocamento'}
                                            type={'number'}
                                            value={deslocamento}
                                            setData={event => setDeslocamento(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />

                                        <Input 
                                            title={"Alimentação"}
                                            name={'vlAlimentacao'}
                                            type={'number'}
                                            value={alimentacao}
                                            setData={event => setAlimentacao(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />
                                        <Input 
                                            title={"Terceiros"}
                                            name={'vlTerceiros'}
                                            type={'number'}
                                            value={terceiros}
                                            setData={event => setTerceiros(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />  
                                        <Input 
                                            title={"Passagem"}
                                            name={'vlPassagem'}
                                            type={'number'}
                                            value={passagem}
                                            setData={event => setPassagem(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />                                          

                                    </div>
                                    <div className="formControl">                                     
                                        <Input 
                                            title={"Material"}
                                            name={'vlMaterial'}
                                            type={'number'}
                                            value={material}
                                            setData={event => setMaterial(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />
                                        <Input 
                                            title={"Combustivel"}
                                            name={'vlCombustivel'}
                                            value={combustivel}
                                            setData={event => setCombustivel(event.target.value)} 
                                            type={'number'}
                                            disabled={!userRule ? true : false}
                                            />
                                        <Input 
                                            title={"Outros"}
                                            name={'vlOutros'}
                                            type={'number'}
                                            value={outros}
                                            setData={event => setOutros(event.target.value)} 
                                            disabled={!userRule ? true : false}
                                            />

                                        <Input 
                                            title={"Taxa ADM/Equipe"}
                                            name={'vlImpostos'}
                                            type={'number'}
                                            value={txADMEquipe}
                                            setData={event => setImpostos(event.target.value)} 
                                            disabled={true}
                                            />
                                        <Input 
                                            title={"Impostos"}
                                            name={'vlImpostos'}
                                            type={'number'}
                                            value={impostos}
                                            setData={event => setImpostos(event.target.value)} 
                                            disabled={true}
                                            />
                                        <Input 
                                            title={"Total Despesas"}
                                            name={'tDespesas'}
                                            type={'number'}
                                            value={despesas}
                                            // setData={event => setAprovacao(event.target.value)} 
                                            disabled={true}
                                            />
                                    </div>
                                        </>}
                                    <div className="formControl">
                                        <TextArea 
                                        title={"OBS."} 
                                        name={"obsAprovador"} 
                                        rows={2} 
                                        cols={50} 
                                        register={register} 
                                        value={obsAprovador}
                                        errors={errors.obs} 
                                        setData={event => setObsAprovador(event.target.value)}
                                        /> 
                                    </div>
                                     <Button onClicks={handle_editSolicitacao} name={'Salvar'} /> 
                                    </>
                                    // :
                                    // ''
                                : 
                                    <Button onClicks={handleSubmit(handle_salvarSolicitacao)} name={'Solicitar'} />
                                }


                    </form>
                </Content>
            </Wrapper>
        </Grid>
    </>
    );
}

export default SolicitacaoMontagem;
import React, {useState, useEffect} from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../../services/api';

import Navbar from '../../../components/navbar';
import SideBar from '../../../components/sidebar2';
import Loading from '../../../components/Loading';
import PagerHeader from '../../../components/PageHeader';

import Button from '../../../components/forms/button';

import ReactTable from 'react-table-v6';
import 'react-table-v6/react-table.css';

import { NavbarContainer, Menu, Wrapper, Content } from './styles';
import { Grid } from '../../../styles/grid';

const SolicitacoesManutencao: React.FC<RouteComponentProps> = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [manutencoes, setManutencoes] = useState([]);

    useEffect(()=> {
        async function handleGetManutencoes(){
        setLoading(true);
            const token = sessionStorage.getItem('token');

            const response = await api.get('/manutencaoInterna',
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            if (response.data.error){
                toast.error(response.data.error);
                history.push('/');
            }

            if (response.data.original){
                toast.error(response.data.original.message);
            }

            if(response?.data?.Erro){
                setManutencoes([]);
            }else{
                setManutencoes(response?.data);
            }
        setLoading(false);
        }

        handleGetManutencoes();
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
                <PagerHeader  header={'Minhas Manutenções'} />
                <Button name={<NavLink  to='/manutencaoInterna/new' style={{color: '#fff', textDecoration: 'none'}}>Nova Solicitação</NavLink >} />

                    <Content>
                        {/* <Table data={solicitacoes} /> */}
                        {/* {console.log(solicitacoes)} */}
                        <ReactTable
                        data={manutencoes}
                        // TheadComponent={_ => null}
                        noDataText="Sem Solicitações"
                        defaultSorted={[
                            {
                              id: "NÚM. SOLIC.",
                              desc: true
                            }
                          ]}
                        columns={[
                            {
                            // Header: "Name",
                            Header: 'SOLICITANTE',
                                columns: [
                                    {
                                        Header: "ID",
                                        accessor: "id",
                                        maxWidth: 50,
                                        Cell: row => (
                                            <NavLink to={`/manutencaoInterna/${row.value}`}>{row.value}</NavLink>
                                        )
                                    },
                                    {
                                        Header: "LOCAL",
                                        accessor: "local_ocorrencia",
                                        Cell: row => (
                                            row.value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                return a.toUpperCase();
                                            })
                                        )
                                    },
                                    {
                                        Header: "TIPO",
                                        accessor: "tipo_manutencao",
                                        Cell: row => (
                                            row.value?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                return a.toUpperCase();
                                            })
                                        )
                                    },
                                    {
                                        Header: "PROBLEMA",
                                        accessor: "titulo_problema",
                                        Cell: row => (
                                            row.value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                return a.toUpperCase();
                                            })
                                        )
                                    },
                                    {
                                        Header: "SOLICITANTE",
                                        accessor: "manutencoesToUser.usuario",
                                        Cell: row => (
                                            row.value.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                return a.toUpperCase();
                                            })
                                        )
                                    },
                                    {
                                        Header: "DATA SOLICITAÇÃO",
                                        accessor: "createdAt",
                                        Cell: row => (
                                            <span>{
                                                new Date(row.value).toLocaleDateString('en-GB') + ' '+ new Date(row.value).toLocaleTimeString('en-GB') 
                                            }</span>
                                        )
                                    },

                                ]
                            },
                            {
                                // Header: "Name",
                                Header: 'ATENDIMENTO',
                                columns: [
                                    {
                                        Header: "RESPONSÁVEL",
                                        accessor: "manutencoesToTecnico.usuario",
                                        Cell: row => (
                                            row.value ?
                                                row.value?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                    return a.toUpperCase();
                                                })
                                            :
                                                'Não Atribuido'
                                        )
                                    },
                                    {
                                        Header: "TIPO ATENDIMENTO",
                                        accessor: "tipo_atendimento"
                                    },
                                    {
                                        Header: "INÍCIO",
                                        accessor: "inicio_atendimento",
                                        Cell: row => (
                                            <span>{
                                                row.value ?
                                                    new Date(row.value).toLocaleDateString('en-GB') + ' '+ new Date(row.value).toLocaleTimeString('en-GB') 
                                                :
                                                    ''
                                            }</span>
                                        )
                                    },
                                    {
                                        Header: "FIM",
                                        accessor: "fim_atendimento",
                                        Cell: row => (
                                            <span>{
                                                row.value ?
                                                    new Date(row.value).toLocaleDateString('en-GB') + ' '+ new Date(row.value).toLocaleTimeString('en-GB') 
                                                :
                                                    ''
                                            }</span>
                                        )
                                    },
                                    {
                                        Header: "STATUS",
                                        accessor: "status",
                                    Cell: row => (
                                        <div style={{width: '200px', display:'flex', flexDirection:'row', padding: '0 5%', alignItems: 'center', fontSize: '18px',}}>
                                        <span style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '5px',   
                                            marginRight: '5%',
                                            background: 
                                                row.value === 'Pendente'  ? '#99582A' : 
                                                row.value === 'reprovado'   ? '#D63230' : 
                                                row.value === 'direcionado'    ? '#40BCD8' :
                                                row.value === 'iniciado' ? '#F28C37' :
                                                row.value === 'finalizado' ? '#29bf12' :
                                                '#999',
                                            boxShadow:  `0 0 5px ${
                                                row.value === 'Pendente'  ? '#99582A' : 
                                                row.value === 'reprovado'   ? '#D63230' : 
                                                row.value === 'direcionado'    ? '#40BCD8' :
                                                row.value === 'iniciado' ? '#F28C37' :
                                                row.value === 'finalizado' ? '#29bf12' :
                                                '#999'}, 0 0 10px 
                                                ${
                                                row.value === 'Pendente'  ? '#99582A' :
                                                row.value === 'reprovado'   ? '#D63230' : 
                                                row.value === 'direcionado'    ? '#40BCD8' :
                                                row.value === 'iniciado' ? '#F28C37' :
                                                row.value === 'finalizado' ? '#29bf12' :
                                                '#999'}, 0 0 20px  
                                                ${
                                                row.value === 'Pendente'  ? '#99582A' :
                                                row.value === 'reprovado'   ? '#D63230' : 
                                                row.value === 'direcionado'    ? '#40BCD8' :
                                                row.value === 'iniciado' ? '#F28C37' :
                                                row.value === 'finalizado' ? '#29bf12' :
                                                '#999'}, 0 0 40px ${
                                                row.value === 'Pendente'  ? '#99582A' :
                                                row.value === 'reprovado'   ? '#D63230' : 
                                                row.value === 'direcionado'    ? '#40BCD8' :
                                                row.value === 'iniciado' ? '#F28C37' :
                                                row.value === 'finalizado' ? '#29bf12' :
                                                '#999'}`,
                                            transition: 'all .3s ease'
                                        }}></span>
                                            <span>{
                                               row.value ?
                                                    row.value?.toLowerCase().replace(/(?:^|\s)\S/g, function(a) {
                                                        return a.toUpperCase();
                                                    })
                                                :
                                                    'Aguardando'
                                            }</span>
                                          </div>
                                    )
                                    },
                                ]
                            }
                        ]}
                        defaultPageSize={25}
                        // style={{
                        //     height: "73vh", // This will force the table body to overflow and scroll, since there is not enough room
                        // }}
                        className="-striped -highlight"
                        />
                    </Content>
                </Wrapper>
            </Grid>
        </>
    )
}

export default SolicitacoesManutencao;
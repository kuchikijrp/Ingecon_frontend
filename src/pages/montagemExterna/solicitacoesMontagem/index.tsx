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

const SolicitacoesMontagem: React.FC<RouteComponentProps> = ({history}) => {
    const [loading, setLoading] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState([]);
    const [userRule, setUserRule] = useState(false);
    
    useEffect(()=> {
        const rules = JSON.parse(localStorage.getItem('rules') || '');
        rules.map(rule => {
            if(rule.name === 'montagemExterna_ADM')
                return setUserRule(rule.name || '');
        })

        async function handleGetRequestsMounts(){
        setLoading(true);
            const token = sessionStorage.getItem('token');

            const requestsMounts = await api.get('/requestmounts',
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            // console.log(requestsMounts.data);

            if (requestsMounts.data.error){
                toast.error(requestsMounts.data.error);
                history.push('/');
            }

            if (requestsMounts.data.original){
                toast.error(requestsMounts.data.original.message);
            }

            if(requestsMounts.data){
                setSolicitacoes(requestsMounts?.data);
            }else{
                setSolicitacoes([]);
            }

        setLoading(false);
        }

        handleGetRequestsMounts();
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
            <PagerHeader  header={'Minhas Montagens'} />
            <Button name={<NavLink  to='/solicitacaoMontagem' style={{color: '#fff', textDecoration: 'none'}}>Nova Solicitação</NavLink >} />
                <Content>
                    {/* <Table data={solicitacoes} /> */}
                    <ReactTable
                        data={solicitacoes}
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
                            columns: [
                                {
                                    Header: "ID",
                                    accessor: "id",
                                    maxWidth: 50,
                                    Cell: row => (
                                        <NavLink to={`/solicitacaoMontagem/${row.value}`}>{row.value}</NavLink>
                                    )
                                },
                                {
                                    Header: "SOLICITANTE",
                                    accessor: 'mountsToUser.usuario',
                                    // show: userRule? true : false
                                },
                                {
                                    Header: "TIPO SERVIÇO",
                                    accessor: "type",
                                },
                                {
                                    Header: "TIPO LOJA",
                                    accessor: "type_work"
                                },
                                {
                                    Header: "LOJA",
                                    accessor: "store",
                                },
                                {
                                    Header: "SOLICITAÇÃO",
                                    accessor: "createdAt",
                                    Cell: row => (
                                        <span>{
                                            new Date(row.value).toLocaleDateString('en-GB', {timeZone : 'UTC'}) 
                                        }</span>
                                    )
                                },
                                {
                                    Header: "INICIO",
                                    accessor: "start_work",
                                    Cell: row => (
                                        <span>{
                                            new Date(row.value).toLocaleDateString('en-GB', {timeZone : 'UTC'}) 
                                        }</span>
                                    )
                                },
                                {
                                    Header: "FIM",
                                    accessor: "end_work",
                                    Cell: row => (
                                        <span>{
                                            new Date(row.value).toLocaleDateString('en-GB', {timeZone : 'UTC'}) 
                                        }</span>
                                    )
                                },
                                {
                                    Header: "ORÇAMENTO",
                                    accessor: "budgeted",
                                    Cell: row => (
                                        <span>{row.value.toLocaleString()}</span>
                                    )
                                },
                                {
                                    Header: "STATUS",
                                    accessor: "status",
                                    Cell: row => (
                                        <div style={{width: '200px', display:'flex', flexDirection:'row', padding: '0 5%', alignItems: 'center', fontSize: '18px',}}>
                                        {/* <span style={{
                                            
                                            marginRight: '5%',
                                            color: 
                                                row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#0f0' :
                                                '',
                                            transition: 'all .3s ease'
                                        }}>
                                          &#x25cf;</span> */}
                                        <span style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '5px',   
                                            marginRight: '5%',
                                            background: 
                                                row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#29bf12' :
                                                '',
                                            boxShadow:  `0 0 5px ${row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#29bf12' :
                                                ''}, 0 0 10px ${row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#29bf12' :
                                                ''}, 0 0 20px  ${row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#29bf12' :
                                                ''}, 0 0 40px ${row.value === 'Em Analise'  ? '#999' : 
                                                row.value === 'Reprovado'   ? '#D63230' : 
                                                row.value === 'Aprovado'    ? '#40BCD8' :
                                                row.value === 'Serviço Iniciado' ? '#F28C37' :
                                                row.value === 'Serviço Finalizado' ? '#29bf12' :
                                                ''}`,
                                            transition: 'all .3s ease'
                                        }}></span>
                                          {row.value}
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
    );
}

export default SolicitacoesMontagem;
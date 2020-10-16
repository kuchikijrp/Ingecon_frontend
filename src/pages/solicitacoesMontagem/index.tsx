import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import api from '../../services/api';

import SideBar from '../../components/sidebar';
import Loading from '../../components/Loading';
import PagerHeader from '../../components/PageHeader';

import Button from '../../components/forms/button';

import { FiEye, FiEyeOff, FiTrash2 } from 'react-icons/fi'

import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import { Container, Menu, Wrapper, Content } from './styles';

const SolicitacoesMontagem: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [solicitacoes, setSolicitacoes] = useState([]);

    useEffect(()=> {
        async function handleGetRequestsMounts(){
        setLoading(true);
            const token = sessionStorage.getItem('token');

            const requestsMounts = await api.get('/requestmounts',
            {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            console.log(requestsMounts.data);
            if (requestsMounts.data.original){
                toast.error(requestsMounts.data.original.message);
            }

            setSolicitacoes(requestsMounts.data)

        setLoading(false);
        }

        handleGetRequestsMounts();
    }, [])


    function handleTo(){
        return <Link to="/solicitacaoMontagem" />
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
            <PagerHeader  header={'Solicitações De Montagem'} />
            <Button name={<Link to='/solicitacaoMontagem'>Nova Solicitação</Link>} />
                <Content>
                    {/* <Table data={solicitacoes} /> */}
                    <ReactTable
                        data={solicitacoes}
                        // TheadComponent={_ => null}
                        noDataText="Sem solicitações"
                        columns={[
                            {
                            // Header: "Name",
                            columns: [
                                {
                                    Header: "Núm. Solic.",
                                    accessor: "id",
                                },
                                {
                                    Header: "Tipo Serviço",
                                    accessor: "type",
                                },
                                {
                                    Header: "Tipo Loja",
                                    accessor: "type_work"
                                },
                                {
                                    Header: "Cliente",
                                    accessor: "store",
                                },
                                {
                                    Header: "Inicio",
                                    accessor: "start_work",
                                },
                                {
                                    Header: "Fim",
                                    accessor: "end_work",
                                },
                                {
                                    Header: "Orçamento",
                                    accessor: "budgeted",
                                },
                                {
                                    Header: "Status",

                                },
                            ]
                            }
                        ]}
                        defaultPageSize={30}
                        style={{
                            height: "76vh", // This will force the table body to overflow and scroll, since there is not enough room
                        }}
                        className="-striped -highlight"
                        />
                </Content>
            </Wrapper>
        </Container>
    </>
    );
}

export default SolicitacoesMontagem;
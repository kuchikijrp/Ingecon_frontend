import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';

import SideBar from '../../components/sidebar2/';
import Navbar from '../../components/navbar/';
import PageHeader from '../../components/PageHeader';
import Button from '../../components/forms/button';
import Loading from '../../components/Loading';

import { NavbarContainer, Menu, Wrapper, Content } from './styles';
import { Grid } from '../../styles/grid';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import api from '../../services/api';

const Users: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(()=>{
    async function getUsers(){
      setLoading(true);
      const token = sessionStorage.getItem('token');

      const users = await api.get('/users',
      {
          headers: {
              authorization: `Bearer ${token}`
          }
      });

      // console.log(users.data);

      if (users.data.error){
          // toast.error(users.data.error);
          // history.push('/');
      }

      if (users.data.original){
          toast.error(users.data.original.message);
      }

      if(users.data){
        setUser(users?.data);
      }else{
        setUser([]);
      }

  setLoading(false);
    }

    getUsers();
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
          <PageHeader header={'Lista Usuários'} />
          <Button name={<NavLink  to='/newUser' style={{color: '#fff', textDecoration: 'none'}}>Novo Usuário</NavLink >} />
                <Content>
                    {/* <Table data={solicitacoes} /> */}
                    <ReactTable
                        data={user}
                        // TheadComponent={_ => null}
                        noDataText="Sem Solicitações"
                        defaultSorted={[
                            {
                              id: "id",
                              desc: false
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
                                      <NavLink to={`/newUser/${row.value}`}>{row.value}</NavLink>
                                  )
                                },
                                {
                                  Header: "NOME",
                                  accessor: "name",
                                },
                                {
                                  Header: "USUÁRIO",
                                  accessor: "usuario"
                                },
                                {
                                  Header: "E-MAIL",
                                  accessor: "email"
                                },
                                {
                                  Header: "DT ATUALIZAÇÃO",
                                  accessor: "updatedAt",
                                  Cell: row => (
                                    <span>{
                                        new Date(row.value).toLocaleDateString('en-GB', {timeZone : 'UTC'}) + ' '+ new Date(row.value).toLocaleTimeString('en-GB', {timeZone : 'UTC'}) 
                                    }</span>)
                                }
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

export default Users;
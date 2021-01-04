import React from 'react';

import SideBar from '../../components/sidebar2/';
import Navbar from '../../components/navbar/'

import { NavbarContainer, Menu } from './styles';
import { Grid } from '../../styles/grid';

const Dash: React.FC = () => {
  return (
    <>
      <Grid>
        <Menu >
            <SideBar />
        </Menu>
        <NavbarContainer>
            <Navbar />
        </NavbarContainer>
      </Grid>
    </>
    );
}

export default Dash;
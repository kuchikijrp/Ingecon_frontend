import React from 'react';

import SideBar from '../../components/sidebar';

import { Grid } from './styles';

const Menu: React.FC = () => {
  return (
    <>
      <Grid>
        <SideBar></SideBar>
      </Grid>
    </>
    );
}

export default Menu;
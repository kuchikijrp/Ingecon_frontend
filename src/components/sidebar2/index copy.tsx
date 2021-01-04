import React, { useEffect, useState } from 'react';

import { Container, LogoIngecon, Menu } from './styles';

import { RiDashboardLine, RiHammerLine, RiEqualizerLine } from 'react-icons/ri'

import api from '../../services/api';
import { NavLink } from 'react-router-dom';

import logoIngecon from '../../assets/logo_Ingecon.svg';

interface item{
    id: number,
    name: string,
    parent: number
}

const SibeBar: React.FC = () => {

  return (
    <Container>
        <div className="logo">
            <LogoIngecon src={logoIngecon} />
        </div>
        <Menu id="tree">
        <nav className="primnav">
          <ul>
            <li className="group">
              <a href="/menu">
                <RiDashboardLine size={20} />&nbsp;&nbsp;MENU
              </a>
            </li>

            <li className="group">
              <a href="#mail">
                <RiHammerLine size={20} />&nbsp;&nbsp;Montagem Externa
                <div className="tag"></div>
              </a>
              <ul className="secnav">
                <li>
                  <NavLink to="/solicitacoesMontagem">Minhas Solicitações</NavLink>
                </li>
              </ul>
            </li>

            <li className="group">
              <a href="#sysadmin">
              <RiEqualizerLine size={20}/>&nbsp;&nbsp;Administração Usuários
              </a>
              <ul className="secnav">
                <li>
                  <a href="#users">Users</a>
                </li>
                <li>
                  <a href="#lists">Lists</a>
                </li>
                <li>
                  <a href="#calendar">Calendar</a>
                </li>
              </ul>
            </li>
          </ul>
  </nav>
        </Menu>
    </Container>
    );
}

export default SibeBar;
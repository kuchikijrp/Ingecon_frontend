import React, { useEffect } from 'react';

import { Container, LogoIngecon, Menu } from './styles';

// import { RiDashboardLine, RiHammerLine, RiEqualizerLine } from 'react-icons/ri'

import api from '../../services/api';
// import { NavLink } from 'react-router-dom';

import logoIngecon from '../../assets/logo_Ingecon.svg';

interface item{
    id: number,
    name: string,
    parent: number
}

const SibeBar: React.FC = () => {

  useEffect(()=>{
    async function montarMenu(){
        const token = sessionStorage.getItem('token');
        // console.log(localStorage.getItem('itensMenu'))
        const data = JSON.parse(localStorage.getItem('itensMenu') || '');
        
        // const response = await api.get('/montarMenu', 
        // {
        //     headers: {
        //         "authorization": `Bearer ${token}`
        //     }
        // });

        // const data = response?.data;

// console.log(data)
// pega a tag principal que irá receber o menu
const tree = document.querySelector('#tree')

// recebe toda a arvore de elementos
const menu = document.createElement('ul')

const firstLevel = data?.filter(item => !item.parent)
const getFirstLis = firstLevel.map(buildTree) // retorno novo array com li's
getFirstLis.forEach( li => menu.append(li)) // adicionar li's ao menu

function buildTree(item) {
    // console.log(item)
    // primeiro elemento
    const li = document.createElement('li')
    // li.classList.add('group')
// console.log(item.route);
    // li.innerHTML = item.name
    li.innerHTML = `<a href="${!item.route? '#'+item.route : '/'+item.route}" ><span><RiHammerLine size={20} /></span>&nbsp;&nbsp;${item.name}</a>`
    
    if(item.parent === null)
      li.classList.add('group')

    const children = data.filter(child => child.parent === item.id)

    if(children.length > 0) {
      // console.log(children);
      //adiciona um click para os parents
      // li.addEventListener('click', (event:any) => {
        //     event.stopPropagation()
        //     event.target.classList.toggle('open')
        // })
        
        // adiciona uma classe identificadora de que tem filhos
        // constroi os filhos
        
        const subMenu = document.createElement('ul')
        
        subMenu.classList.add('secnav')
        children.map(buildTree)
        .forEach(li => subMenu.append(li))
        
        li.append(subMenu)
        // li.classList.remove('group')
    }
    
    // adicionar os elements ao menu
    return li
}

// adiciona o menu no HTML
tree?.append(menu)

    }

    montarMenu();
}, [])

  return (
    <Container>
        <div className="logo">
           <a href='/Menu'><LogoIngecon src={logoIngecon} /></a>
        </div>
        <Menu >
        <nav className="primnav" id="tree">
          {/* <ul>
            <li className="group">
              <a href="/menu">
                <rihammerline size={20} />&nbsp;&nbsp;MENU
              </a>
            </li>

            <li className="group">
              <a href="#mail">
                <RiDashboardLine size={20} />&nbsp;&nbsp;Montagem Externa
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
          </ul> */}
  </nav>
        </Menu>
    </Container>
    );
}

export default SibeBar;
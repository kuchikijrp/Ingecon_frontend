import React, { useEffect, useState } from 'react';

import { Container, Menu } from './styles';
import api from '../../services/api';

interface item{
    id: number,
    name: string,
    parent: number
}

const SibeBar: React.FC = () => {

    useEffect(()=>{
        async function montarMenu(){
            const token = sessionStorage.getItem('token');

            const response = await api.get('/montarMenu', 
            {
                headers: {
                    "autorization": `Bearer ${token}`
                }
            });

            const tree = document.querySelector('nav#tree');

            const menu = document.createElement('ul');

            const firstLevel = response.data.filter((item:any) => !item.parent);

            const getFirstLis = firstLevel.map(buildTree);
            getFirstLis.forEach( (li:any) => menu.append(li));

            function buildTree(item){
                    const li = document.createElement('li');
                    // const span = document.createElement('span');
                    // li.append(span);

                    li.innerHTML =  item.name;
    
                    const Children = response.data.filter((child:any) => child.parent === item.id);
                    
                    if(Children.length > 0){

                        li.addEventListener('click', (event:any) =>{
                            event.stopPropagation()
                            event.target.classList.toggle('open');
                        })

                        li.classList.add('has-children');
                        // span.addEventListener('click', (event:any) =>{
                        //     event.stopPropagation()
                        //     event.target.classList.toggle('open');
                        // })

                        // span.classList.add('has-children');

                        const subMenu = document.createElement('ul');
                        Children.map(buildTree)
                            .forEach((li:any) => subMenu.append(li))
                        li.append(subMenu);
                    }
                    

                    return li;
            }

            tree?.append(menu)

        }

        montarMenu();
    }, [])

  return (
    <Container>
        <Menu id="tree">
        </Menu>
    </Container>
    );
}

export default SibeBar;
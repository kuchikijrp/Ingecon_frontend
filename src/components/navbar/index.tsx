import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'

import { Container } from './styles';
// import Menu from '../../pages/menu';

const Navbar: React.FC = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const userLoged = JSON.parse(localStorage.getItem('user') || '');
        setUser(userLoged.usuario);
        // console.log(userLoged);
    }, [])

  return (
    <Container>
        <div className="user">
        <section>
            {/* <img src="https://randomuser.me/api/portraits/women/85.jpg" /> */}
            <section>
            <div className="name">{user}</div>
            <div className="actions"><a href="/">Logout</a></div>
            </section>
        </section>
        </div>
    </Container>
    );
}

export default Navbar;
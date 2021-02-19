import React, { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom'

import { Container } from './styles';
// import Menu from '../../pages/menu';

const Navbar: React.FC = () => {
    const [user, setUser] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        const userLoged = JSON.parse(localStorage.getItem('user') || '');
        setUser(userLoged.usuario);

        var img = new Image();
        img.src = `avatares/${userLoged.usuario}.jpg`;
        img.onload = function() {
            setAvatar(`avatares/${userLoged.usuario}.jpg`)
        }
        img.onerror = function() {
            setAvatar('avatares/default.jpg')
        }
        console.log(avatar);
    }, [])

  return (
    <Container>
        <div className="user">
        <section>
            <img src={avatar} />
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
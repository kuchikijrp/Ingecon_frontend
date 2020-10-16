import styled from "styled-components";

import { FaBeer } from 'react-icons/fa';

export const Container = styled.div`
    background-color : #5b5e71;
    /* background: linear-gradient(180deg, var(--ingeconBordo), 90%, var(--ingeconSecondary)); */
    grid-area: SB;
    display: flex;
    flex-direction: column;

    padding-top: calc(7vh + 10px);

    width: 15vw;
    min-width: 80px;
    z-index: 100;
    overflow:hidden;
    transition:width .5s ease;
    cursor:pointer;
    box-shadow: 0 9px 15px 9px rgba(0, 0, 0, .5);

    /* &:hover {
        width: 25vw;
    } */
`;

export const Menu = styled.nav`
    margin-left: 20px;
    max-width: 100%;
    ul{
        padding-left: 16px;
        color: #fff;
        /* background: #fff; */
    }
    
    li{
        list-style: none;
        padding: 0.8em 0;
    }

    li.has-children, span.has-children:before {
        position: relative;
    }
    li.has-children:before{
        content: '\f107';
        color: #fff;
        position: absolute;
        font-family: FontAwesome;
        font-size: 26px;
        right: 15px;
    }

    li > ul{
        display:none;
    }

    li.open > ul{
        display: block;
    }
`;
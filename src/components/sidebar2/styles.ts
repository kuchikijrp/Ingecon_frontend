import styled from "styled-components";

export const Container = styled.div`
    /* background-color : #5b5e71; */
    background: linear-gradient(180deg, var(--primary), 90%, var(--tertiary));
    /* grid-area: SB; */
    display: flex;
    flex-direction: column;
    flex: 1;

    /* padding-top: calc(7vh + 10px); */

    /* width: 15vw; */
    /* min-width: 80px; */
    height: 100%;
    z-index: 100;
    overflow:hidden;
    transition:width .5s ease;
    /* cursor:pointer; */
    box-shadow: 0 9px 15px 9px rgba(0, 0, 0, .5);

    /* &:hover {
        width: 25vw;
    } */
`;

export const Menu = styled.nav`
    margin-top: 45px;
    max-width: 300px;

    color: #F3F3F4;

    ul {
    padding-left: 16px;
    }

    li {
    list-style: none;
    /* background: #000; */

    margin-top: 2px;
    

    }

    li.has-children {
        cursor: pointer;
        position: relative;

    }

    li.has-children:before {
        content: '\f107';
        color: #F3F3F4;
        position: absolute;
        font-family: FontAwesome;
        font-size: 26px;
        right: 15px;
    }

    li > ul {
        display: none;
        /* color: red; */
    }

    li.open > ul {
        display: block;

    }
`;
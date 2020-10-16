import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        outline: 0px;        
        font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    }
    
    html, body, #root{
        max-height: 100vh;
        max-width: 100vw;

        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    *, input, button{
        -moz-appearance: none;
        -webkit-appearance: none;
        appearance: none;

        border: 0;
        background: none;
        outline:0 ;
    }

    :root{
        --primary: rgb(52, 67, 94);
        --secondary: rgba(68, 114, 196, 1);
        --tertiary: rgb(32, 34, 37);

        --background: #f2f2f2;

        --gray: #8a8c90;

        --ingeconPrimary:rgb(84, 88, 90);
        --ingeconSecondary: rgb(217, 217, 214);
        --ingeconBordo: rgb(138, 25, 31);

        --white: #fff;
    }
`;
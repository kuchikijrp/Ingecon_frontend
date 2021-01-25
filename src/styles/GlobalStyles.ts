import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    *{
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
        outline: 0px;        
        font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
        /* font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; */

    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        background-color: #F5F5F5;
        border-radius: 10px;
    }

    ::-webkit-scrollbar
    {
        width: 10px;
        height: 10%;
        background-color: #F5F5F5;
    }

    ::-webkit-scrollbar-thumb
    {
        /* linear-gradient(to right, #314755 50%, #26a0da) */
        border-radius: 10px;
        background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.1, #26a0da),color-stop(0.6, #314755));
        /* background-image: -webkit-gradient(linear,left bottom,left top,color-stop(0.44, rgb(122,153,217)),color-stop(0.72, rgb(73,125,189)),color-stop(0.86, #314755)); */
    }

    //css react table
    //css react table


    }
    
    html, body, #root{
        max-height: 100vh;
        max-width: 100vw;

        height: 100%;
        width: 100%;

        display: flex;
        flex-direction: column;
    }

    *, input, button, select, textarea{
        /* -moz-appearance: none;
        -webkit-appearance: none;
        appearance: chekbox; */

        border: 0;
        background: none;
        outline:0 ;
        font-family: Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif;
    }

    :root{
        /* --primary: rgb(52, 67, 94); */
        /* --primary: rgb(26, 115, 232); */
        --primary: #314755;
        --secondary: rgba(68, 114, 196, 1);
        --tertiary: #26a0da;

        --background: #f2f2f2;

        --gray: #8a8c90;

        --ingeconPrimary:rgb(84, 88, 90);
        --ingeconSecondary: rgb(217, 217, 214);
        --ingeconBordo: rgb(138, 25, 31);

        --white: #fff;
    }
    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    form {
    }

    form .formControl{
        /* flex:1; */
        display:flex;
        flex-direction:row;
        justify-content: space-between;
    }

    form .buttonControl{
        width:20%;
        max-width: 200px;
    }

    form .separator{
        height: 1px;
        background: var(--primary);
        margin: 1% 0;
    }
    
`;
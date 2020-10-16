import styled from "styled-components";

import BackgroundLogin from '../../assets/backgroundLogin.jpeg';
// import logoMarelli from '../../assets/logo_marelli.svg';

export const Error = styled.div`
    background-color: #fb5546;
    border-radius:8px;

    padding: 18px 30px;

    color: #fff;
    font-size:18px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    /* background: #7159c1; */
	background-image: url(${BackgroundLogin});
    background-size: cover;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    margin: 50px auto 0;
    max-width: 350px;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    padding: 20px;

    >form{
        background: rgba(255, 255, 255, 0.1);

width: 100%;

margin: 20px auto;
padding: 32px;

display: flex;
flex-direction: column;

border-radius: 10px;

>h2{
    color: #fff;
    margin: 0 auto 10px auto;

    font-size:16px;
}


>button{
    padding: 16px;
    background-color: var(--ingeconSecondary);

    border: 1px solid #fff;
    border-radius: 8px;

    font-size:18px;

    cursor: pointer;

    &:hover{
        background-color: var(--ingeconPrimary); 
        color: var(--ingeconSecondary)
    }
}
    }

`;
export const LogoIngecon = styled.img`
    align-items:center;
    margin: 15px auto;
    width: 80%;
`;

export const LogoMarelli = styled.img`
    margin-left: 33%;
    margin-top: 10px;
    width: 30%;
`;

export const Form = styled.div`

`;

export const  WrapperInput = styled.div`
    display: flex;
    flex-direction: column;

    margin-bottom: 24px;
    position: relative;

    >input{
        width: 100%;

        padding: 10px;

        font-size: 18px;

        border: none;
        border-bottom: 1px solid var(--ingeconSecondary);

        background-color: transparent;

        color: var(--ingeconSecondary);
    }

    >input~label {
        position: absolute;
        top: 15px;
        left: 0;

        font-size: 18px;

        color: var(--ingeconSecondary);

        transition: .5s;
    }

    >input:focus~label,
     input:valid~label{
        transform: translateY(-22px);
        font-size: 0.9em;
        letter-spacing: 0.2em;
    }
`;
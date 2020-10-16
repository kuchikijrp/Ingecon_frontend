import styled from "styled-components";

export const Container = styled.div`
    /* display: flex; */
    margin: 50px auto 0;
    max-width: 350px;
    width: 100%;
    height:100%;
    /* flex-direction: column; */
    /* align-items: center; */
`;

export const Content = styled.div`
    /* display: flex;
    flex-direction: column; */
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 4px;
    padding: 20px;
`;
export const LogoIngecon = styled.img`
    align-items:center;
    margin-left: 25%;
    margin-bottom: 10px;
    /* margin: auto 10px; */
    width: 50%;
`;

export const Form = styled.div``;

export const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const User = styled.input`
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    border-radius: .25rem;
    font-size: 1rem;

    margin-bottom: 10px;

    ::placeholder{
        color: #999;        
    }    
`;
export const Password = styled.input`
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    border-radius: .25rem;
    font-size: 1rem;

    margin-bottom: 25px;

    ::placeholder{
        color: #999;        
    } 

`;

export const LoginBtn = styled.button`
    width: 100%;
    height: calc(1.5em + .75rem + 2px);
    padding: .375rem .75rem;
    border-radius: .25rem;
    font-size: 1rem;
    border: 2px solid var(--ingeconSecondary);
    color: #000;
    cursor: pointer;

    background: #f9f9f9;

    transition: border .5s;
    &:hover{
        border: 2px solid #000;
    }
`;

export const LogoMarelli = styled.img`
    margin-left: 33%;
    margin-top: 10px;
    width: 30%;
`;
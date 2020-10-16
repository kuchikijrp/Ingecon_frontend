import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: .5%;
`;

export const ContainerSelect = styled.div`
    width: 100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    position: relative;
    /* margin-bottom: 1%; */

    select{
        flex:1;
        width: 100%;
        display: flex;
        padding: 10px;
        font-size: 14px;
        border: 1px solid var(--primary);
        border-radius: 5px;
        padding: 5px;
        /* background: transparent; */
        color: var(--primary);;
        ::placeholder{
            color: #ffffff45;
        }
    }
    select:focus{
        -webkit-box-shadow: 0 0 0 2.5px rgba(102,175,233,.6);
        box-shadow: 0 0 0 2.5px rgba(102,175,233,.6);
    }
    svg{
        color: var(--ingeconBordo);
    }
`; 

export const Headerselect = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
    align-items: center;
`;

export const Title = styled.span`
    color: var(--primary);
    font-weight: 700;
    display: block;
`;


export const Error = styled.span`
    color: var(--ingeconBordo);
    font-weight: 500;
    width: 100%;
    display: block;
    flex: 1;
    text-align: right;
    font-size: 12px;
`; 
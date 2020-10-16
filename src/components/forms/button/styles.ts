import styled from 'styled-components'

export const ContainerButton = styled.div`
    /* width: 100%;
    height: 100%; */
    display: flex;
    flex:1%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding:.5%;
    
    button{
        /* width: 100%;
        height: 100%; */
        padding: 0 5px;
        border: 1px solid var(--primary);
        color: #ffffff;
        background: var(--primary);
        /* margin: 10px; */
        font-size: 24px;
        border-radius: 5px;
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.4s ease;

    }
    button:hover{
        /* box-shadow: 0 0 0 2.5px rgba(68, 114, 196, 0.56); */
        -webkit-box-shadow: 0 0 0 2.5px rgba(102,175,233,.6);
        box-shadow: 0 0 0 2.5px rgba(102,175,233,.6);
        background-color: var(--secondary);
        /* color: var(--white) */
        /* opacity: 5; */
    }

`; 
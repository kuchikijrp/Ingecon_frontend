import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction:row;
    
	list-style: none;

    /* background: var(--background); */
`;

export const Menu = styled.div`
    height: 100vh;
    /* height: 100%; */
    width: 250px;

    @media only screen and (max-width: 850px){
        height: 100%; 
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    min-width: 650px;
    margin: 0 auto;
    padding: 1%;
    /* background: var(--ingeconPrimary); */
    /* border: 1px solid var(--ingeconPrimary); */
    /* border-radius: 8px; */
`;

export const Content = styled.div`
    /* background: red; */
    width: 70%;
    min-width: 650px;

    margin: 20px auto;

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


    @media only screen and (max-width: 850px) {
        form .formControl {
            flex-direction: column;
        }

        form .buttonControl{
            width: 100%;
        }
    }
`;
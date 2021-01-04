import styled from "styled-components";

export const Menu = styled.div`
    grid-area: SB;
`;

export const NavbarContainer = styled.div`
    grid-area: NB;
`;

export const Wrapper = styled.div`
    grid-area: CP;
    padding: 1%;
    overflow: hidden;
`;

export const Content = styled.div`
    /* background: red; */
    width: 100%;
    min-width: 650px;

    padding: 0 8%;

    height: calc(100vh - 170px);

    margin: 20px auto;

    overflow-y: auto;
    ::-webkit-scrollbar {
        /* width: 0px; */
        /* display: none; */
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

    @media only screen and (max-width: 850px) {
        form .formControl {
            flex-direction: column;
        }

        form .buttonControl{
            width: 100%;
        }
    }
`;
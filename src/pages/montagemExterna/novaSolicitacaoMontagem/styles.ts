import styled from "styled-components";

export const Menu = styled.div`
    grid-area: SB;
`;

export const Wrapper = styled.div`
    grid-area: CP;
    padding: 1%;
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
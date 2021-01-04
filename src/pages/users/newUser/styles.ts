import styled from "styled-components";

export const Container = styled.div`

`;

export const NavbarContainer = styled.div`
    grid-area: NB;
`;


export const Menu = styled.div`
    grid-area: SB;
`;

export const Wrapper = styled.div`
    grid-area: CP;
    padding: 1%;
    height: 50px;
`;

export const Content = styled.div`
    /* background: red; */
    width: 50%;
    /* min-width: 650px; */

    margin: 8px auto;

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

    .buttonControl{
        display: flex;
        flex-direction: row;
        height: 100%;
        justify-content: space-between;
        align-items: center;
    }

    .ReactTable{
        height: calc(100vh - 210px);
    }

    .ReactTable .rt-thead {
        overflow-y: scroll;
    }

    .ReactTable .rt-td{
        padding: 1px;
        text-align: center;
        text-justify: center;
    }

    @media only screen and (max-width: 800px) {
        form .formControl {
            flex-direction: column;
        }

        form .buttonControl{
            width: 100%;
        }
    }
`;

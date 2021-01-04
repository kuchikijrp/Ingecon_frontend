import styled from "styled-components";

export const Grid = styled.div`
        display: grid;

    grid-template-rows: 70px auto;
    grid-template-columns: 200px auto;
    /* grid-template-columns: 260px auto; */

    grid-template-areas: 
        'SB NB'
        'SB CP';
    /* grid-template-areas: 
        'NB NB'
        'SB CP'; */

    height: 100vh;
    min-width: 1000px;
`;
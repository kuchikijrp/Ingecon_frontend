import styled from "styled-components";

export const Grid = styled.div`
    display: grid;

    grid-template-rows: 7vh auto;
    grid-template-columns: 15vw auto;

    grid-template-areas: 
        'LG TB'
        'SB CP';

    height: 100vh;
    min-width: 1000px;
`;


import styled from "styled-components";


export const Container = styled.div`
    /* background-color: var(--secondary); */
    background: linear-gradient(to right, #314755 50%, #26a0da);
    border-radius:8px;

    padding: 10px 30px;

    color: #fff;
    font-size:18px;
    
    justify-content: 'center';
    align-items: 'center';

    flex:1;

    @media print{
        border-bottom: 2px outset #000;
        border-radius: 0
    }
`;

// export const Container = styled.div`
//     display: block;
//     font-size: 1.5em;
//     /* margin-block-start: 0.67em; */
//     /* margin-block-end: 0.67em; */
//     /* margin-inline-start: 0px; */
//     /* margin-inline-end: 0px; */
//     /* font-weight: bold; */

//     flex:1;
// `;
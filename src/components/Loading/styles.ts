
import styled from "styled-components";


export const OverlayContent = styled.div`
    display: flex;
    width: 100%;
    left: 0;
    top: 0;
    align-items: center;
    height: 100%;
    justify-content: center;
    position: fixed;
    z-index: 999999;
    background: rgba(0, 0, 0, 0.7);
    flex-direction: column;
    color: #fff;


.overlay-content .wrapper {
    display: inherit;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.overlay-content .wrapper .message {
    margin-top: 20px;
    color: #fff;
    font-weight: bold;
    text-shadow: 0 2px 5px black;
    margin-top: 30px;
}
`;

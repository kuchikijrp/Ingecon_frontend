import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    flex-direction: row;
    background: var(--primary);
    /* box-shadow: 0 9px 15px 0 rgba(0, 0, 0, .5); */
    height: 100%;
    color: #fff;
    /* position: relative; */

    .user {
        margin-right: 10px;
        padding: 5px;
        /* padding-bottom: 3px; */
        flex-shrink: 0;
        position: fixed;
        font-weight: 400;
        right: 0;
        /* @include alpha-attribute('color', rgba($text, 0.9), white); */
        /* z-index: 99999; */

        section {
            display: flex;
            flex-direction: row-reverse;
            align-items: center;
            section {
            display: flex;
            flex-direction: column;
            white-space: nowrap;
            }
        }
        img {
            height: 51px;
            width: 51px;
            clip-path: circle(50% at 50% 50%);
            margin-left: 10px;
            min-height: 51px;
            min-width: 51px;
            align-items: flex-end;
        }
        .name {
            font-weight: 400;
        }
        .actions {
            padding: .1em 0;
            font-size: .8em;
            display: flex;
            justify-content: flex-end;

            a {
            color: #fff;
            padding: 0 .5em;
            /* text-decoration: none; */
            &:last-child {
                padding-right: 0;
            }
            }
        }
        }
`;
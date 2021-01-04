import styled from "styled-components";


export const Container = styled.div`
    /* background-color : #5b5e71; */
    background: linear-gradient(180deg, var(--primary), 95%, var(--tertiary));
    /* grid-area: SB; */
    display: flex;
    flex-direction: column;
    flex: 1;

    /* padding-top: calc(7vh + 10px); */

    /* width: 15vw; */
    /* min-width: 80px; */
    height: 100vh;
    z-index: 100;
    overflow:hidden;
    transition:width .5s ease;
    /* cursor:pointer; */
    box-shadow: 0 9px 15px 9px rgba(0, 0, 0, .5);

    color: var(--white);
    /* &:hover {
        width: 25vw;
    } */
    .logo{
        /* background-color: #fff; */
        /* height: 70px; */
        margin: 10px auto;
    }
`;

export const LogoIngecon = styled.img`
    align-items:center;
    justify-content: center;
    width: 150px;
`;

export const Menu = styled.nav`
    .primnav {
    /* position: fixed; */
    height: 100%;
    /* width: 100vw; */
    font-size: .8em;
    text-transform: uppercase;
    /* background-color: #000; //lighten($main, 5%); */
    display: flex;
    flex-direction: column;
    transition: height 246ms .5s ease;
    padding-top: 58px;
    overflow-x: hidden;
    overflow-y: hidden;
    box-sizing: border-box;
    padding-left: 5px;

    .group{
        margin-bottom: 10px;
    }

    .active{
        color: red;
    }

    z-index: 1;
        @include media-sm {
            height: 100vh;
            width: 58px;
            transition: width 246ms .5s ease;
        }

        > ul {
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
        }
        li {
            font-weight: 400;
            position: relative;
            /* margin-left: 5px; */
            &:hover {
                background-color: rgba(68, 114, 196, 0.3);
            }
            .tag {
                color: var(--white);
                background-color: rgba(68, 114, 196, 0.8);
                padding: 0 .5em;
                border-radius: 2em;
                margin-left: auto;
                margin-right: .75em;
            }
            a {
                position: relative;
                color: var(--white);
                display: flex;
                align-items: center;
                white-space: nowrap;
                text-decoration: none;
            }
            
        }    
        .icon {
            height: 20px;
            flex-shrink: 0;
            width: 20px;
            padding: 19px;
            margin-right: 5px;
            padding-bottom: 15px;
        }
        expand:hover {
            @extend %sidebar-hover;
        }    
    }
    .secnav {
        margin-left: 35px;
        border-left: 1px solid black;
        border-left-color: var(--white);
        overflow: hidden;
        
        li {
            max-height: 100px;
            transition: max-height .1s;
            
            @include media-sm {
            max-height: 0px;
            transition: max-height .5s .5s;
            }
            
            a {
            text-transform: initial;
            display: block;
            color: inherit;
            padding: .75em 10px;
            }
        }
        }
`;
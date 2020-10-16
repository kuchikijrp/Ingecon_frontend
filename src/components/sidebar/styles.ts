import styled from "styled-components";


export const Container = styled.div`
    background: var(--primary);

    height: 100%;
    width: 100%;
    /* margin-top: 10%; */
    padding-top: 20%;


 ul {
	/* font: 16px Segoe UI,Helvetica Neue,Helvetica,Lucida Grande,Arial,Ubuntu,Cantarell,Fira Sans,sans-serif; */
	list-style: none;
	margin: 0;
	padding: 0;
	margin-top: 3px
}

 ul li {
	float: left;
	/* position: relative; */
	display: block;
    width: 100%;
}

 ul li a {
	color: #555;
	background: #FFF;
	text-decoration: none;
	margin: 0 1px;
	padding: 15px 20px;
	border-top: 1px solid #555;
	display: block;
}

 li ul {
	display: block;
}

 /* ul li a:hover {
	background: #066;
	color: #FFF;
}

 li:hover ul {
	display: block;
	position: relative;
}

 li:hover li {
	float: none;
	font-size: 12px;
}

 li:hover a {
	background: #333;
	color: #FFF;
}

 li:hover li a:hover {
	background: #222;
} */
`;


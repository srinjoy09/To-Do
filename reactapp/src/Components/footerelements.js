import styled from 'styled-components';

export const Box = styled.div`
padding: 5px 5px;
background: #F0F8FF;
position: absolute;
bottom: 0;
width: 100%;
justify-content: center;
align-items: center;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: center;
margin-left: 60px;
position: center
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;
align-items: center;
@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #000000;
margin-bottom: 20px;
font-size: 18px;
text-decoration: none;

&:hover {
	color: #000000;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #000000;
margin-bottom: 40px;
font-weight: bold;
`;

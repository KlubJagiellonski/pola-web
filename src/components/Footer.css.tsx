import styled from "styled-components"
import { theme } from "./../theme"

export const Wraper = styled.div`
width: 100%;
background-color: ${theme.dark};
padding: 20px 0px;
display: flex;
flex-direction: row;
justify-content: center;
`

export const LogoImage = styled.img`
margin-right: 100px;
`

export const Row = styled.div`
background-color: ${theme.primary};
padding: 5px 70px 5px 40px;
margin-right: 20px;
`

export const Text = styled.p`
font-family: 'Roboto';
font-size: 18px;
font-weight: 400;
line-height: 21px;
`

export const Title = styled.p`
font-family: Roboto;
font-size: 18px;
font-weight: 700;
line-height: 21px;
`

export const SocialRows = styled.div`
display: flex;
flex-direction: row;
`

export const SocialImage = styled.img`
witdh:20%;
padding-right: 5px;
`

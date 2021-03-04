import styled from 'styled-components'
import { WrapperSection } from './../GlobalStyle.css'

export const Wrapper = styled(WrapperSection)`
  display: flex;
  flex-direction: row;
`

export const ArticleImage = styled.img`
  width: 50%;
  height: auto;
  text-align: left;
`

export const ArticleSection = styled.div`
  margin: 0 15px;
`

export const ArticleButton = styled.button`
  font-family: 'Roboto';
  font-size: 12px;
  font-weight: 300;
  margin-top: 40px;
  background: #C4C4C4;
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
` 

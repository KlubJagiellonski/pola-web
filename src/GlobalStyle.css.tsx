import styled from 'styled-components'
import { theme } from './theme'

export const Button = styled.button`
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 700;
  border: 1px solid ${theme.border};
  background: ${theme.primary};
  padding: 15px 0;
  text-align: center;
  cursor: pointer;
  color: ${theme.border};
  text-transform: uppercase;
  width: 100%;
`

type Color = {
  color: string
}

export const WrapperSection = styled.div`
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;         
  background: ${({ color }: Color) => color};
  width: 100%;
  margin-top: 15px;
`

export const TitleSection = styled.p`
  margin-top: 15px;
  margin-bottom: 10px;
  padding: 0;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 700;
`

export const Text = styled.p`
  margin-top: 5px;
  padding: 0;
  font-family: 'Roboto';
  font-size: 12px;
  color: ${theme.text};
`
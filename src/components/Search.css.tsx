import styled from 'styled-components'
import { theme } from './../theme'

export const Wrapper = styled.div`
  background: ${theme.dark};
  padding: 260px 0 70px 300px;
`

export const Title = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Roboto';
  font-weight: bold;
  font-size: 24px;
`

export const Text = styled.p`
  margin: 5px 0;
  padding: 0;
  font-family: 'Roboto';
  font-size: 16px;

  a{
    color: #6C6C6C;
  }
`

export const InputSection = styled.div`
  position: relative;
  border: 1px solid ${theme.border};
  padding: 5px 100px 5px 5px;
  width: 250px;
  background-color: white;
`

export const InputText = styled.input`
  border: none;
  font-size: 14px;
  width: 100%;
`

export const InputIconSection = styled.div`
  position: absolute;
  top: 0px;
  bottom: 0px;
  display: flex;
  align-items: center;
  right: 10px;
  padding: 3px 0;

  img{
    height: 100%;
    max-height: 20px;
    margin: 3px;
    cursor: pointer;
  }
`

export const SubmitButton = styled.button`
  background: ${theme.primary};
  border: 1px solid ${theme.border};
  height: 100%;
  font-size: 14px;
  text-align: center;
  padding: 6px 15px;
  margin-left: 15px;
  color: ${theme.border};
  display: inline-block;
  font-weight: 700;
  cursor: pointer;
`

export const FormSearch = styled.form`
    display: flex;
    align-items: center;
    margin-top: 10px;
`
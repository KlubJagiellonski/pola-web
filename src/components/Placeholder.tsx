import React from 'react'
import styled from 'styled-components'
import { WrapperSection } from '../styles/GlobalStyle.css'
import { color, padding, fontSize } from '../styles/theme'

const Wrapper = styled(WrapperSection)`
  color: ${color.text.light};
  padding: ${padding.normal};
  display: flex;
  justify-content: center;
  text-align: center;
  font-size: ${fontSize.normal};
  font-weight: bold;

  p{
    margin: 0;
    padding: 0;
  }
`

interface IPlaceholder {
  text: string;
}


const Placeholder: React.FC<IPlaceholder> = ({ text }) => {
  return (
    <Wrapper color={color.background.red}>
      <p>{text}</p>
    </Wrapper>
  )
}

export default Placeholder;
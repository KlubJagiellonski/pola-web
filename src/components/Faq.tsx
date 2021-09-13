import React from 'react'
import styled from 'styled-components'
import { TitleSection } from '../styles/GlobalStyle.css'
import { margin } from '../styles/theme'
import AccordionList from './accordion/AccordionList'

const Wrapper = styled.div`
  margin: ${margin.big} 0;
`

const Faq = () => {
  return (
    <Wrapper>
      <TitleSection>
        FAQ
      </TitleSection>
      <AccordionList />
    </Wrapper>
  )
}

export default Faq;
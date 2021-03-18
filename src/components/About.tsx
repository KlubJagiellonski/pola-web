import react from 'react'
import { Wrapper } from './About.css'
import { theme } from './../theme'
import { Text } from './../GlobalStyle.css'

const About = () => {
  return (
    <Wrapper color={theme.dark}>
      <Text>O POLI / (EXPLAINER VIDEO w Przyszłości)(tekst dlaczego to ważne = krótkie info + czytaj więcej)</Text>
    </Wrapper>
  )
}

export default About;
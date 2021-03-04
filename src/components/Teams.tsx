import React from 'react'
import { Wrapper, Title } from './Teams.css'
import { Button, Text } from './../GlobalStyle.css'
import { theme } from './../theme'

type TeamsProps = {
  title: string,
  text: string,
  buttonText: string
}

const Teams = ({ title, text, buttonText }: TeamsProps) => {
  return (
    <>
      <Wrapper color={theme.dark}>
        <Title>
          {title}
        </Title>
        <Text>
          {text}
        </Text>
      </Wrapper>
      <Button>
        {buttonText}
      </Button>
    </>
  )
}

export default Teams;
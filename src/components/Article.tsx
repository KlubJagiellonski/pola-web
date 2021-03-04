import React from 'react'
import { Wrapper, ArticleImage, ArticleSection, ArticleButton } from './Article.css'
import {theme} from './../theme'
import { TitleSection, Text } from './../GlobalStyle.css'

type ArticleProps = {
  photo: string,
  title: string,
  date: string,
  text: string
}

const Article = ({ photo, title, date, text }: ArticleProps) => {
  return (
    <Wrapper color = {theme.primary}>
      <ArticleImage src={photo} />
      <ArticleSection>
        <TitleSection>{title}</TitleSection>
        <Text>
          {text}
        </Text>
        <Text>
          {date}
        </Text>
        <ArticleButton>
          lorem ipsum
        </ArticleButton>
      </ArticleSection>
    </Wrapper>
  )
}

export default Article;
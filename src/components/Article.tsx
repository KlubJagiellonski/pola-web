import React from 'react'
import { Wrapper, ArticleImage, ArticleSection, ArticleButton } from './Article.css'
import { theme } from './../theme'
import { TitleSection, Text } from './../GlobalStyle.css'

type ArticleProps = {
  photo: string,
  title: string,
  date: string,
  text: string,
  width: number
}

const Article = ({ photo, title, date, text, width }: ArticleProps) => {
  return (
    <Wrapper color={theme.primary}>
      <ArticleImage img={photo} />
      <ArticleSection>
        <TitleSection>{title}</TitleSection>
        <Text>
          {text}
        </Text>
        {width > 768 &&
          <>
            <Text>
              {date}
            </Text>
            <ArticleButton>
              lorem ipsum
            </ArticleButton>
          </>
        }
      </ArticleSection>
    </Wrapper>
  )
}

export default Article;
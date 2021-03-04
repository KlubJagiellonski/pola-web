import React from 'react'
import Article from './Article'
import { ArticlesButton } from './Articles.css'
import Photo from './../assets/xmas.png'

const article = {
  photo: Photo,
  title: 'ŚWIĄTECZNE ZAKUPY Z POLA APP DO 15% TANIEJ',
  data: '12 grudnia 2021',
  text: 'Sprawdź szczegóły promocji (wstęp artykułu) Lorem ipsum dolor sit amet enim. Etiam ullamcorper.'
}

export const Articles = () => {
  return (
    <>
      <Article
        photo={article.photo}
        title={article.title}
        date={article.data}
        text={article.text}
      />
      <Article
        photo={article.photo}
        title={article.title}
        date={article.data}
        text={article.text}
      />
      <Article
        photo={article.photo}
        title={article.title}
        date={article.data}
        text={article.text}
      />
      <ArticlesButton>
        CZYTAJ WIĘCEJ
      </ArticlesButton>
    </>
  )
}

export default Articles;
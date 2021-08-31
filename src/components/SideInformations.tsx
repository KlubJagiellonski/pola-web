import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Article } from '../domain/articles';
import { Device, margin } from '../styles/theme';
import { getTagsList } from '../utils/tags';
import ArticlesListPreview from './articles/list/ArticlesListPrewiev';
import DevelopmentSection from './DevelopmentSection';
import SocialMedia from './SocialMedia';
import TagsList from './tags/TagsList';

const Wrapper = styled.div`
  gap: ${margin.normal};
  display: flex;
  flex-direction: column;
`

const Title = styled.p`
  font-weight: bold;
`

const FirstSection = styled.p`
  @media ${Device.mobile} {
    display: none;
  }
`

const SecondSection = styled.p`
  display: flex;
  flex-direction: column;
  gap: ${margin.normal};

  @media ${Device.mobile} {
    flex-direction: column-reverse;
  }
`

interface ISideInformations {
  actualArticleId: string,
  articles: Article[]
}

const SideInformations: React.FC<ISideInformations> = ({ actualArticleId, articles }) => {
  const [articlesPreview, setArticlesPreview] = useState<Article[]>([])

  useEffect(() => {
    if (articles) {
      let art = articles.slice();
      for (let i = 0; i < art.length; i++) {
        if (art[i].id === actualArticleId) {
          art.splice(i, 1);
        }
      }
      if (art.length > 3) {
        art = art.slice(0, 3)
      }
      setArticlesPreview(art)
    }
  }, [articles]);

  return (
    <Wrapper>
      <FirstSection>
        <DevelopmentSection />
      </FirstSection>
      <SecondSection>
        <SocialMedia />
        <TagsList tag={articles && getTagsList(articles)} />
      </SecondSection>
      <Title>Zobacz także:</Title>
      <ArticlesListPreview articles={articlesPreview} />
    </Wrapper>
  )
}

export default SideInformations;
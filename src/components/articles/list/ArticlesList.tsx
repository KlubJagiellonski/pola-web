import React from 'react';
import styled from 'styled-components';
import { Article } from '../../../domain/articles';
import { ArticleBlock } from './ArticleBlock';
import { Device, margin, padding } from '../../../styles/theme';

const Wrapper = styled.div`
  grid-area: articles;

  @media ${Device.mobile} {
    padding: ${padding.normal};
    margin-bottom: ${margin.normal};
    padding-top: 0;
  }
`;

interface IArticlesList {
  articles?: Article[];
}

export const ArticlesList: React.FC<IArticlesList> = ({ articles }) => {
  return (
    <Wrapper>
      {articles &&
        articles.map((article: Article) => (
          <ArticleBlock
            id={article.id}
            key={article.id}
            title={article.title}
            slug={article.slug}
            imagePath={article.imagePath}
            date={article.date}
            subTitle={article.subTitle}
            tag={article.tag}
          />
        ))}
    </Wrapper>
  );
};

export default ArticlesList;

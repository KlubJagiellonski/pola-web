import React from 'react';
import styled from 'styled-components';
import { IArticle } from '../../domain/articles';
import { ArticleBlock } from './ArticleBlock';
import {Device, padding} from './../../styles/theme'

const Wrapper = styled.div`

  @media ${Device.mobile} {
    padding: 0 ${padding.big};
  }
`;

interface IArticlesList {
  articles?: IArticle[];
}

export const ArticlesList: React.FC<IArticlesList> = ({ articles }) => {
  return (
    <Wrapper>
      {articles &&
        articles.map((article: IArticle) => (
          <ArticleBlock
            key={article.id}
            photo={article.image}
            title={article.title}
            date={article.date}
            text={article.content}
          />
        ))}
    </Wrapper>
  );
};

export default ArticlesList;

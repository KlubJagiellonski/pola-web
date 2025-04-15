import styled from 'styled-components';

import React from 'react';

import { IArticlesTwoColumns } from 'posts/services/article-service';

import { ArticleBlock } from './ArticleBlock';

import { Device } from '@Styles/theme';

const Row = styled.div`
  display: flex;
  flex-direction: row;

  @media ${Device.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

const EmptyBlock = styled.div`
  width: 100%;
`;

interface IArticlesList {
  articles?: IArticlesTwoColumns[];
}

export const ArticlesList: React.FC<IArticlesList> = ({ articles }) => {
  return (
    <>
      {articles &&
        articles.map((article: IArticlesTwoColumns) => (
          <Row key={article.first.id}>
            <ArticleBlock
              id={article.first.id}
              title={article.first.title}
              slug={article.first.slug}
              imagePath={article.first.imagePath}
              date={article.first.date}
              subTitle={article.first.subTitle}
              tag={article.first.tag}
            />
            {article.second ? (
              <ArticleBlock
                id={article.second.id}
                title={article.second.title}
                slug={article.second.slug}
                imagePath={article.second.imagePath}
                date={article.second.date}
                subTitle={article.second.subTitle}
                tag={article.second.tag}
              />
            ) : (
              <EmptyBlock />
            )}
          </Row>
        ))}
    </>
  );
};

export default ArticlesList;

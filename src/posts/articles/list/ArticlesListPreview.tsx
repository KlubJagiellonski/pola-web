import { ArticleData } from 'posts';
import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { urls } from '@App/website';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';

import { ArticlePreview } from './ArticlePreview';

import { Device, margin, padding } from '@Styles/theme';

const Wrapper = styled.div`
  grid-area: articles;

  @media ${Device.mobile} {
    padding: ${padding.normal};
    margin-bottom: ${margin.normal};
  }
`;

const ArticlesButton = styled(PrimaryButton)`
  width: 100%;
  padding: ${padding.normal};
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`;

interface IArticlesList {
  articles?: ArticleData[];
}

export const ArticlesListPreview: React.FC<IArticlesList> = ({ articles }) => {
  return (
    <Wrapper>
      {articles &&
        articles.map((article: ArticleData) => (
          <ArticlePreview
            key={article.id}
            id={article.id}
            title={article.title}
            slug={article.slug}
            imagePath={article.imagePath}
            date={article.date}
            subTitle={article.subTitle}
            tag={article.tag}
          />
        ))}
      <Link to={urls.pola.news()}>
        <ArticlesButton label="ZOBACZ POPRZEDNIE ARTYKUŁY" styles={ButtonThemes[ButtonFlavor.RED]} />
      </Link>
    </Wrapper>
  );
};

export default ArticlesListPreview;

import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { getDate } from '@Utils/dates';

import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { Device, fontSize, margin } from '@Styles/theme';

const Wrapper = styled.div`
  margin-bottom: ${margin.normal};

  @media ${Device.mobile} {
    font-size: ${fontSize.small};
    margin-bottom: 0;
  }
`;

export const Title = styled(TitleSection)`
  padding: 0;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 24px;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
`;

const TextInfo = styled(Text)`
  @media ${Device.desktop} {
    display: none;
  }
`;

interface IArticleTitle {
  title: string;
  slug: string;
  tag?: string;
  date?: string;
}

const ArticleTitle: React.FC<IArticleTitle> = ({ title, slug, tag, date }) => {
  return (
    <Wrapper>
      <ArticleLink to={`/${slug}`}>
        <Title>{title}</Title>
      </ArticleLink>
      {tag && date && (
        <TextInfo>
          {tag} | {getDate(date)}
        </TextInfo>
      )}
    </Wrapper>
  );
};

export default ArticleTitle;

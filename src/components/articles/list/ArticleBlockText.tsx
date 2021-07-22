import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { Text, TitleSection } from '../../../styles/GlobalStyle.css';
import { Device, fontSize, margin, color } from '../../../styles/theme';
import { getDate } from '../../../utils/dates';
import Tag from '../../tags/Tag';

const ArticleTag = styled.div`
  margin-top: ${margin.big};
`;

const ArticleDate = styled(Text)`
  color: ${color.text.red};

  @media ${Device.mobile} {
    display: none;
  }
`;

const ArticleTitle = styled(TitleSection)`
  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`;

const ArticleText = styled(Text) <{ lines?: number }>`
   overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: ${(props) => props.lines};
   -webkit-box-orient: vertical;

  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
`

interface IArticleBlockText {
  title: string;
  slug: string;
  date?: string;
  text: string;
  lines?: number;
  category?: String;
}

export const ArticleBlockText: React.FC<IArticleBlockText> = ({ title, slug, date, text, lines, category }) => {
  return (
    <>
      <ArticleLink to={slug}>
        <ArticleTitle>{title}</ArticleTitle>
      </ArticleLink>

      <ArticleText lines={lines}>{text}</ArticleText>
      {date && <ArticleDate>{getDate(date)}</ArticleDate>}
      {category &&
        <ArticleTag>
          <Tag label={`${category}`} />
        </ArticleTag>
      }
    </>
  );
};

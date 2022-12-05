//import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

import React from 'react';

import { getDate } from '@Utils/dates';

import { ArticleImage } from './ArticleImage';

import { Text } from '@Styles/GlobalStyle.css';

const Title = styled.h1`
  padding: 0;
  margin: 0;
`;

interface IArticleHeader {
  title: string;
  subTitle: string;
  date: string;
  imageSrc: string;
  category?: string;
}

export const ArticleHeader: React.FC<IArticleHeader> = ({ title, subTitle, date, imageSrc, category }) => (
  <>
    <Title>{title}</Title>
    <Text>
      {category} | {getDate(date)}
    </Text>
    <p>{subTitle}</p>
    <ArticleImage title={`${title} - ${subTitle}`} imageSrc={imageSrc} fullSize={true} />
  </>
);

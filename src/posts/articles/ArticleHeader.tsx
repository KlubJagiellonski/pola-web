//import Img, { FluidObject } from 'gatsby-image';
import styled from 'styled-components';

import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { getDate } from '@Utils/dates';

import { Text } from '@Styles/GlobalStyle.css';

const Title = styled.h1`
  padding: 0;
  margin: 0;
`;

interface IArticleHeader {
  title: string;
  subTitle: string;
  date: string;
  fluid: any | any[];
  category?: string;
}

export const ArticleHeader: React.FC<IArticleHeader> = ({ title, subTitle, date, fluid, category }) => (
  <>
    <Title>{title}</Title>
    <Text>
      {category} | {getDate(date)}
    </Text>
    <p>{subTitle}</p>
    <GatsbyImage alt={`${title} - ${subTitle}`} image={getImage(fluid)} />
  </>
);

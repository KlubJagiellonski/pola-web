import { ArticleData } from 'posts';
import styled from 'styled-components';
import styledContainerQuery from 'styled-container-query';

import React from 'react';

import { ArticleImage } from '@Components/images/ArticleImage';

import ArticleContents from './ArticleContents';
import { ArticleDate, ArticleTag, ArticleText } from './ArticleContents.css';
import ArticleTitle from './ArticleTitle';
import { Title } from './ArticleTitle';

import { Device, color, fontSize, margin } from '@Styles/theme';

const ImageWrapper = styled.div`
  width: 50%;
  text-align: left;
  height: 100%;

  .gatsby-image-wrapper {
    div {
      padding-bottom: 100% !important;
    }
  }
`;

const Container = styledContainerQuery.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;

  @media ${Device.mobile} {
    min-height: 0;
  }

  &:container(max-width: 450px) {
    min-height: 0;

    ${ArticleTag} {
      display: none;
    }

    ${ArticleDate} {
      display: none;
    }

    ${ArticleText} {
      font-size: ${fontSize.tiny};
      -webkit-line-clamp: 3;
    }

    ${Title} {
      font-size: ${fontSize.tiny};
      -webkit-line-clamp: 2;
    }
  }
`;

const ArticleSection = styled.div`
  width: 50%;
  margin: 0 ${margin.normal};
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    width: 60%;
  }
`;

export const ArticlePreview: React.FC<ArticleData> = ({ imagePath, title, slug, date, subTitle, tag }) => {
  return (
    <Container color={color.background.white}>
      <ImageWrapper>{imagePath && <ArticleImage title={title} imageSrc={imagePath} />}</ImageWrapper>
      <ArticleSection>
        <ArticleTitle title={title} slug={slug} />
        <ArticleContents date={date} text={subTitle} tag={tag} />
      </ArticleSection>
    </Container>
  );
};

import { IArticleData } from 'posts';
import styled from 'styled-components';

import React from 'react';

import { ArticleImage } from 'posts/articles/ArticleImage';

import ArticleContents from './ArticleContents';
import ArticleTitle from './ArticleTitle';

import { Device, margin, padding } from '@Styles/theme';

const Wrapper = styled.div`
  position: relative;
  height: 16em;
  padding: ${margin.small};

  @media ${Device.mobile} {
    display: none;
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
    color: inherit;
    text-decoration: none;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const Sections = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
`;

const ImageSection = styled.div`
  flex: 3;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const TextSection = styled.div`
  flex: 4;
  padding: ${padding.normal};
  display: flex;
  flex-direction: column;
`;

const LatestArticle: React.FC<IArticleData> = ({ imagePath, title, slug, date, subTitle, tag }) => {
  return (
    <Wrapper>
      <Sections>
        <ImageSection>{imagePath && <ArticleImage title={title} imageSrc={imagePath} />}</ImageSection>
        <TextSection>
          <ArticleTitle title={title} slug={slug} tag={tag} date={date} />
          <ArticleContents date={date} text={subTitle} tag={tag} />
        </TextSection>
      </Sections>
    </Wrapper>
  );
};

export default LatestArticle;

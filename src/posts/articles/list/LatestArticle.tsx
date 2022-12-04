import { ArticleData } from 'posts';
import styled from 'styled-components';

import React from 'react';

import { ArticleImage } from '@Components/images/ArticleImage';

import ArticleContents from './ArticleContents';
import ArticleTitle from './ArticleTitle';

import { Device, color, margin, padding } from '@Styles/theme';

const Wrapper = styled.div`
  position: relative;
  background: ${color.background.gray};
  height: 16em;
  padding: ${margin.small};

  @media ${Device.mobile} {
    display: none;
  }
`;

const Image = styled.div`
  div {
    height: 16em !important;
    margin: ${margin.small};
    picture {
      img {
        height: auto !important;
      }
    }
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

const ImageSection = styled(Image)`
  flex: 3;
`;

const TextSection = styled.div`
  flex: 4;
  background: ${color.background.gray};
  padding: ${padding.normal};
  display: flex;
  flex-direction: column;
`;

const LatestArticle: React.FC<ArticleData> = ({ imagePath, title, slug, date, text, tag }) => {
  return (
    <Wrapper>
      <Sections>
        <ImageSection>{imagePath && <ArticleImage title={title} imageSrc={imagePath} />}</ImageSection>
        <TextSection>
          <ArticleTitle title={title} slug={slug} tag={tag} date={date} />
          <ArticleContents date={date} text={text} tag={tag} />
        </TextSection>
      </Sections>
    </Wrapper>
  );
};

export default LatestArticle;

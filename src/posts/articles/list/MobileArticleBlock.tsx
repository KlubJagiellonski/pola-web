import { ButtonFlavor, ButtonThemes } from '../../../components/buttons/Button';
import { ResponsiveImage } from '../../../components/images/ResponsiveImage';
import { Text, TitleSection, WrapperSection } from '../../../styles/GlobalStyle.css';
import { Device, color, margin } from '../../../styles/theme';
import { ArticleImage } from '../ArticleImage';
import styled from 'styled-components';

import React from 'react';

import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { ExternalLink } from 'utils/browser/links';
import { getDate } from 'utils/dates';

import ArticleContents from 'posts/articles/list/ArticleContents';

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

const TextInfo = styled(Text)`
  @media ${Device.desktop} {
    display: none;
  }
`;

const Wrapper = styled(WrapperSection)`
  display: flex;
  flex-direction: row;
  margin-bottom: ${margin.normal};

  @media ${Device.mobile} {
    min-height: 0;
    flex-direction: column-reverse;
  }
`;

const ArticleImageWrapper = styled.div<{ img?: string; smallWidth?: boolean }>`
  width: 50%;
  text-align: left;
  position: relative;
  height: ${(props) => (props.smallWidth ? '14em' : '100%')};
  overflow: hidden;

  .gatsby-image-wrapper {
    div {
      padding-bottom: 100% !important;
    }
  }

  @media ${Device.mobile} {
    width: 100%;

    margin: auto;
  }
`;

const ArticleAction = styled.div<{ smallWidth?: boolean }>`
  position: absolute;
  bottom: 0;
  right: ${(props) => (props.smallWidth ? '4%' : '1em')};
`;

const ArticleSection = styled.div`
  width: 50%;
  margin: 0;
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    width: 100%;
    margin-top: ${margin.small};
  }
`;

const ArticlesButton = styled(PrimaryButton)`
  width: 100%;
  margin: ${margin.normal} 0;

  @media ${Device.desktop} {
    display: none;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media ${Device.mobile} {
    p:first-child {
      -webkit-line-clamp: 8;
    }
  }
`;

interface IArticleBlock {
  title: string;
  subTitle: string;
  slug: string;
  imagePath?: string;
  date?: string;
  tag?: string;
  styles?: {
    smallWidth?: boolean;
  };
  externalLink?: boolean;
}

export const MobileArticleBlock: React.FC<IArticleBlock> = ({
  imagePath,
  title,
  slug,
  date,
  subTitle,
  tag,
  styles,
}) => {
  const showContent = false;
  return (
    <Wrapper color={color.background.white}>
      <ArticleImageWrapper {...styles}>
        {imagePath && <ArticleImage title={title} imageSrc={imagePath} />}
        <ArticleAction smallWidth={styles?.smallWidth}>
          <ExternalLink url={`/${slug}`}>
            <ArticlesButton label="CZYTAJ DALEJ" styles={ButtonThemes[ButtonFlavor.RED]} />
          </ExternalLink>
        </ArticleAction>
      </ArticleImageWrapper>
      <ArticleSection>
        <a href={`/${slug}`} target="_blank">
          <Title>{title}</Title>
        </a>
        {tag && date && (
          <TextInfo>
            {tag} | {getDate(date)}
          </TextInfo>
        )}
        {showContent && (
          <Contents>
            <ArticleContents date={date} text={subTitle} tag={tag} />
          </Contents>
        )}
      </ArticleSection>
    </Wrapper>
  );
};

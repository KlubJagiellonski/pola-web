import React from 'react';
import styled from 'styled-components';
import { ResponsiveImage } from '../../images/ResponsiveImage';
import { TitleSection, Text, WrapperSection } from '../../../styles/GlobalStyle.css';
import { Device, color, margin } from '../../../styles/theme';
import ArticleContents from './ArticleContents';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { ButtonThemes, ButtonFlavor } from '../../buttons/Button';
import { ExternalLink } from 'utils/browser/links';
import { getDate } from 'utils/dates';

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

const ArticleImage = styled.div<{ img?: string; smallWidth?: boolean }>`
  width: 50%;
  text-align: left;
  position: relative;

  .gatsby-image-wrapper {
    div {
      padding-bottom: 100% !important;
    }
  }

  @media ${Device.mobile} {
    width: ${(props) => (props.smallWidth ? '50%' : '100%')};
    margin: auto;
  }
`;

const ArticleSection = styled.div`
  width: 50%;
  margin: 0 ${margin.normal};
  display: flex;
  flex-direction: column;

  @media ${Device.mobile} {
    width: 100%;
    margin: ${margin.normal} 0;
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
  imagePath: string;
  date: string;
  tag: string;
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
  return (
    <Wrapper color={color.background.white}>
      <ArticleImage {...styles}>
        {imagePath && <ResponsiveImage imageSrc={imagePath} />}
        <div style={{ position: 'absolute', bottom: 0, right: '1em' }}>
          <ExternalLink url={slug}>
            <ArticlesButton label="CZYTAJ DALEJ" styles={ButtonThemes[ButtonFlavor.RED]} />
          </ExternalLink>
        </div>
      </ArticleImage>
      <ArticleSection>
        <a href={slug} target="_blank">
          <Title>{title}</Title>
        </a>
        {tag && date && (
          <TextInfo>
            {tag} | {getDate(date)}
          </TextInfo>
        )}
        <Contents>
          <ArticleContents date={date} text={subTitle} tag={tag} />
        </Contents>
      </ArticleSection>
    </Wrapper>
  );
};

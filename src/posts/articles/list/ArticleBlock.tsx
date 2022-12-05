import styled from 'styled-components';

import { Link } from 'gatsby';
import React from 'react';

import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';

import { ArticleImage } from 'posts/articles/ArticleImage';

import ArticleContents from './ArticleContents';
import ArticleTitle from './ArticleTitle';

import { WrapperSection } from '@Styles/GlobalStyle.css';
import { Device, color, margin } from '@Styles/theme';

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

export const ArticleBlock: React.FC<IArticleBlock> = ({ imagePath, title, slug, date, subTitle, tag, styles }) => {
  return (
    <Wrapper color={color.background.white}>
      <Link to={slug}>
        <ArticlesButton label="CZYTAJ DALEJ" styles={ButtonThemes[ButtonFlavor.RED]} />
      </Link>
      <ArticleImageWrapper {...styles}>
        {imagePath && <ArticleImage title={title} imageSrc={imagePath} />}
      </ArticleImageWrapper>
      <ArticleSection>
        <ArticleTitle title={title} slug={slug} tag={tag} date={date} />
        <Contents>
          <ArticleContents date={date} text={subTitle} tag={tag} />
        </Contents>
      </ArticleSection>
    </Wrapper>
  );
};

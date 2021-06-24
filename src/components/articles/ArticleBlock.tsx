import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image'
import {ButtonColor} from './../buttons/Button'
import { WrapperSection, Text, TitleSection } from '../../styles/GlobalStyle.css';
import {Device, fontSize, margin, color} from '../../styles/theme'
import {SecondaryButton } from '../buttons/SecondaryButton';
import { dateToString } from '../../utils/date/date';

const Wrapper = styled(WrapperSection)`
  display: flex;
  flex-direction: row;
  min-height: 16.5em;
  margin-bottom: 15px;

  @media ${Device.mobile}{
    min-height: 0;
  }
`;

const ArticleImage = styled.div<{ img?: string }>`
  width: 50%;
  text-align: left;
`;

const ArticleSection = styled.div`
  width: 50%;
  margin: 0 15px;

  @media ${Device.mobile} {
    width: 60%;
  }
`;

const ArticleButton = styled(SecondaryButton)`
  margin-top: ${margin.big};
  font-weight: 300;
  
  @media ${Device.mobile} {
    display: none;
    font-size: ${fontSize.tiny};
  }
`;

const ArticleDate = styled(Text)`
  color: ${color.text.red};

  @media ${Device.mobile} {
    display: none;
  }
`

const ArticleTitle = styled(TitleSection)`
  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`

const ArticleText = styled(Text)`
  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`

interface IArticleBlock {
  fluid?: any;
  title: string;
  date?: string;
  content: string;
}

const Content = (props: any) => {
  const { content, children } = props;

  if (content) {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  } else {
    return <div>{children}</div>;
  }
};

export const ArticleBlock: React.FC<IArticleBlock> = ({ fluid, title, date, content}) => {
  return (
    <Wrapper color={color.background.white}>
      <ArticleImage>{fluid && <Img fluid={fluid} />}</ArticleImage>
      <ArticleSection>
        <ArticleTitle>{title}</ArticleTitle>
        <Content content={content}/>
        {date && <ArticleDate>{dateToString(new Date(date))}</ArticleDate>}
        <ArticleButton label='TAG/KATEGORIA' color={ButtonColor.LightGray} fontSize={fontSize.small}/>
      </ArticleSection>
    </Wrapper>
  );
};

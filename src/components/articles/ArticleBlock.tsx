import React from 'react';
import { Wrapper, ArticleImage, ArticleSection, ArticleButton, ArticleDate, ArticleTitle, ArticleText } from './ArticleBlock.css';
import { color, fontSize } from '../../styles/theme';
import { ResponsiveImage } from '../../components/responsive-image';
import {ButtonColor} from './../buttons/Button'

interface IArticleBlock {
  photo?: string;
  title: string;
  date?: string;
  text: string;
}

export const ArticleBlock: React.FC<IArticleBlock> = ({ photo, title, date, text}) => {
  return (
    <Wrapper color={color.background.white}>
      <ArticleImage>{photo && <ResponsiveImage imageSrc={photo} />}</ArticleImage>
      <ArticleSection>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleText>{text}</ArticleText>
        {date && <ArticleDate>{date}</ArticleDate>}
        <ArticleButton label='TAG/KATEGORIA' color={ButtonColor.LightGray} fontSize={fontSize.small}/>
      </ArticleSection>
    </Wrapper>
  );
};

import React from 'react'
import styled from 'styled-components'
import { color, padding } from '../../../styles/theme';
import { ResponsiveImage } from '../../images/ResponsiveImage';
import { ArticleBlockText } from './ArticleBlockText';

interface IArticleBlock {
  title: string;
  slug: string;
  photo?: string;
  date?: string;
  text: string;
  category?: string;
}

const Wrapper = styled.div`
  height: 16em;
  position: relative;
`

const Image = styled.div`
  div{
    height: 16em !important;

    picture {
    img{
      height: auto !important;
      }
    }
  }
`

const Sections = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  display: flex;
`

const ImageSection = styled(Image)`
  flex: 3;
`

const TextSection = styled.div`
  flex: 4;
  background: ${color.background.transparency};
  padding: ${padding.normal};
`

const LatestArticle: React.FC<IArticleBlock> = ({ photo, title, slug, date, text, category }) => {
  return (
    <Wrapper>
      <Sections>
        <ImageSection>
          {photo && <ResponsiveImage imageSrc={photo} />}
        </ImageSection>
        <TextSection>
          <ArticleBlockText
            title={title}
            slug={slug}
            date={date}
            text={text}
            lines={4}
            category={category}
          />
        </TextSection>
      </Sections>
      <Image>
        {photo && <ResponsiveImage imageSrc={photo} />}
      </Image>
    </Wrapper>
  )
}

export default LatestArticle;
import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PageLayout } from '../layout/PageLayout';
import SEO from '../layout/seo';
import { IArticle } from '../domain/articles';
import { connect } from 'react-redux';
import ArticlesList from '../components/articles/ArticlesList';
import { IPolaState } from '../state/types';
import { PageSection } from '../layout/PageSection';
import { TitleSection } from '../styles/GlobalStyle.css';
import {margin, color} from './../styles/theme'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${margin.veryBig};

  div{
    flex: 1;
  }
`

const ArticlesSlider = styled(Slider)`
  margin-bottom: ${margin.big};

  .slick-dots li.slick-active button:before {
    color: ${color.button.red} !important;
  }
`

const ArticlesPage = styled.div`
  min-height: 54em;
`

interface NewsPage {
  articles?: IArticle[];
}

interface IArticles {
  first: IArticle[];
  second: IArticle[];
}

const NewsPage: React.FC<NewsPage> = (props) => {
  const [articles, setArticles ] = useState<IArticles[]>([]);

  useEffect(() => {
    if(props.articles){
      props.articles.sort((a,b) => {
        if(b.date && a.date){
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else{
          return 0;
        }      
      });
      const articles: IArticles[] = [];
      let firstColumn: IArticle [] = [];
      let secondColumn: IArticle [] = [];
      let actualColumn: number = 1;

      for(let i=0; i<props.articles.length; i++){        
        if(i % 6 == 0){
          actualColumn = 1;
        } else if(i % 3 == 0) {
          actualColumn = 2;
        }

        if(actualColumn === 1){
          firstColumn.push(props.articles[i]);
          actualColumn = 2;
        } else {
          secondColumn.push(props.articles[i]);
          actualColumn = 1;
        }

        if((firstColumn.length+secondColumn.length)===6){
          articles.push({first: firstColumn.slice(), second: secondColumn.slice()});
          firstColumn = [];
          secondColumn = [];
        }
      }
      if((firstColumn.length+secondColumn.length)!==6){
        articles.push({first: firstColumn.slice(), second: secondColumn.slice()});
      }
      setArticles(articles);
    }
  }, [props.articles]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToScroll: 1,
    arrows: false,
  }

  return(
    <PageLayout>
      <SEO title="Pola Web | Aktualności" />
      <PageSection>
        <TitleSection>Aktualności</TitleSection>
        <div>
        {articles &&
          <ArticlesSlider {...settings}>
          {articles.map((el, id) => (
            <ArticlesPage key={`article_${id}`}>
              <Wrapper>
                <ArticlesList articles={el.first}/>
                <ArticlesList articles={el.second}/>
              </Wrapper>
            </ArticlesPage>
          ))}
          </ArticlesSlider>
          }
        </div>
      </PageSection>
    </PageLayout>
  )
};

// export default connect((state: IPolaState) => ({
//   articles: state.articles.data,
// }))(NewsPage);

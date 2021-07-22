import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { margin, Device } from '../styles/theme'
import ReactPaginate from "react-paginate";
import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { Article } from '../domain/articles';
import { connect, useDispatch } from 'react-redux';
import ArticlesList from '../components/articles/list/ArticlesList';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import { PageSection } from '../layout/PageSection';
import './../components/Pagination.css'
import LatestArticle from '../components/articles/list/LatestArticle';
import SocialMedia from '../components/SocialMedia';
import TagsList from '../components/tags/TagsList';
import { ArrayParam, withDefault, useQueryParams, NumberParam } from "use-query-params";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: ${margin.veryBig};

  div{
      flex: 1;
    }

  @media ${Device.mobile} {
    flex-direction: column;
  }
`

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.p`
  margin-top: ${margin.veryBig};
  font-weight: bold;
`

const InfoSection = styled.div`
    display: flex;
    margin: ${margin.normal} 0;

    div {
      flex: 1;
    }
`

interface IArticles {
  first: Article[];
  second: Article[];
}

interface NewsPage {
  location?: Location;
  articles?: Article[];
}

interface IQuery {
  tags: string[],
  id: number
}

const NewsPage: React.FC<NewsPage> = ({ location, articles }) => {
  const [sortedArticles, setArticles] = useState<IArticles[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [category, setCategory] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [query, setQuery] = useQueryParams<IQuery>({
    tags: withDefault(ArrayParam, []),
    id: NumberParam
  });

  useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.NEWS));
    }
  }, []);

  useEffect(() => {
    if (articles) {
      const cat: string[] = articles.map((el: Article) => { return el.category }).sort()
      const unique = new Set(cat);
      setCategory(Array.from(unique))

      const sortedArticles: IArticles[] = [];
      let firstColumn: Article[] = [];
      let secondColumn: Article[] = [];
      let currentColumn: number = 1;
      let art: Article[] = articles.slice();
      art.shift();

      if (query.tags.length > 0) {
        art = art.filter((article: Article) => query.tags.includes(article.category))
      }

      for (let i = 0; i < art.length; i++) {
        if (i % 6 === 0) {
          currentColumn = 1;
        } else if (i % 3 === 0) {
          currentColumn = 2;
        }

        if (currentColumn === 1) {
          firstColumn.push(art[i]);
          currentColumn = 2;
        } else {
          secondColumn.push(art[i]);
          currentColumn = 1;
        }

        if ((firstColumn.length + secondColumn.length) === 6) {
          sortedArticles.push({ first: firstColumn.slice(), second: secondColumn.slice() });
          firstColumn = [];
          secondColumn = [];
        }
      }
      if ((firstColumn.length + secondColumn.length) !== 6) {
        sortedArticles.push({ first: firstColumn.slice(), second: secondColumn.slice() });
      }
      setArticles(sortedArticles.slice());
      setPageCount(sortedArticles.length);
      if (query.id === undefined || query.id >= sortedArticles.length) {
        setCurrentPage(0)
      } else {
        setCurrentPage(query.id)
      }
    }
  }, [articles, location]);

  const handlePageClick = ({ selected: selectedPage }) => {
    setQuery(
      { tags: query.tags, id: selectedPage },
      'push'
    )
  }

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Aktualności" />
      <PageSection>
        <Title>Aktualności</Title>
        {
          articles &&
          <LatestArticle
            key={articles[0].id}
            title={articles[0].title}
            slug={articles[0].slug}
            photo={articles[0].imagePath}
            date={articles[0].date}
            text={articles[0].subTitle}
            category={articles[0].category}
          />
        }
        {sortedArticles && sortedArticles.length > 0 &&
          <Wrapper>
            <ArticlesList articles={sortedArticles[currentPage].first} />
            <ArticlesList articles={sortedArticles[currentPage].second} />
          </Wrapper>
        }
        <PaginationSection>
          {pageCount > 0 &&
            <ReactPaginate
              previousLabel={"poprzednia"}
              nextLabel={"następna"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"pagination__link"}
              nextLinkClassName={"pagination__link"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
              forcePage={currentPage}
            />
          }
        </PaginationSection>
        <InfoSection>
          <TagsList category={category} activeTags={query.tags} />
          <SocialMedia />
        </InfoSection>
      </PageSection>
    </PageLayout>
  );
};
export default connect((state: IPolaState) => ({
  articles: state.articles.data,
}))(NewsPage);

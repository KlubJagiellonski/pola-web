import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { ArticleData } from '@Domain/articles';

import '@Components/Pagination.css';

import { IArticlesTwoColumns, getArticlesTwoColumns } from 'posts/services/article-service';

import { ArticleBlock } from './ArticleBlock';
import ArticlesList from './ArticlesList';
import LatestArticle from './LatestArticle';

import { Device, margin, padding } from '@Styles/theme';

const Wrapper = styled.div`
  margin-top: ${margin.veryBig};

  @media ${Device.mobile} {
    margin-top: 0;
    padding: ${padding.normal};
    margin-bottom: ${margin.normal};
    padding-top: 0;
    display: flex;
    flex-direction: column;
  }
`;

const PaginationSection = styled.div`
  display: flex;
  justify-content: center;
`;

const FirstArticle = styled.div<{ inVisible?: boolean }>`
  margin-top: ${margin.veryBig};
  margin-left: ${margin.normal};
  margin-right: ${margin.normal};

  @media ${Device.desktop} {
    display: none;
  }
`;

interface NewsPage {
  articles?: ArticleData[];
  query: IQuery;
  onPageSelected: (page: number) => void;
}

const NewsPageArticles: React.FC<NewsPage> = ({ articles, query, onPageSelected }) => {
  if (!articles) {
    console.warn('No articles to show');
    return null;
  }

  const isAnyTagSelected = query.tags && query.tags.length > 0;
  const visibleArticles = isAnyTagSelected
    ? articles.filter((article: ArticleData) => query.tags.includes(article.urlTag))
    : articles;

  const data = visibleArticles.slice();
  const latestArticleData = data.shift();
  const articlePages = getArticlesTwoColumns(data);
  const pageCount = articlePages.length;

  const handlePageClick = ({ selected }) => {
    onPageSelected(selected + 1);
  };

  return (
    <>
      {latestArticleData && <LatestArticle {...latestArticleData} />}
      {latestArticleData && (
        <FirstArticle>
          <ArticleBlock {...latestArticleData} />
        </FirstArticle>
      )}
      {articlePages && articlePages.length > 0 && (
        <Wrapper>
          <ArticlesList articles={articlePages[query.page - 1]} />
        </Wrapper>
      )}
      <PaginationSection>
        {pageCount > 0 && (
          <ReactPaginate
            previousLabel={'poprzednia'}
            nextLabel={'następna'}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link'}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
            forcePage={query.page - 1}
          />
        )}
      </PaginationSection>
    </>
  );
};

export default NewsPageArticles;

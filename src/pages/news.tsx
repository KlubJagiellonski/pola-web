import styled from 'styled-components';

import {navigate, PageProps} from 'gatsby';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from '@App/website';

import '@Components/Pagination.css';
import Placeholder from '@Components/Placeholder';
import SocialMedia from '@Components/social-media/SocialMedia';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import TagsList from '../posts/tags/TagsList';
import NewsPageArticles from 'posts/articles/list/NewsPagesArticles';
import { buildArticlesQuery, useArticlesParams } from 'posts/services/article-service';
import { getUniqueTags } from 'posts/services/url-service';

import { Device, margin } from '@Styles/theme';

const Title = styled.p`
  margin-top: ${margin.veryBig};
  font-weight: bold;

  @media ${Device.mobile} {
    display: none;
  }
`;

const InfoSection = styled.div`
  display: flex;
  margin: ${margin.normal} 0;

  div {
    flex: 1;
  }

  @media ${Device.mobile} {
    margin: ${margin.normal} ${margin.normal};
    flex-direction: column;
  }
`;

interface INewsPage extends PageProps<any> {}

export type Action = { type: 'setTag'; payload: string[] } | { type: 'setPage'; payload: number };

const NewsPage: React.FC<INewsPage> = ({ location }) => {
  const articlesData = useSelector((state: IPolaState) => state.articles.data);
  const queryParams = useArticlesParams(false, location);
  const tags = getUniqueTags(articlesData);

  useEffect(() => {
    window.document.getElementById('layout-container')?.scrollTo(0, 0);
  }, [articlesData]);

  const navigateToPage = (page: number) => {
    const url = buildArticlesQuery({
      ...queryParams,
      page,
    });
    if (url) {
      navigate(url);
    }
  };
  const selectTag = (tag: string) => {
    const url = buildArticlesQuery({
      ...queryParams,
      tags: [...queryParams.tags, tag],
    });
    if (url) {
      navigate(url);
    }
  };
  const unselectTag = (tag: string) => {
    const url = buildArticlesQuery({
      ...queryParams,
      tags: queryParams.tags.filter((t: string) => t != tag),
    });
    if (url) {
      navigate(url);
    }
  };

  return (
    <PageLayout location={location} page={PageType.NEWS}>
      <SEOMetadata pageTitle="Aktualności" />
      <Placeholder text="Aktualności" />
      <PageSection>
        {articlesData && (
          <NewsPageArticles articles={articlesData} query={queryParams} onPageSelected={navigateToPage} />
        )}
        <InfoSection>
          {articlesData && (
            <TagsList
              availableTags={tags}
              activeTags={queryParams.tags}
              onTagSelected={selectTag}
              onTagUnselected={unselectTag}
            />
          )}
          <SocialMedia />
        </InfoSection>
      </PageSection>
    </PageLayout>
  );
};

export default NewsPage;

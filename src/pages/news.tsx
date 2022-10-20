import styled from 'styled-components';
import { ArrayParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQueryParamString } from 'react-use-query-param-string';

import { GatsbyPage } from '@App/generics';
import { IPolaState } from '@App/state';
import { PageType } from '@App/website';
import { ArticleData } from '@Domain/articles';

import '@Components/Pagination.css';
import Placeholder from '@Components/Placeholder';
import SocialMedia from '@Components/social-media/SocialMedia';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import NewsPageArticles from '../posts/articles/list/NewsPagesArticles';
import TagsList from '../posts/tags/TagsList';
import { getTagsList } from 'posts/services/article-service';

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

interface INewsPage extends GatsbyPage {}

interface IQuery {
  tags?: string[];
  id?: number;
}

const NewsPage: React.FC<INewsPage> = ({ location, articles }) => {
  const articledData = useSelector((state: IPolaState) => state.articles.data);
  const [tag, setTag] = useState<string[]>([]);
  const [query, setQuery] = useQueryParams<IQuery>({
    tags: withDefault(ArrayParam, ['a', 'b', 'c']),
    id: NumberParam,
  });
  // const [query, setQuery] = useQueryParamString<IQuery>({
  //   tags: withDefault(ArrayParam, ['a', 'b', 'c']),
  //   id: NumberParam,
  // });

  useEffect(() => {
    if (articles) {
      setTag(getTagsList(articles));
    }

    // commented as this line break NEWS page
    //window.document.getElementById('layout-container')?.scrollTo(0, 0);
  }, [articles, query]);

  return (
    <PageLayout location={location} page={PageType.NEWS}>
      <SEOMetadata pageTitle="Aktualności" />
      <Placeholder text="Aktualności" />
      <PageSection>
        <NewsPageArticles articles={articledData} query={query} setQuery={setQuery} />
        <InfoSection>
          <TagsList tag={tag} activeTags={query.tags} />
          <SocialMedia />
        </InfoSection>
      </PageSection>
    </PageLayout>
  );
};

export default INewsPage;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { margin, Device } from '@Styles/theme';
import { PageLayout } from '@Layout/PageLayout';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { Article } from '@Domain/articles';
import { connect, useDispatch } from 'react-redux';
import { IPolaState } from '@State/types';
import { LoadBrowserLocation, SelectActivePage } from '@State/app/app-actions';
import { PageType } from '@Domain/website';
import { PageSection } from '@Layout/PageSection';
import '@Components/Pagination.css';
import SocialMedia from '@Components/social-media/SocialMedia';
import TagsList from '../posts/tags/TagsList';
import { ArrayParam, withDefault, useQueryParams, NumberParam } from 'use-query-params';
import { getTagsList } from '@Utils/tags';
import NewsPageArticles from '../posts/articles/list/NewsPagesArticles';
import Placeholder from '@Components/Placeholder';

import { useQueryParamString } from 'react-use-query-param-string';

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

interface NewsPage {
  location?: Location;
  articles?: Article[];
}

interface IQuery {
  tags?: string[];
  id?: number;
}

const NewsPage: React.FC<NewsPage> = ({ location, articles }) => {
  const [tag, setTag] = useState<string[]>([]);
  const dispatch = useDispatch();
  const [query, setQuery] = useQueryParams<IQuery>({
    tags: withDefault(ArrayParam, ['a', 'b', 'c']),
    id: NumberParam,
  });
  // const [query, setQuery] = useQueryParamString<IQuery>({
  //   tags: withDefault(ArrayParam, ['a', 'b', 'c']),
  //   id: NumberParam,
  // });

  useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.NEWS));
    }
  }, []);

  useEffect(() => {
    if (articles) {
      setTag(getTagsList(articles));
    }

    // commented as this line break NEWS page
    //window.document.getElementById('layout-container')?.scrollTo(0, 0);
  }, [articles, query]);

  return (
    <PageLayout>
      <SEOMetadata pageTitle="Aktualności" />
      <Placeholder text="Aktualności" />
      <PageSection>
        <NewsPageArticles articles={articles} query={query} setQuery={setQuery} />
        <InfoSection>
          <TagsList tag={tag} activeTags={query.tags} />
          <SocialMedia />
        </InfoSection>
      </PageSection>
    </PageLayout>
  );
};
export default connect((state: IPolaState) => ({
  articles: state.articles.data,
}))(NewsPage);

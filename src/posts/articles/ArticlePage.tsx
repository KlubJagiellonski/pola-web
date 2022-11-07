import { PageType } from 'app/website';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { IPolaState } from '@App/state';
import { ArticleData } from '@Domain/articles';
import { FriendData } from '@Domain/friends';

import SideInformations from '@Components/SideInformations';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { ArticleHeader } from './ArticleHeader';

import { Device, margin } from '@Styles/theme';
import { IArticleNode } from 'domain/articles';

const Content = (props: any) => {
  const { html, children } = props;

  if (html) {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  } else {
    return <div>{children}</div>;
  }
};

const Wrapper = styled.div`
  display: flex;
  gap: ${margin.veryBig};
  margin-top: ${margin.veryBig};

  @media ${Device.mobile} {
    display: inline;
    gap: 0;
  }
`;

const FirstColumn = styled.div`
  flex: 3;
  flex-basis: 0;

  @media ${Device.mobile} {
    margin-top: ${margin.veryBig};
  }
`;

const SecondColumn = styled.div`
  flex: 1;
  flex-basis: 0;
`;

interface IArticlePage {
  article: IArticleNode;
  articles: ArticleData[];
  friends: FriendData[];
  location?: Location;
  author?: any;
  slug?: string;
  facebook?: any;
  cover?: any;
}

const ArticlePage = (props: IArticlePage) => {
  const { article, articles, friends } = props;
  const { frontmatter } = article;
  const { title, subTitle, category } = frontmatter;
  const date = article.fields.prefix;
  const html = article.html;
  const fluid = article.frontmatter.cover.childImageSharp.fluid;
  // const title = ((article || {}).frontmatter || {}).title;
  // const subTitle = ((article || {}).frontmatter || {}).subTitle;
  // const category = ((article || {}).frontmatter || {}).category;
  // const date = ((article || {}).fields || {}).prefix;
  // const html = (article || {}).html;
  // const fluid = ((article || {}).frontmatter || {}).cover.childImageSharp.fluid;

  return (
    <PageLayout location={props.location} page={PageType.ARTICLE}>
      <SEOMetadata pageTitle={title} image={fluid.src} />
      <PageSection>
        <Wrapper>
          <FirstColumn>
            <PageSection>
              <ArticleHeader title={title} subTitle={subTitle} date={date} fluid={fluid} category={category} />
            </PageSection>
            <PageSection>
              <Content html={html} />
            </PageSection>
          </FirstColumn>
          <SecondColumn>
            <SideInformations actualArticleId={article.id} articles={articles} friends={friends} />
          </SecondColumn>
        </Wrapper>
      </PageSection>
    </PageLayout>
  );
};

export default connect(
  (state: IPolaState) => ({
    location: state.app.location,
    articles: state.articles.data,
    friends: state.friends.data,
  }),
  {}
)(ArticlePage);

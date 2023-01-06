import { useLocation } from '@reach/router';
import { IFriendData } from 'friends';
import { IArticleData } from 'posts';
import { IArticleNode } from 'posts';
import styled from 'styled-components';

import React from 'react';
import { connect, useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import SideInformations from '@Components/SideInformations';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { ArticleHeader } from './ArticleHeader';

import { Device, margin } from '@Styles/theme';

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
  pageContext: any;
}

const ArticlePage = (props: IArticlePage) => {
  const { article, pageContext } = props;
  const { frontmatter, fields, html } = article;
  const { relativePath: imageSrc } = frontmatter.cover;
  const { title, subTitle, category } = frontmatter;
  const date = fields.prefix;
  const location = useLocation();
  const articles = useSelector((state: IPolaState) => state.articles.data);
  const friends = useSelector((state: IPolaState) => state.friends.data);

  return (
    <PageLayout location={location} page={PageType.ARTICLE}>
      <SEOMetadata pageTitle={title} image={imageSrc} />
      <PageSection>
        <Wrapper>
          <FirstColumn>
            <PageSection>
              <ArticleHeader title={title} subTitle={subTitle} date={date} imageSrc={imageSrc} category={category} />
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

export default ArticlePage;

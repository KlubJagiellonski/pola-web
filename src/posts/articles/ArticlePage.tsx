import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData } from '@contentful/rich-text-types';
import { useLocation } from '@reach/router';
import { IFriendData } from 'friends';
import { IArticleData } from 'posts';
import { IArticleNode } from 'posts';
import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import SideInformations from '@Components/SideInformations';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { decodeHtml } from '@Utils/strings';

import { ArticleHeader } from './ArticleHeader';

import { Device, margin } from '@Styles/theme';
import { Script } from 'gatsby';

const ContenttWrapper = styled.div`
  img {
  display: block;
  max-width: 100% !important;
  height: auto !important;
  margin: 1.5rem auto !important;
  }

  figure img {
  max-width: 700px;
  width: 100%;
  }

  blockquote {
  margin: 1.5rem 0;
  padding-left: 1rem;
  border-left: 4px solid #d8152f;
  font-style: italic;
  color: #444;
 }
`;

const Content = (props: any) => {
  const { html, children } = props;
  const body = JSON.parse(html.raw);

  const findAsset = (id: string) =>
    html.references.find((el: any) => el?.contentful_id && el.contentful_id === id);

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const asset = findAsset(node.data.target.sys.id);
        if (!asset) return '';

        const url = asset.url;
        const title = asset.title || '';

        if (url.match(/\.(wmv|mp4)$/i)) {
          return `
            <video controls style="display:block;max-width:100%;height:auto;margin:1.5rem auto;">
              <source src="${url}" />
              Your browser does not support the video tag.
            </video>
          `;
        }

        return `<img src="${url}" alt="${title}" />`;
      },
    },
  };

  if (html) {
    return <ContenttWrapper dangerouslySetInnerHTML={{ __html: decodeHtml(documentToHtmlString(body, options)) }} />;
  } else {
    return <ContenttWrapper>{children}</ContenttWrapper>;
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
}

const ArticlePage: React.FC<IArticlePage> = (props) => {
  const { article } = props;
  const { title, subTitle, category, date, html } = article;
  const { url: imageSrc } = article.cover;
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
      <Script src="https://nowe.platnosci.ngo.pl/campaign.js"></Script>
    </PageLayout>
  );
};

export default ArticlePage;

import { graphql } from "gatsby";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData } from '@contentful/rich-text-types';
import { useLocation } from '@reach/router';
import { IArticleNode } from 'posts';
import styled from 'styled-components';

import React from 'react';

import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { decodeHtml } from '@Utils/strings';


import { Device, margin } from '@Styles/theme';
import { Script } from 'gatsby';
import { ArticleHeader } from "posts/articles/ArticleHeader";
import { WebViewLayout } from "@Layout/WebViewLayout";

const ContenttWrapper = styled.div`
  img {
    max-width: 100%;
  }

  blockquote{
    margin: 0;
    border-left: 3px solid #d8152f;
    padding-left: 1rem;
  }
`;

const Content = (props: any) => {
  const { html, children } = props;
  const body = JSON.parse(html.raw);

  const findImg = (id: string) => html.references.find((el: any) => el?.contentful_id && el.contentful_id === id);

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const image = findImg(node.data.target.sys.id);
        return `<img src=${image.url} alt=${image.title}/>`;
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

const ArticlePage: React.FC<IArticlePage> = (props: any) => {
  const { title, subTitle, category, date, html } = props.data.allContentfulPosts.nodes[0];
  const { url: imageSrc } = props.data.allContentfulPosts.nodes[0].cover;

  return (
    <WebViewLayout>
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
        </Wrapper>
      </PageSection>
      <Script src="https://nowe.platnosci.ngo.pl/campaign.js"></Script>
    </WebViewLayout>
  );
};

export default ArticlePage;

export const query = graphql`
  query LatestPost {
    allContentfulPosts(sort: { fields: date, order: DESC }, limit: 1) {
      nodes {
        title
        subTitle
        date
        category
        cover {
          url
        }
        html {
          raw
          references {
            ... on ContentfulAsset {
              contentful_id
              url
              title
            }
          }
        }
      }
    }
  }
`;

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { IArticleNode } from 'posts';
import styled from 'styled-components';

import React from 'react';
import { useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType } from 'app/website';

import SideInformations from '@Components/SideInformations';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { decodeHtml } from '@Utils/strings';

import { ArticleHeader } from './ArticleHeader';

import { Device, margin } from '@Styles/theme';

const ContenttWrapper = styled.div`
  img {
    max-width: 100%;
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
  location: Location
}

const ArticlePage: React.FC<IArticlePage> = (props) => {
  const { article } = props;
  const { title, subTitle, category, date, html } = article;
  const { url: imageSrc } = article.cover;
  const location = props.location
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

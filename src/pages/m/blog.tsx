import styled from 'styled-components';
import { Device, color, fontSize, margin } from 'styles/theme';

import React, { useEffect } from 'react';
import { ConnectedProps, connect, useDispatch } from 'react-redux';

import { IPolaState } from '@App/state';
import { loadBrowserLocation, selectActivePage } from '@App/state/app-reducer';
import { PageType, urls } from '@App/website';

import { ButtonFlavor, ButtonThemes } from 'components/buttons/Button';
import { SecondaryButton } from 'components/buttons/SecondaryButton';
import { PageSection } from 'layout/PageSection';
import { WebViewLayout } from 'layout/WebViewLayout';
import SEOMetadata from 'utils/browser/SEOMetadata';

import { MobileFriendsCarousel } from 'friends/components/MobileFriendsCarousel';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import { MobileArticleBlock } from 'posts/articles/list/MobileArticleBlock';

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${margin.small};
  margin-top: 0;
  margin-bottom: 1em;
  padding: 1em 0;
`;

const Button = styled(SecondaryButton)`
  text-transform: capitalize;
  font-weight: bold;
  min-width: 300px;
`;

const ButtonWhiteRed = styled(Button)`
  border-color: ${color.border.grey};
`;

const ButtonRed = styled(Button)`
  border-color: ${color.background.red};
`;

const MobileNewsletterContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 0;
  padding: 0.5em 0;
`;

const connector = connect(
  (state: IPolaState) => {
    const { newsletter, articles, friends } = state;
    return {
      newsletterStatus: newsletter.status,
      follower: newsletter.status !== 'initial' ? newsletter.follower : undefined,
      articles: articles.data,
      friends: friends.data,
    };
  },
  {
    subscribeEmail: newsletterDispatcher.requestSubscriptionForEmail,
    clearForm: newsletterDispatcher.clearSubscriptionFormData,
  }
);

type INewsPage = ConnectedProps<typeof connector> & {
  location?: Location;
};

const BlogPage: React.FC<INewsPage> = (props) => {
  const { location, subscribeEmail, clearForm, newsletterStatus, follower } = props;
  const dispatch = useDispatch();
  const newestArticle = props.articles?.[0];

  useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(PageType.NEWS));
    }
  }, []);

  return (
    <WebViewLayout>
      <SEOMetadata pageTitle="blog" />
      <PageSection>
        {newestArticle && (
          <MobileArticleBlock
            key={newestArticle.id}
            title={newestArticle.title}
            slug={newestArticle.slug}
            imagePath={newestArticle.imagePath}
            date={newestArticle.date}
            subTitle={newestArticle.subTitle}
            tag={newestArticle.tag}
            styles={{
              smallWidth: true,
            }}
          />
        )}
      </PageSection>
      <PageSection styles={{ backgroundColor: color.background.gray }}>
        <MobileNewsletterContainer className="newsletter-container">
          <SubscribeDialog
            status={newsletterStatus}
            follower={follower}
            onSubmit={subscribeEmail}
            onClear={clearForm}
            isInitiallyExpanded={false}
            styles={{ isMobile: true }}
          />
        </MobileNewsletterContainer>
      </PageSection>
      <PageSection>
        <ButtonSection>
          <a
            href={'https://docs.google.com/forms/d/e/1FAIpQLSfJ14U66y_Z_thn9wiUHaBGOfKlZNhL4BGYuHjO2tJuzXi9gQ/viewform'}
            target="_blank">
            <ButtonRed
              label="Dodaj firmę"
              styles={{ ...ButtonThemes[ButtonFlavor.RED], fontSize: fontSize.normal }}
              fontSize={fontSize.normal}
            />
          </a>
          <a href={'/m/business?value=audyt-i-dzien-polskiego-produktu'}>
            <ButtonWhiteRed
              label="Sprawdź ofertę dla firm"
              styles={{ ...ButtonThemes[ButtonFlavor.WHITE_RED], fontSize: fontSize.normal }}
              fontSize={fontSize.normal}
            />
          </a>
        </ButtonSection>
      </PageSection>
      <PageSection styles={{ marginBottom: '2em' }}>
        <MobileFriendsCarousel friends={props.friends} />
      </PageSection>
    </WebViewLayout>
  );
};
export default connector(BlogPage);

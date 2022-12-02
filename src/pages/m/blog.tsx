import { MobileArticleBlock } from 'components/articles/list/MobileArticleBlock';
import { ButtonThemes, ButtonFlavor } from 'components/buttons/Button';
import { SecondaryButton } from 'components/buttons/SecondaryButton';
import { MobileFriendsCarousel } from 'components/friends/MobileFriendsCarousel';
import { PageType, urls } from 'domain/website';
import { PageSection } from 'layout/PageSection';
import { WebViewLayout } from 'layout/WebViewLayout';
import { SubscribeDialog } from 'newsletter/components/SubscribeDialog';
import { newsletterDispatcher } from 'newsletter/state/newsletter-dispatcher';
import React, { useEffect } from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import { LoadBrowserLocation, SelectActivePage } from 'state/app/app-actions';
import { IPolaState } from 'state/types';
import styled from 'styled-components';
import { color, Device, fontSize, margin } from 'styles/theme';
import SEOMetadata from 'utils/browser/SEOMetadata';

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
  padding-top: 1rem;
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
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.NEWS));
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
              smallWidth: false,
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
            isInitiallyExpanded={true}
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
          <a href={'https://www.pola-app.pl/business?value=audyt-i-dzien-polskiego-produktu'} target="_blank">
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

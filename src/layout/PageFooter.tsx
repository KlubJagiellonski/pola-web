import React from 'react';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { color, Device, fontSize, padding, pageWidth, margin } from '../styles/theme';
import { urls } from '../domain/website';
import { Facebook, Instagram, Twitter } from '../components/social-media/Icons';
import { TextExternalLink, TextLink } from '../utils/browser/links';

import LogoWhite from '../assets/logo/pola-white.svg';
import { SubscribeDialog } from '../newsletter/components/SubscribeDialog';
import { IPolaState } from '../state/types';
import { newsletterDispatcher } from '../newsletter/state/newsletter-dispatcher';

const FooterContainer = styled.footer`
  background-color: ${color.background.dark};
  color: ${color.text.light};
  margin: 0 auto;
  width: 100%;
  padding-top: ${padding.big};
  padding-bottom: ${padding.big};

  .footer-content {
    display: flex;
    flex-flow: row nowrap;
    margin: 0 auto;

    @media ${Device.Desktop} {
      max-width: ${pageWidth};
    }

    .sections {
      flex: 1 1 100%;
      display: flex;
      padding: 0;
      margin: 0;
    }

    @media ${Device.mobile} {
      .sections {
        flex-flow: column;
        gap: 0;
      }
    }

    @media ${Device.desktop} {
      .sections {
        flex-flow: row nowrap;
        gap: ${padding.normal};
      }
    }
  }
`;

const connector = connect(
  (state: IPolaState) => {
    const { newsletter } = state;
    return {
      newsletterStatus: newsletter.status,
    };
  },
  {
    subscribeEmail: newsletterDispatcher.subscribeEmail,
  }
);

type PageFooterProps = ConnectedProps<typeof connector> & {};

const FlexHorizontal = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
`;

const PageFooter: React.FC<PageFooterProps> = ({ newsletterStatus, subscribeEmail }) => {
  return (
    <FooterContainer>
      <FlexHorizontal>
        <SubscribeDialog status={newsletterStatus} onSubmit={subscribeEmail} />
      </FlexHorizontal>
      <div className="footer-content">
        <FooterSection>
          <div className="logo">
            <img src={LogoWhite} />
          </div>
        </FooterSection>

        <div className="sections">
          <FooterSection title="Informacje">
            <TextLink label="Home" href={urls.pola.home()} />
            <TextLink label="Aktualności" href={urls.pola.news()} />
            <TextLink label="O Poli" href={urls.pola.about()} />
          </FooterSection>
          <FooterSection title="Działaj z nami">
            <TextExternalLink label="Wesprzyj aplikację" url={urls.external.links.polaSupport} />
            <TextLink label="Klub przyjaciół Poli" href={urls.pola.friends()} />
            <TextLink label="Partnerzy" href={urls.pola.partners()} />
            <TextLink label="Dołącz do zespołu" href={urls.pola.team()} />
          </FooterSection>
          <FooterSection title="Jakieś pytania?">
            <TextLink label="Kontakt" href={urls.pola.home('contact')} anchor={true} />
            <TextLink label="FAQ" href={urls.pola.about('faq')} anchor={true} />
            <TextLink label="Polityka prywatności" href={urls.pola.privacyPolicy()} />
            <TextExternalLink label="Uzupełnij dane o firmie" url={urls.external.links.newCompanyForm} />
          </FooterSection>
          <FooterSection title="Śledź nas na:">
            <div className="social-rows">
              <Facebook type="filled" />
              <Instagram type="filled" />
              <Twitter type="filled" />
            </div>
          </FooterSection>
        </div>
      </div>
    </FooterContainer>
  );
};

export default connector(PageFooter);

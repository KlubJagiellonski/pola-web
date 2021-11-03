import React from 'react';
import styled from 'styled-components';

import LogoWhite from '../assets/logo/pola-white.svg';
import { color, Device, fontSize, padding, pageWidth, margin, mobileHeaderHeight } from '../styles/theme';
import { Link } from 'gatsby';
import { urls } from '../domain/website';
import { AnchorLink } from 'gatsby-plugin-anchor-links';
import { Facebook, Instagram, Twitter } from '../components/social-media/Icons';
import { classNames } from '../utils/class-names';

const FooterContainer = styled.footer`
  background-color: ${color.background.dark};
  color: ${color.text.light};
  margin: 0 auto;
  width: 100%;
  padding: ${padding.big} 0;

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

const Section = styled.div`
  flex: 1 1 25%;

  .link {
    text-decoration: none;
  }

  .text {
    font-size: ${fontSize.normal};
    font-weight: 400;
    line-height: 21px;
    color: ${color.text.light};
  }

  .title {
    font-size: ${fontSize.normal};
    font-weight: bold;
    line-height: 21px;
  }

  .social-rows {
    display: flex;
    flex-direction: row;
  }

  @media ${Device.mobile} {
    background-color: transparent;
    text-align: right;
    margin-right: ${margin.normal};

    .title,
    .social-rows,
    .hide-mobile {
      display: none;
    }
  }

  @media ${Device.desktop} {
    padding: ${padding.normal};
    .hide-desktop {
      display: none;
    }
  }
`;

interface IFooterSection {
  title?: string;
}

const FooterSection: React.FC<IFooterSection> = ({ title, children }) => (
  <Section>
    <p className="title">{title}</p>
    {children}
  </Section>
);

interface IFooterLink {
  label: string;
  href: string;
  anchor?: boolean;
  hideMobile?: boolean;
}

const FooterLink: React.FC<IFooterLink> = ({ label, href, anchor = false, hideMobile = false }) =>
  anchor ? (
    <AnchorLink className="link" to={href}>
      <p className={classNames('text', ['hide-mobile', hideMobile])}>{label}</p>
    </AnchorLink>
  ) : (
    <Link className="link" to={href}>
      <p className={classNames('text', ['hide-mobile', hideMobile])}>{label}</p>
    </Link>
  );

export const PageFooter = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <FooterSection>
          <div className="logo">
            <img src={LogoWhite} />
          </div>
        </FooterSection>
        <div className="sections">
          <FooterSection title="Informacje">
            <FooterLink label="Home" href={urls.pola.home()} />
            <FooterLink label="Aktualności" href={urls.pola.news} />
            <FooterLink label="O Poli" href={urls.pola.about()} />
          </FooterSection>
          <FooterSection title="Działaj z nami">
            <FooterLink label="Wesprzyj aplikację" href={urls.external.polaSupport.href} />
            <FooterLink label="Klub przyjaciół Poli" href={urls.pola.friends()} />
            <FooterLink label="Partnerzy" href={urls.pola.partners} />
            <FooterLink label="Dołącz do zespołu" href={urls.pola.team} />
          </FooterSection>
          <FooterSection title="Jakieś pytania?">
            <FooterLink label="Kontakt" href={urls.pola.home('contact')} anchor={true} />
            <FooterLink label="FAQ" href={urls.pola.about('faq')} anchor={true} />
            <FooterLink label="Polityka prywatności" href={urls.pola.support} hideMobile={true} />
            <FooterLink label="Uzupełnij dane o firmie" href={urls.external.form.href} hideMobile={true} />
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

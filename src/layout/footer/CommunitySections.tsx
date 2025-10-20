import { Facebook, Instagram, Twitter } from 'components/social-media/Icons';
import * as React from 'react';
import styled from 'styled-components';
import { Device, padding } from 'styles/theme';
import { TextExternalLink, TextLink } from 'utils/browser/links';

import { urls } from '@App/website';

import { FooterSection } from './FooterSection';

const CommunitySectionsContainer = styled.div`
  flex: 1 1 100%;
  display: flex;
  padding: 0;
  margin: 0;

  @media ${Device.mobile} {
    flex-flow: column;
    gap: 0;
  }

  @media ${Device.desktop} {
    flex-flow: row nowrap;
    gap: ${padding.normal};
  }
`;

export interface ICommunitySections { }

export const CommunitySections: React.FC<ICommunitySections> = (props) => (
  <CommunitySectionsContainer className="sections">
    <FooterSection title="Informacje">
      <TextLink label="Home" href={urls.pola.home()} />
      <TextLink label="Aktualności" href={urls.pola.news()} />
      <TextLink label="O Poli" href={urls.pola.about()} />
      <TextLink label="Newsletter" href={urls.pola.newsletter()} />
      <TextLink label="Materiały" href={urls.pola.materials()} />
    </FooterSection>
    <FooterSection title="Działaj z nami">
      <TextExternalLink label="Wesprzyj aplikację" url={urls.external.links.polaSupport} />
      <TextLink label="Klub Przyjaciół Poli" href={urls.pola.friends()} />
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
  </CommunitySectionsContainer>
);

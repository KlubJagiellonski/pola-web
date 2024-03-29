import BusinessElements from 'business/components/BusinessElements';
import styled from 'styled-components';

import React from 'react';
import { useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType, urls } from 'app/website';

import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { Device, margin, padding } from '@Styles/theme';
import {PageProps} from "gatsby";

const Wrapper = styled.div`
  margin-top: ${margin.normal};

  @media ${Device.mobile} {
    margin: 0 ${margin.normal};
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${margin.big} 0;

  .gatsby-image-wrapper {
    flex-grow: 1;
    max-width: 10em;
  }
`;

const Title = styled(TitleSection)`
  text-align: center;
`;

interface IBusinessPage extends PageProps<any> {}

const BusinessPage = (props: IBusinessPage) => {
  const services = useSelector((state: IPolaState) => state.business.data);

  return (
    <PageLayout location={props.location} page={PageType.BUSINESS} styles={{ marginTop: padding.big }}>
      <SEOMetadata pageTitle="Oferta Biznesowa" />
      <PageSection>
        <Wrapper>
          <Text>
            Według badań nawet 90% Polaków chce kupować polskie produkty. Jak jednak rozpoznać polską firmę? Jakie
            kryteria należy wziąć pod uwagę? W odpowiedzi na te pytania powstała aplikacja Pola. Zabierz ją na zakupy.
            To proste narzędzie służące do weryfikowania firm.
          </Text>
          <Text>
            Realizując ideę patriotyzmu gospodarczego, staramy się wspierać działanie przedsiębiorstw na rzecz dobra
            wspólnego i przekonywać, że warto korzystać z ich produktów i usług.
          </Text>
          <Text>
            Aplikację Pola pobrano już 750 tys. razy, a liczba zeskanowanych produktów zbliża się do 10 milionów.
            Chętnie podejmiemy wspólne działania, które mogą zwiększyć pozycje rynkową Twojej firmy, a także stać się
            wyrazem społecznej odpowiedzialności biznesu.
          </Text>
          <BusinessElements services={services} />
          <Text>
            Chcemy dostarczać użytkownikom informacji niezbędnych do podjęcia świadomych decyzji. Transparentność w
            zakresie udostępniania danych to wzorcowa prokonsumencka postawa. Możemy dodać do bazy zgromadzoną przez
            Ciebie listę kodów EAN, listę marek własnych lub zupełnie inne dane, których jeszcze nie mamy. Razem
            budujemy świadomą konsumpcję.
          </Text>
          <Text>
            Kontakt: Mateusz Perowicz,{' '}
            <a href={urls.external.mail.Perowicz.href}>mateusz.perowicz@klubjagiellonski.pl</a>, tel. 660 010 034
          </Text>
          <Title>
            Pozostała <a href={urls.external.links.biznesKlub.href}>oferta Centrum Analiz Klubu Jagiellońskiego</a>
          </Title>
          <ImageSection>
            <ResponsiveImage title="nawigator legislacyjny" imageSrc="nawigator-legislacyjny.jpg" />
            <ResponsiveImage title="nawigator polityczny" imageSrc="nawigator-polityczny.jpg" />
            <ResponsiveImage title="raport branzowy" imageSrc="raport-branzowy.jpg" />
            <ResponsiveImage title="partnerstwo dzialu" imageSrc="partnerstwo-dzialu.jpg" />
            <ResponsiveImage title="okragle stoly" imageSrc="okragle-stoly.jpg" />
          </ImageSection>
          <Text>
            Kontakt: Tomasz Ociepka, <a href={urls.external.mail.Ociepka.href}>tomasz.ociepka@klubjagiellonski.pl</a>
            ,tel. 794 263 629
          </Text>
        </Wrapper>
      </PageSection>
    </PageLayout>
  );
};

export default BusinessPage;

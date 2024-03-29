import styled from 'styled-components';

import React from 'react';
import { useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { PageType, urls } from 'app/website';

import Card from '@Components/Card';
import Placeholder from '@Components/Placeholder';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import FriendsSection from 'friends/components/FriendsSection';

import { Text, TitleSection, WrapperSection } from '@Styles/GlobalStyle.css';
import { Device, color, fontSize, margin, padding } from '@Styles/theme';
import {PageProps} from "gatsby";

const Title = styled(TitleSection)`
  margin: ${margin.normal} 0;
  text-align: center;
`;

const BoldText = styled(Text)`
  font-weight: bold;
`;

const UlSection = styled.ul`
  color: ${color.text.secondary};
  font-size: ${fontSize.small};
  margin: ${margin.small};
  padding: ${padding.small};
`;

const BoldUlSection = styled(UlSection)`
  font-weight: bold;
`;

const WrapperInfo = styled(PageSection)`
  display: flex;
  padding-bottom: 0;
  padding-top: 120px;
  margin-top: -120px;

  div {
    flex: 1;
  }

  @media ${Device.mobile} {
    flex-direction: column;
    padding-right: 0;
    padding-left: 0;
  }
`;

const Info = styled(WrapperSection)`
  padding: ${margin.normal} ${padding.big};
  margin: ${margin.normal} 0;

  @media ${Device.mobile} {
    padding: ${margin.big} ${padding.small};
    margin: ${margin.normal} 0;
  }
`;

const TitleInfo = styled(TitleSection)`
  @media ${Device.mobile} {
    text-align: center;
  }
`;

interface IFriendsPage extends PageProps<any> {}

const FriendsPage = (props: IFriendsPage) => {
  const friendData = useSelector((state: IPolaState) => state.friends.data);

  return (
    <PageLayout location={props.location} page={PageType.FRIENDS}>
      <SEOMetadata pageTitle="Klub przyjaciół Poli" />
      <Placeholder text="Wspieramy polskie firmy - oto Przyjaciele Poli:" />
      <PageSection>
        <FriendsSection friends={friendData} />
      </PageSection>
      <PageSection style={{ paddingBottom: 0, marginBottom: 0 }}>
        <Info style={{ paddingBottom: 0, marginBottom: 0 }}>
          <Title>Jak rozpoznać polską firmę?</Title>
          <BoldText>
            Można to ustalić weryfikując kilka czynników. Nasz program kierowany jest do przedsiębiorstw, które
            spełniają poniższe kryteria:
          </BoldText>
          <BoldUlSection>
            <li>są zarejestrowane w Polsce;</li>
            <li>posiadają 100% polskiego kapitału;</li>
            <li>prowadzą produkcję na terenie naszego kraju;</li>
            <li>tworzą wykwalifikowane miejsca pracy;</li>
            <li>nie są częścią zagranicznego koncernu.</li>
          </BoldUlSection>
          <BoldText>
            Ponadto przedsiębiorstwo musi charakteryzować się nieposzlakowaną opinią na swój temat oraz aktywnie
            angażować się w działania podejmowane na rzecz promocji patriotyzmu gospodarczego w Polsce.
          </BoldText>
        </Info>
      </PageSection>
      <WrapperInfo id="profit">
        <Info color={color.background.white}>
          <TitleInfo>Czym jest Klub Przyjaciół Poli?</TitleInfo>
          <Text>
            Głównym celem Klubu Przyjaciół Poli jest promocja oraz wsparcie polskich przedsiębiorstw. Będzie to możliwe
            dzięki stworzeniu silnego środowiska społeczno-biznesowego, które poprzez kooperację i wspólne działania
            przyczyni się do popularyzacji mody na patriotyzm gospodarczy.
          </Text>
          <ResponsiveImage title="Klub Przyjaciół Poli" imageSrc="szproty-2.png" />
        </Info>
        <Info color={color.background.transparencyGrey}>
          <TitleInfo>Co zyskuje przyjaciel Poli?</TitleInfo>
          <UlSection>
            <li>Znak Towarowy Polski produkt - 100 pkt Pola</li>
            <Text>
              Stworzyliśmy własne oznaczenie Polski produkt - 100 pkt Pola przeznaczone wyłącznie dla produktów, które
              uzyskały w naszym algorytmie maksymalny wynik 100 punktów. Będzie to tym samym pierwszy znak towarowy,
              którego pojawienie się na etykiecie jest poparte merytoryczną analizą danego przedsiębiorstwa.
            </Text>
            <Text>
              Głównym powodem rozszerzenia naszej działalności są doświadczenia związane z oznaczeniami funkcjonującymi
              na polskim rynku spożywczym. W większości przypadków w sposób jednoznaczny sugerują one polskie
              pochodzenie produktów, chociaż po zweryfikowaniu ich producentów okazuje się, że są własnością
              zagranicznych podmiotów. Znak Polski produkt - 100 pkt Pola jest naszą odpowiedzią, która w formie
              prostego graficznego przekazu umożliwi szybką weryfikację produktu, co będzie szczególnie ważne dla osób
              niekorzystających z urządzeń mobilnych.
            </Text>
            <li> Ekspozycja informacji o firmie </li>
            <Text>
              Oprócz samego znaku towarowego status Przyjaciela Poli jest jednoznaczny z aktywnym udziałem w rozwoju
              aplikacji Pola. Zabierz ja na zakupy, którą używa już ponad 750 000 użytkowników. Informacja o firmie
              znajduje w specjalnych zakładkach w aplikacji oraz na naszej stronie internetowej, dzieki czemu każdy
              konsument może poznać historię oraz profil działalności wszystkich współpracujących z Klubem Jagiellońskim
              przedsiębiorstw. Dodatkowo po zeskanowaniu produktu należącego do Przyjaciela Poli użytkownik zostanie
              poinformowany o jego specjalnym statusie.
            </Text>
            <li>Działalność promocyjna oraz społeczna</li>
            <Text>
              Wszyscy Przyjaciele Poli mają możliwość aktywnego udziału w prowadzonych przez nas kampaniach społecznych
              oraz internetowych, mających na celu popularyzację polskich firm i patriotyzmu gospodarczego wśród
              obywateli.
            </Text>
          </UlSection>
        </Info>
      </WrapperInfo>
      <WrapperInfo>
        <Card title="Dołącz do Przyjaciół Poli" url={urls.pola.home('contact')}>
          <Text>Koordynator projektu Mateusz Perowicz</Text>
          <Text>
            <a href={urls.external.mail.Perowicz.href}>mateusz.perowicz@klubjagiellonski.pl</a>, tel. 660 010 034
          </Text>
        </Card>
      </WrapperInfo>
    </PageLayout>
  );
};

export default FriendsPage;

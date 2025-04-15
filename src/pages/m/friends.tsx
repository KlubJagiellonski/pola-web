import { PageSection } from '../../layout/PageSection';
import SEOMetadata from '../../utils/browser/SEOMetadata';
import { BuyPolishInitiative } from 'partners/components/BuyPolishInitiative';
import { PartnersList } from 'partners/components/PartnersList';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IPolaState } from '@App/state';
import { loadBrowserLocation, selectActivePage } from '@App/state/app-reducer';
import { PageType } from '@App/website';

import { WebViewLayout } from 'layout/WebViewLayout';
import styled from 'styled-components';
import { FriendLogo } from 'friends/components/FriendLogo';
import { margin } from '@Styles/theme';

const MobileFriend = styled.div`
    margin-top: ${margin.big};
`;

const MobileFriendWrapper = styled.div`
  padding: 1em;
`;

const MobileFriendImage = styled.div`
    width: 50%;

    .gatsby-image-wrapper{
        width: 100%;

        div{
            max-width: none !important;
        }
    }
`

type IPartnersPage = {
  location?: Location;
};

const PartnersPage = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();
  const friends = useSelector((state: IPolaState) => state.friends.data);

  React.useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(PageType.FRIENDS));
    }
  }, []);

  return (
    <WebViewLayout>
      <SEOMetadata pageTitle="friends" />
      <MobileFriendWrapper>
        <h2>Wspieramy polskie firmy - oto Przyjaciele Poli:</h2>
        {friends.map((friend, id)=>(
            <MobileFriend>
                <p key={friend.id}>
                    <strong>
                        <a href={friend.page}>{id+1}. {friend.name}</a>
                    </strong>
                </p>
                <p>{friend.description}</p>
                <MobileFriendImage><FriendLogo title={friend.name} imageSrc={friend.image || ""} /></MobileFriendImage>
            </MobileFriend>
        ))}
         <p><strong>Jak rozpoznać polską firmę?</strong></p>
    <p>Można to ustalić weryfikując kilka czynników. Nasz program kierowany jest do przedsiębiorstw, które spełniają poniższe kryteria:</p>
    <ul>
        <li>są zarejestrowane w Polsce;</li>
        <li>posiadają 100% polskiego kapitału;</li>
        <li>prowadzą produkcję na terenie naszego kraju;</li>
        <li>tworzą wykwalifikowane miejsca pracy;</li>
        <li>nie są częścią zagranicznego koncernu.</li>
    </ul>
    <p>Ponadto przedsiębiorstwo musi charakteryzować się nieposzlakowaną opinią na swój temat oraz aktywnie angażować się w działania podejmowane na rzecz promocji patriotyzmu gospodarczego w Polsce.</p>
    <p><strong>Czym jest Klub Przyjaciół Poli?</strong></p>
    <p>Głównym celem Klubu Przyjaciół Poli jest promocja oraz wsparcie polskich przedsiębiorstw. Będzie to możliwe dzięki stworzeniu silnego środowiska społeczno-biznesowego, które poprzez kooperację i wspólne działania przyczyni się do popularyzacji mody na patriotyzm gospodarczy.</p>
    <p><strong>Co zyskuje Przyjaciel Poli?</strong></p>
    <ol type="a">
        <li>
            <p><strong>Znak Towarowy Polski produkt - 100 pkt Pola</strong></p>
            <p>Stworzyliśmy własne oznaczenie <strong>Polski produkt - 100 pkt Pola</strong> przeznaczone wyłącznie dla produktów, które uzyskały w naszym algorytmie maksymalny wynik 100 punktów. Będzie to tym samym pierwszy znak towarowy, którego pojawienie się na etykiecie jest poparte merytoryczną analizą danego przedsiębiorstwa.</p>
            <p>Głównym powodem rozszerzenia naszej działalności są doświadczenia związane z oznaczeniami funkcjonującymi na polskim rynku spożywczym. W większości przypadków w sposób jednoznaczny sugerują one polskie pochodzenie produktów, chociaż po zweryfikowaniu ich producentów okazuje się, że są własnością zagranicznych podmiotów. Znak <strong>Polski produkt - 100 pkt Pola</strong> jest naszą odpowiedzią, która w formie prostego graficznego przekazu umożliwi szybką weryfikację produktu, co będzie szczególnie ważne dla osób niekorzystających z urządzeń mobilnych.</p>
        </li>
        <li>
            <strong>Ekspozycja informacji o firmie</strong>
            <p>Oprócz samego znaku towarowego status Przyjaciela Poli jest jednoznaczny z aktywnym udziałem w rozwoju aplikacji <strong>Pola. Zabierz ja na zakupy</strong>, którą używa już ponad 750 000 użytkowników. Informacja o firmie znajduje w specjalnych zakładkach w aplikacji oraz na naszej stronie internetowej, dzieki czemu każdy konsument może poznać historię oraz profil działalności wszystkich współpracujących z Klubem Jagiellońskim przedsiębiorstw. Dodatkowo po zeskanowaniu produktu należącego do Przyjaciela Poli użytkownik zostanie poinformowany o jego specjalnym statusie.</p>
        </li>
        <li>
            <strong>Działalność promocyjna oraz społeczna</strong>
            <p>Wszyscy Przyjaciele Poli mają możliwość aktywnego udziału w prowadzonych przez nas kampaniach społecznych oraz internetowych, mających na celu popularyzację polskich firm i patriotyzmu gospodarczego wśród obywateli.</p>
        </li>
    </ol>
    <p><strong>Chcesz do nas dołączyć?</strong></p>
    <p>Wszystkie przedsiębiorstwa zainteresowane dołączeniem do grona Przyjaciół Poli zachęcamy do kontaktu z Mateuszem Perowiczem (tel. <a href="tel:+48660010034">660 010 034</a>, e-mail: <a href="mailto:mateusz.perowicz@klubjagiellonski.pl">mateusz.perowicz@klubjagiellonski.pl</a>), który odpowiada za rozwój projektu.</p>
      </MobileFriendWrapper>
      
    </WebViewLayout>
  );
};

export default PartnersPage;

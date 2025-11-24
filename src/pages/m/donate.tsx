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
import Collected from '../../donate/Collected';
import styled from 'styled-components';
import { color, fontSize, padding } from '@Styles/theme';
import { SecondaryButton } from '@Components/buttons/SecondaryButton';
import { ButtonFlavor, ButtonThemes } from '@Components/buttons/Button';

const Text = styled.p`
  margin: 0;
  padding: 0;
  font-size: ${fontSize.small};
  padding-bottom: ${padding.normal}
`;

const TextBold = styled(Text)`
  font-weight: bold;
`;

const Button = styled(SecondaryButton)`
  text-transform: capitalize;
  font-weight: bold;
  width: 100%;
  background: transparent;
  border: ${color.background.red} solid 2px;
  border-radius: 0;
  color:  ${color.background.red};
  margin: ${padding.small} 0;
  font-weight: normal;

  &:hover{
    color:  ${color.text.light};
  }
`;

const ButtonRed = styled(Button)`
  border-color: ${color.background.red};
`;

const Divider = styled.div`
    margin-bottom: ${padding.normal};
    height: 2px;
    background-color: #f0f0f0;
`;

const Ul = styled.ul`
    margin: 0;
    padding: 0;
    padding-left: ${padding.big};
    font-size: ${fontSize.small};
    padding-bottom: ${padding.big}
`

type IPartnersPage = {
  location?: Location;
};

const Donate = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();
  const partners = useSelector((state: IPolaState) => state.partners.data);

  React.useEffect(() => {
    if (location) {
      dispatch(loadBrowserLocation(location));
      dispatch(selectActivePage(PageType.PARTNERS));
    }
  }, []);

  return (
    <WebViewLayout>
      <SEOMetadata pageTitle="Zbiorka" />
      <PageSection>
        <Text>
            Aplikacja Pola jest darmowa, jednak jej utrzymanie generuje stałe koszty. Jeśli każda osoba korzystająca regularnie z naszej aplikacji będzie wspierać nas drobną wpłatą, będziemy mogli dalej się rozwijać. Cele zbiórki znajdują się poniżej. Korzystamy z systemu Wpłacam.ngo.pl, który oparty jest na systemie płatności PayU. Twoje dane trafią wyłącznie do Klubu Jagiellońskiego, który stworzył i utrzymuje aplikację Pola. Poniższy licznik sumuje wszystkie formy darowizn na aplikację Pola w danym miesiącu, np. przelewy bezpośrednio na konto. Licznik aktualizowany jest raz dziennie. Wpłaty niestety nie sumują się automatycznie i trzeba to robić ręcznie.
        </Text>
        <Collected all={3000} collected={566}/>
        <a href={'#zbiorka'}>
        <ButtonRed
            label="wspieram"
            styles={{ ...ButtonThemes[ButtonFlavor.RED], fontSize: fontSize.small }}
            fontSize={fontSize.normal}
        />
        </a>
        <Divider/>
        <iframe id='zbiorka' src="https://nowe.platnosci.ngo.pl/pl/public/campaign/5ZvL05" height="626px" style={{width: "100%", border: "none", overflow: "hidden", height: 626}}></iframe>
        <TextBold>Chcemy kupować polskie produkty! Aż 70% Polaków deklaruje poparcie dla idei patriotyzmu gospodarczego. Każda decyzja zakupowa ma wpływ na naszą gospodarkę i stan finansów publicznych. Dlatego stworzyliśmy Aplikację Pola. Zabierz ją na zakupy.</TextBold>
        <Text>Jeśli chcesz wesprzeć rozwój aplikacji Pola, możesz przekazać nam 1,5% swojego podatku. Jeśli chcesz wesprzeć nas w ten sposób, wystarczy, że podasz numer KRS Klubu Jagiellońskiego, wydawcy aplikacji Pola, podczas wypełniania PITu.</Text>
        <Text><b>Jak rozpoznać polską firmę?</b> Wiele krajowych przedsiębiorstw zostało wykupionych przez zagraniczne koncerny, a takich zmian nie widać na opakowaniu. Znajdziemy tam kilka wskazówek, które zamiast pomagać wprowadzają w błąd. Kod 590 wcale nie informuje o polskości produktu. Tym kodem posługują się firmy zarejestrowane w Polsce, a każdy zagraniczny koncern może zarejestrować swoją filię w naszym kraju. Liczne biało-czerwone oznaczenia również nie gwarantują polskiego pochodzenia produktu.</Text>
        <Text>Dlatego <b>potrzebujemy Poli!</b> Aplikacja Pola. Zabierz ją na zakupy powstała właśnie po to, by pomóc w podejmowaniu świadomych decyzji konsumenckich. Dzięki niej będziemy wiedzieć w jakim stopniu wspieramy polską gospodarkę podczas codziennych zakupów. Pola skanuje kody kreskowe każdego produktu i dostarcza nam najważniejszych informacji o producencie.</Text>
        <Text>Chcemy służyć Wam pomocą podczas codziennych zakupów. Lecz nasza skuteczność zależy od waszego wsparcia. Pomóż budować świadome społeczeństwo obywatelskie.</Text>
        <TextBold>3000 zł miesięcznie – ta kwota pozwoli nam na:</TextBold>
        <Ul>
            <li>utrzymanie serwera</li>
            <li>aktualizowanie danych</li>
            <li>odpowiadanie na bieżące zgłoszenia</li>
        </Ul>
        <TextBold>5000 zł miesięcznie – dzięki takim funduszom będziemy w stanie:</TextBold>
        <Ul>
            <li>znacznie sprawniej weryfikować firmy</li>
            <li>promować nasz znak towarowy</li>
            <li>walczyć z mitami patriotyzmu gospodarczego</li>
        </Ul>
        <TextBold>10 000 zł miesięcznie – taka suma zagwarantuje:</TextBold>
        <Ul>
            <li>znaczne poszerzenie naszej bazy produktów i firm</li>
            <li>weryfikację nowych branż np. odzież, materiały budowlane</li>
            <li>minimum 4 materiały na temat patriotyzmu gospodarczego i podmiotowej gospodarki na naszym portalu (w tym video)</li>
        </Ul>
        <Text>Podczas codziennych zakupów decydujesz o tym komu pomagasz, a twój wybór ma znaczenie. Globalne koncerny przejdą przez kryzys suchą stopą i będą w stanie przejąć lokalnych przedsiębiorców borykających się z problemami. Dzięki Aplikacji Pola. Zabierz ją na zakupy możesz sprawdzić kogo wspierasz w dobie kryzysu. Wybieraj świadomie!</Text>
        <TextBold>Aby móc realizować powyższe cele oraz nadal się rozwijać potrzebujemy Waszego wsparcia finansowego. Każda, nawet niewielka darowizna ma dla nas ogromne znaczenie!</TextBold>
        <Text>Dokonując wpłaty za pośrednictwem powyższego formularza płatności możesz przekazać nam środki błyskawicznie, a licznik wpłat powinien zostać zaktualizowany w ciągu kilku minut. Możesz też dokonać nam przelewu w tradycyjny sposób np.ustawiając stałe, comiesięcznie zlecenie darowizny na nasze konto. To szczególnie ważna dla nas forma wsparcia, do której zachęcamy. Licznik zostanie zaktualizowany o wpłaty na konto najpóźniej w ciągu trzech dni od ich zaksięgowania.</Text>
        <Text>Klub Jagielloński<br></br>ul. Rynek Główny 34<br></br>31-010 Kraków<br></br>Nr konta: <b>47 1020 2892 0000 5102 0582 9454 (PKO BP S.A.)</b><br></br>W tytule: „darowizna na cele statutowe: aplikacja Pola”</Text>
        <Text>Przypominamy też, że wydawcą aplikacji jest stowarzyszenie Klub Jagiellońskiego, a darowizny na rzecz takich organizacji pozarządowych można odliczyć od dochodu, a dzięki temu zapłacić niższy podatek!</Text>
      </PageSection>
    </WebViewLayout>
  );
};

export default Donate;

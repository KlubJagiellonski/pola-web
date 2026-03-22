import React from 'react';
import styled from 'styled-components';
import { PageProps } from 'gatsby';

import { PageLayout } from '@Layout/PageLayout';
import { PageType } from 'app/website';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import { Device } from '@Styles/theme';
import { color } from '@Styles/theme';

const Main = styled.main`
  max-width: 840px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  

  @media ${Device.mobile} {
    text-align: center;
    
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: ${color.text.main};
  text-align: center;

  @media ${Device.mobile} {
    font-size: 1.4rem;
  }
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  line-height: 1.3;
  margin-bottom: 1.5rem;
  color: ${color.text.main};
  text-align: center;

  @media ${Device.mobile} {
    font-size: 1.3rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: ${color.text.secondary};

  @media ${Device.mobile} {
    text-align: center;
  }
`;

const List = styled.ul`
  margin-bottom: 2rem;
  padding-left: 2rem;

  @media ${Device.mobile} {
    text-align: left;
    padding-left: 1.5rem;
  }
`;

const CenterImage = styled.img`
  border-radius: 8px;
  margin-bottom: 2rem;
  width: 100%;
  height: auto;
`;

const BottomImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 1.5rem 2rem;
`;

const BottomImage = styled.img`
  border-radius: 8px;
  margin-bottom: 2rem;
  width: 45%;
  height: auto;

  @media ${Device.mobile} {
    width: 100%;
  }
`;

const ProduktPolskiPage: React.FC<PageProps> = () => {
  return (
    <PageLayout page={PageType.POLSKI}>
      <SEOMetadata pageTitle="Produkt Polski" />

      <Main>
        <Title>W jaki sposób odróżnić polski produkt od produktu zagranicznego?</Title>

        <SubTitle>Patriotyzm gospodarczy w pigułce</SubTitle>

        <CenterImage
          src="https://images.ctfassets.net/ob21rxt43jkz/2uKarLoBhWOM4V0ca6EZfl/f442456460e343fdd55bcb24c7a1e7e1/hand-magnifying-glass.jpg?w=800&h=420&q=85&fm=webp"
          alt="Patriotyzm gospodarczy"
        />

        <Paragraph>
          W świadomości konsumenckiej funkcjonują różne wyobrażenia na temat tego, czym jest produkt polski.
          Czy podstawowym kryterium jest miejsce rejestracji firmy? Miejsce produkcji?
          A może decyduje o tym polski kapitał? W niniejszym mini-poradniku postaramy się wyjaśnić,
          jakie elementy wpływają na polskość produktu oraz na jakie oznaczenia warto zwracać uwagę przy ich zakupie.
        </Paragraph>

        <SubTitle>Czy kupowanie polskich produktów jest ważne dla polskiej gospodarki?</SubTitle>

        <Paragraph>
          Otóż okazuje się, że jest bardzo ważne. Zgodnie z szacunkami raportu „Wybieram 590" przygotowanym
          przez Grant Thornton, z każdej złotówki wydanej na produkt polskiej firmy wytwarzającej go w kraju,
          w polskiej gospodarce zostaje 79 groszy. W przypadku zagranicznych firm, produkujących za granicą
          jest to tylko 25 groszy. Gdyby 1% konsumentów kupujących zagraniczne produkty zaczęło wybierać
          te rodzime, w Polsce zostałoby 6,6 mld zł więcej.
        </Paragraph>

        <SubTitle>Jak odróżnić polski produkt od zagranicznego?</SubTitle>

        <Paragraph>
          Na początek warto wymienić najważniejsze kryteria, według których możemy próbować klasyfikować produkt jako polski.
          Są to:
        </Paragraph>

        <List>
          <li>Rejestracja firmy w Polsce</li>
          <li>Płacenie podatków w Polsce</li>
          <li>Produkcja w Polsce</li>
          <li>Posiadanie polskiego kapitału</li>
          <li>Wykorzystanie polskich surowców przy wytworzeniu produktu</li>
          <li>Wydatkowanie środków na Badania i Rozwój (B+R) w Polsce</li>
        </List>

        <Paragraph>
          Im więcej z tych kryteriów jest spełnionych, tym więcej wydanych przez nas pieniędzy zostanie
          w polskim obiegu gospodarczym. W sklepach możemy natknąć się na różne oznaczenia mające sugerować
          polskie pochodzenie produktu. Dlatego przedstawiamy najważniejsze z nich:
        </Paragraph>

        <List>
          <li>
            <strong>Produkt Polski</strong> — ustawowe oznaczenie produktów spożywczych wytworzonych
            w Polsce z użyciem polskich surowców. Nie weryfikuje ono jednak pochodzenia kapitału producenta.
          </li>
          <li>
            <strong>Kod 590</strong> — prefiks w systemie kodów kreskowych EAN informujący, że producent
            jest zarejestrowany w Polsce.
          </li>
          <li>
            <strong>Godło „Teraz Polska"</strong> — przyznawane za wysoką jakość produktów.
          </li>
          <li>
            <strong>Certyfikat „Doceń polskie"</strong> — przyznawany po audycie jakościowym i smakowym.
          </li>
        </List>

        <Paragraph>
          <strong>My oczywiście zachęcamy do korzystanie z aplikacji Pola przy weryfikacji polskości produktów.</strong>{' '}
          Wszystkie firmy w naszej bazie są weryfikowane pod kątem pochodzenia kapitału, produkcji w Polsce,
          rejestracji firmy w Polsce, wydatków na B+R w Polsce oraz przynależności do zagranicznego koncernu.
          Pozwala to uzyskać rzetelne informacje na temat danego producenta oraz jego wkładu w gospodarczy rozwój Polski.
        </Paragraph>

        <CenterImage
          src="https://images.ctfassets.net/ob21rxt43jkz/6QQ3eUsRShv3929dixtCek/56dc57e55a5bde67688f46d112baf60a/mlekpol.png?w=800&h=420&q=85&fm=webp"
          alt="Mlekpol - polski producent mleka"
          style={{ width: '60%', margin: '0 auto 2rem' }}
        />

        <SubTitle>Jak znaleźć produkty regionalne?</SubTitle>

        <Paragraph>
          Patriotyzm gospodarczy nierozerwalnie związany jest także z patriotyzmem lokalnym, który polega na wspieraniu
          regionalnych producentów zajmujących się produkcją tradycyjnych produktów, związanych z kulturą i historią
          konkretnego regionu. W tym przypadku także mamy do czynienia z istnieniem specjalnych programów i certyfikatów,
          których zadaniem jest wyróżnienie i uwiarygodnienie pochodzenia takich produktów. Przykładowymi z nich są:
        </Paragraph>

        <List>
          <li>
            <strong>System "Jakość Tradycja"</strong> — opracowany przez Polską Izbę Produktu Regionalnego i Lokalnego
            i Związek Województw Rzeczypospolitej Polskiej, uznany za krajowy system jakości żywności decyzją Ministra
            Rolnictwa i Rozwoju Wsi z dnia 12 czerwca 2007 roku. Do systemu przyjmowane są tylko produkty
            o udokumentowanej, co najmniej 50‑letniej produkcji, wytwarzane przy zachowaniu niezmiennej receptury
            i metod produkcji. W przypadku niektórych produktów pochodzenia zwierzęcego lub roślinnego dodatkowym
            wymogiem jest wykorzystanie tradycyjnych ras zwierząt lub tradycyjnych odmian roślin (pochodzących sprzed 1956 r.).
            Listę takich produktów można znaleźć pod tym
            <strong>
              <a
                href="https://www.produktyregionalne.pl/jakosc.php?body=article&name=produkty-posiadajace-znak&lang=pl"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                linkiem
              </a>
            </strong>.
          </li>
          <li>
            <strong>
              Systemy chronione oznaczenia geograficzne (ChOG), chronione nazwy pochodzenia (ChNP) i gwarantowane
              tradycyjne specjalności (GTS)
            </strong>{' '}
            — są to oznaczenia tradycyjnych, naturalnych produktów, utworzone na mocy Rozporządzenia Parlamentu
            Europejskiego i Rady (UE) nr 1151/2012. Pierwsze dwa odnoszą się do miejsca wytwarzania produktu,
            a ostatni do specjalnego składnika bądź metody wytwarzania. Listę i ich opisy można znaleźć w bazie
            Komisji Europejskiej
            <strong>
              <a
                href="https://ec.europa.eu/agriculture/eambrosia/geographical-indications-register/"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                eAmbrosia
              </a>
            </strong>{' '}
            lub na stronie
            <strong>
              <a
                href="https://www.gov.pl/web/ijhars/polskie-produkty-chnp-chog-gts--raport-i-analizy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Inspekcji Jakości Handlowej Artykułów Rolno‑Spożywczych
              </a>
            </strong>
            .
          </li>
          <li>
            <strong>Ogólnopolska Lista Produktów Tradycyjnych</strong> — oficjalny rejestr prowadzony przez Ministerstwo
            Rolnictwa i Rozwoju Wsi, powstały na podstawie ustawy z dnia 17 grudnia 2004 roku o rejestracji i ochronie
            nazw i oznaczeń produktów rolnych i środków spożywczych oraz o produktach tradycyjnych. Jego celem jest
            promocja produktów o wyjątkowych cechach wynikających z tradycyjnych metod produkcji. Wpisane produkty muszą
            mieć udokumentowaną tradycję wytwarzania od co najmniej 25 lat i stanowić część lokalnego dziedzictwa
            kulturowego. Cała lista dostępna jest na stronie
            <strong>
              <a
                href="https://www.gov.pl/web/rolnictwo/lista-produktow-tradycyjnych12"
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Ministerstwa Rolnictwa i Rozwoju Wsi
              </a>
            </strong>
            .
          </li>
          <li>
            <strong>Europejska Sieć Regionalnego Dziedzictwa Kulinarnego</strong> — powstała w Szwecji w 1995 roku
            inicjatywa zrzeszająca regiony z całej Europy. Celem jest wspieranie rozwoju tradycji regionalnych.
            Do programu przystąpiły wszystkie województwa z Polski, a w każdym z nich oprócz producentów zrzeszane są
            także lokalne usługi hotelarskie czy kulinarne. Pełne listy uczestników dla poszczególnych regionów można
            znaleźć na oficjalnych stronach marszałkowskich lub na dedykowanych portalach.
          </li>
        </List>

        <Paragraph>
          Lista zawierająca różne certyfikaty i oznaczenia niewątpliwie jest bardzo długa. Dlatego chcąc kupować
          świadomie polskie produkty w duchu patriotyzmu gospodarczego, rekomendujemy zwrócenie uwagi na kilka kwestii.
        </Paragraph>

        <Paragraph>
          Po pierwsze, zwracajmy uwagę na chwyty marketingowe zagranicznych producentów oraz wielkich sieci handlowych.
          Ich przekazy promocyjne często mają na celu wywołanie skojarzeń z Polską, aby w ten sposób wykorzystać
          nasz patriotyzm gospodarczy.
        </Paragraph>

        <Paragraph>
          Po drugie, przy codziennych zakupach, przed włożeniem produktu do koszyka weryfikujmy jego pochodzenie
          (oznaczenie "Produkt polski", a nie na przykład "wyprodukowano w Polsce") i rejestrację firmy w Polsce
          (kod 590). <strong>Zachęcamy oczywiście do skanowania produktów przy użyciu aplikacji Pola.</strong>{' '}
          Zyskujemy wtedy także istotne informacje o pochodzeniu kapitału przedsiębiorstwa, czy wydatkach na B+R w Polsce.
        </Paragraph>

        <Paragraph>
          Po trzecie, przed wyjazdem do innego regionu Polski sprawdźmy wcześniej listę lokalnych produktów oraz miejsc,
          w których możemy się w nie zaopatrzyć. Przydatna do tego może być sporządzona wcześniej w tym artykule lista.
          Można także wpisać w wyszukiwarce takie frazy jak "dziedzictwo kulinarne", "marka",
          "produkty lokalne/regionalne/tradycyjne" i dopisać nazwę województwa lub regionu, do którego mamy zamiar się udać.
        </Paragraph>

        <Paragraph>
          Osoby zainteresowane pogłębieniem swojej wiedzy w tematyce patriotyzmu gospodarczego zachęcamy do zapoznania się
          z raportem
          <strong>
            <a
              href="https://klubjagiellonski.pl/publikacje/patriotyzm-gospodarczy-2025-rekomendacje-i-poradnik-swiadomego-konsumenta/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Klubu Jagiellońskiego "Patriotyzm gospodarczy AD 2025. Rekomendacje i poradnik świadomego konsumenta"
            </a>
          </strong>{' '}
          oraz z naszymi wcześniejszymi
          <strong>
            <a
              href="https://www.pola-app.pl/produkt-polski-kod-590-aplikacja-pola-ktore-oznaczenie-pokaze-nam-prawdziwie"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              artykułami
            </a>
          </strong>{' '}
          dotyczącymi oznaczeń polskich produktów.
        </Paragraph>

        <Paragraph>
          Pamiętajmy, że kupując polskie produkty od polskich przedsiębiorców znacząco przyczyniamy się do rozwoju polskiej
          gospodarki!
        </Paragraph>
      </Main>

      <BottomImageWrapper>
        <BottomImage
          src="https://images.ctfassets.net/ob21rxt43jkz/4aiIOHNZeEX1JuD3FVQw8L/469163d4b01c9922bb612749bcb10b92/l.jpg"
          alt="Patriotyzm gospodarczy"
        />
      </BottomImageWrapper>
    </PageLayout>
  );
};

export default ProduktPolskiPage;

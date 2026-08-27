import React from 'react';
import { PageProps } from 'gatsby';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';

import { IPolaState } from '@App/state';
import { urls } from 'app/website';

import { PageSection } from '@Layout/PageSection';
import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { Device, margin } from '@Styles/theme';
import { PageLayout } from '@Layout/PageLayout';
import { PageType } from '@App/website';
import SEOMetadata from '@Utils/browser/SEOMetadata';
import Friends from 'friends/components/Friends';

import esgEdukacjaImg from '../assets/esg-edukacja.jpg';
import promocjaImg from '../assets/promocja.png';

// === styled components ===

const Wrapper = styled.div`
  margin-top: ${margin.normal};

  @media ${Device.mobile} {
    margin: 0 ${margin.normal};
  }
`;

const Title = styled(TitleSection)`
  text-align: center;
  margin: ${margin.big};
  font-size: 1.6rem;

  @media ${Device.mobile} {
    font-size: 1.3rem;
  }
`;

const SubTitle = styled.h2`
  text-align: center;
  margin-bottom: ${margin.big};
  font-size: 1.3rem;

  @media ${Device.mobile} {
    font-size: 1.1rem;
  }
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 1.9fr;
  gap: ${margin.normal};
  align-items: center;
  margin: ${margin.big} 0;

  @media ${Device.mobile} {
    grid-template-columns: 1fr;
  }
`;

const ImageColumnLeft = styled.div`
  order: 1;
  display: flex;
  justify-content: center;

  @media ${Device.mobile} {
    order: 1;
  }
`;

const TextColumnRight = styled.div`
  order: 2;

  @media ${Device.mobile} {
    order: 2;
  }
`;

const TextColumnLeft = styled.div`
  order: 1;

  @media ${Device.mobile} {
    order: 2;
  }
`;

const ImageColumnRight = styled.div`
  order: 2;
  display: flex;
  justify-content: center;

  @media ${Device.mobile} {
    order: 1;
  }
`;

const Img = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

const Paragraph = styled(Text)`
  margin: ${margin.small};
  text-align: center;
  font-size: 1.1rem;
`;

const AuditSection = styled.section`
  max-width: 720px;
  margin: 0 auto 3rem;
  text-align: center;
`;

const AuditTitle = styled.h2`
  font-size: 1.3rem;
  margin: 1.5rem 0;

  @media ${Device.mobile} {
    font-size: 1.1rem;
  }
`;

const AuditItem = styled.div`
  padding: 1.2rem 0;
  border-top: 1px solid #eee;

  &:first-of-type {
    border-top: none;
  }
`;

const AuditItemTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
`;

const AuditItemText = styled.p`
  margin: 0;
  line-height: 1.5;
`;

// === typy ===

interface ILocalPage extends PageProps {}

const connector = connect((state: IPolaState) => ({
  friends: state.friends.data,
}));

type Props = ILocalPage & ConnectedProps<typeof connector>;

// === komponent strony ===

const LocalContentPage: React.FC<Props> = (props) => {
  const { friends, location } = props;

  return (
    <PageLayout location={location} page={PageType.LOCAL_CONTENT}>
      <PageSection>
        <SEOMetadata pageTitle="Local Content" />

        <Title>Pokaż, że jesteś „local content”!</Title>

        <Wrapper>
          <Paragraph>
            Czy woda i kawa, którą zamawiacie jest polska? Czy papier do drukarki jest produkowany przez
            polską firmę? Milion prostych decyzji zakupowych da większy efekt niż kolejne przejęcie polskiej
            firmy za granicą.
          </Paragraph>

          <AuditSection>
            <AuditTitle>Zamów audyt swojej polityki zakupowej</AuditTitle>

            <AuditItem>
              <AuditItemTitle>Audyt</AuditItemTitle>
              <AuditItemText>
                Jesteśmy w stanie dokonać audytu wewnętrznego Waszej polityki zakupowej. Dowiecie się, jaki
                procent Waszych wydatków zakupowych zostaje w Polsce.
              </AuditItemText>
            </AuditItem>

            <AuditItem>
              <AuditItemTitle>Raport z audytu</AuditItemTitle>
              <AuditItemText>
                Z przeprowadzonego audytu przygotowujemy raport z wynikami w poszczególnych kategoriach oraz
                informacją, jaki procent polskich produktów jest wykorzystywany. Wycena jest dokonywana
                indywidualnie, zależnie od potrzeb.
              </AuditItemText>
            </AuditItem>

            <AuditItem>
              <AuditItemTitle>Dzień Polskiego Produktu</AuditItemTitle>
              <AuditItemText>
                Możemy wspólnie zorganizować u Was Dzień Polskiego Produktu. Pokazujemy, że bez trudu można
                znaleźć polskie produkty wysokiej jakości w różnych kategoriach i włączamy takie działania w
                cele ESG.
              </AuditItemText>
            </AuditItem>
          </AuditSection>

          {/* Sekcja 1: obrazek lewo, tekst prawo */}
          <TwoColumns>
            <ImageColumnLeft>
              <Img src={esgEdukacjaImg} alt="ESG edukacja" />
            </ImageColumnLeft>
            <TextColumnRight>
              <SubTitle>Pomóż stworzyć mentalność „local content”!</SubTitle>
              <Paragraph>
                To nie musi być tylko kolejny akt prawny. Możemy przekuć to w nowe postawy konsumenckie. Idźmy
                z tym do szkół! Mamy doświadczenie w programach edukacyjnych.
              </Paragraph>
              <Paragraph>
                Zajęcia w szkołach. W opinii publicznej funkcjonuje wiele szkodliwych mitów dotyczących
                patriotyzmu gospodarczego. Bez działań edukacyjnych w tym zakresie źle rozumiana idea
                patriotyzmu gospodarczego będzie służyć utrwalaniu złych nawyków konsumenckich. Potrzebujemy
                edukacji ekonomicznej w polskich szkołach. Chętnie przygotujemy scenariusz zajęć i odwiedzimy
                szkoły w Twoim regionie. Koszt pierwszych zajęć to 5 tys. zł brutto, a każdych kolejnych 3
                tys. zł brutto. Tego typu lokalna edukacja idealnie wpisuje się w cele ESG.
              </Paragraph>
            </TextColumnRight>
          </TwoColumns>

          {/* Sekcja 2: tekst lewo, obrazek prawo */}
          <TwoColumns>
            <TextColumnLeft>
              <SubTitle>Promuj swój „local content”!</SubTitle>
              <Paragraph>
                Wybierz rozszerzony opis firmy. Dodaj do suchego tekstu swoje logotypy i link
                przekierowujący do twojej strony internetowej. Zapisz się w pamięci użytkowników aplikacji
                Pola.
              </Paragraph>
              <Paragraph>
                Jeśli chcesz sprawdzić, jak to działa, zeskanuj Polą dowolny produkt. Zobaczysz tam promocję
                naszej kampanii 1,5%. W tym miejscu może być twoje logo i przekierowanie do Twojej strony
                internetowej.
              </Paragraph>
            </TextColumnLeft>
            <ImageColumnRight>
              <Img src={promocjaImg} alt="Promocja lokalnego contentu" />
            </ImageColumnRight>
          </TwoColumns>

          <Friends friends={friends} />

          <Paragraph style={{ textAlign: 'center', fontSize: '0.85rem' }}>
            Kontakt: Mateusz Perowicz,{` `}
            <a href={urls.external.mail.Perowicz.href}>mateusz.perowicz@klubjagiellonski.pl</a>
            <p>tel. 660 010 034</p>
          </Paragraph>
        </Wrapper>
      </PageSection>
    </PageLayout>
  );
};

export default connector(LocalContentPage);

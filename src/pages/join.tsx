import styled from 'styled-components';

import React from 'react';

import { PageType, urls } from 'app/website';

import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { Text, TitleSection } from '@Styles/GlobalStyle.css';
import { Device, fontSize, margin, padding } from '@Styles/theme';
import {PageProps} from "gatsby";

interface ITeamPage extends PageProps<any> {}

const Wrapper = styled.div`
  margin: ${padding.veryBig} 0 ${margin.normal} 0;

  @media ${Device.mobile} {
    margin: ${padding.veryBig} ${margin.normal} ${margin.normal} ${margin.normal};
  }
`;

const List = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-align: center;
    font-weight: bold;

  li {
    font-size: ${fontSize.small};
  }
`;

const ListTeam = styled(List)`
  font-weight: bold;
`;

const Section = styled.div`
  margin-top: ${margin.big};
`;

const TitleTeam = styled(TitleSection)`
  font-weight: normal;
  text-align: center;
  margin-top: ${margin.big};
`

const TeamPage = (props: ITeamPage) => {
  return (
    <PageLayout location={props.location} page={PageType.TEAM}>
      <Wrapper>
        <SEOMetadata pageTitle="Dołącz do zespołu" />
        <PageSection>
          <Section>
            <TitleSection style={{textAlign: "center"}}>Obecny zespół aplikacji Pola:</TitleSection>
          <ColumnsLayout>
            <ContentColumn>
              <TitleTeam>iOS developer</TitleTeam>
              <ListTeam>
                  <li>Marcin Stepnowski</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>backend developer</TitleTeam>
              <ListTeam>
                  <li>Dominik Krzemiński</li>
                  <li>Hubert Skibiński</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>android developer</TitleTeam>
              <ListTeam>
                  <li>Piotr Ryś</li>
              </ListTeam>
            </ContentColumn>
          </ColumnsLayout>
          <ColumnsLayout>
            <ContentColumn>
              <TitleTeam>web developer</TitleTeam>
              <ListTeam>
                  <li>Zuzanna Dudzińska</li>
                  <li>Magdalena Redka</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>analityka</TitleTeam>
              <ListTeam>
                  <li>Monika Kotula</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>flutter developer</TitleTeam>
              <ListTeam>
                  <li>Kacper Żebrowski</li>
              </ListTeam>
            </ContentColumn>
          </ColumnsLayout>
          <ColumnsLayout>
            <ContentColumn>
              <TitleTeam>media manager</TitleTeam>
              <ListTeam>
                  <li>Anna Siłaczuk</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>redaktor bazy danych</TitleTeam>
              <ListTeam>
                  <li>Bartłomiej Siedlecki</li>
              </ListTeam>
            </ContentColumn>
            <ContentColumn>
              <TitleTeam>UI/UX designer</TitleTeam>
              <ListTeam>
                  <li>Jakub Majkowski</li>
              </ListTeam>
            </ContentColumn>
          </ColumnsLayout>
          </Section>
          <Section>
          <TitleSection style={{textAlign: "center", paddingTop: margin.big}}>Pola istnieje dzięki nim!</TitleSection>
          <ColumnsLayout>
            <ContentColumn>
                <TitleTeam>programowanie</TitleTeam>
                <List>
                <li>Arek Banas</li>
                <li>Kamil Breguła</li>
                <li>Zuzanna Dudzińska</li>
                <li>Rafał Gawlik</li>
                <li>Katarzyna Grudzień</li>
                <li>Paweł Janeczek</li>
                <li>Jakub Kałamarz</li>
                <li>Karol Kamiński</li>
                <li>Grzegorz Kapusta</li>
                <li>Antoni Kędracki</li>
                <li>Jurek Kleszcz</li>
                <li>Konrad Krakowiak</li>
                <li>Dominik Krzemiński</li>
                <li>Jakub Lipiński</li>
                <li>Marcin Murgas</li>
                <li>Damian Paśko</li>
                <li>Magdalena Redka</li>
                <li>Łukasz Rejman</li>
                <li>Piotr Ryś</li>
                <li>Mikołaj Rodkiewicz</li>
                <li>Hubert Skibiński</li>
                <li>Marcin Stepnowski</li>
                <li>Adam Stolarczyk</li>
                <li>Karol Stolarczyk</li>
                <li>Kacper Żebrowski</li>
                <li>Julia Sulich</li>
                <li>Mateusz Śląski</li>
                <li>Michał Tajchert</li>
                <li>Adam Walkowski</li>
                </List>
                <TitleTeam>algorytm:</TitleTeam>
                <List>
                  <li>Piotr Dardziński</li>
                  <li>Michał Kot</li>
                  <li>Piotr Mieczkowski</li>
                  <li>Joanna Szalacha-Jarmużek</li>
                  <li>Leszek Wojdalski</li>
                </List>
            </ContentColumn>
            <ContentColumn>
                <TitleTeam>projektowanie i design:</TitleTeam>
                <List>
                  <li>Katarzyna Grudzień</li>
                  <li>Magdalena Karpińska</li>
                  <li>Tomasz Szczodrowski</li>
                  <li>Przemek Pomaski</li>
                </List>
                <TitleTeam>redakcja bazy danych:</TitleTeam>
                <List>
                    <li>Łukasz Cader</li>
                    <li>Mikołaj Dłubak</li>
                    <li>Maciej Dulak</li>
                    <li>Michał Kania</li>
                    <li>Piotr Kaźmierski</li>
                    <li>Dawid Kiljański</li>
                    <li>Monika Kotula</li>
                    <li>Mateusz Mroczek</li>
                    <li>Mateusz Perowicz</li>
                    <li>Bartłomiej Siedlecki</li>
                    <li>Anna Siłaczuk</li>
                    <li>Wojtek Skierski</li>
                    <li>Arkadiusz Tomczyński</li>
                    <li>Michał Wincel</li>
                    <li>Bartek Ząbek</li>
                </List>
                  <TitleTeam>inicjatorzy i pomysłodawcy:</TitleTeam>
                  <List>
                    <li>Grzegorz Kapusta</li>
                    <li>Jakub Lipiński</li>
                    <li>Krzysztof Mazur</li>
                    <li>Piotr Trudnowski</li>
                  </List>
            </ContentColumn>
          </ColumnsLayout>
            <ColumnsLayout>
              <ContentColumn>
                  <TitleTeam>koordynacja:</TitleTeam>
                  <List>
                    <li>Maciej Dulak</li>
                    <li>Bartosz Paszcza</li>
                    <li>obecnie - Mateusz Perowicz</li>
                  </List>
                  <TitleTeam>Kontakt</TitleTeam>
                  <List>
                    <li>
                      <a href={urls.external.mail.Klub.href}>pola@klubjagiellonski.pl</a>
                    </li>
                    <li>tel. 660 010 034</li>
                  </List>
              </ContentColumn>
            </ColumnsLayout>
          </Section>
        </PageSection>
      </Wrapper>
    </PageLayout>
  );
};

export default TeamPage;

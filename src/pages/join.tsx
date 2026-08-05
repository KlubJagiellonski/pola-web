import styled from 'styled-components';

import React from 'react';

import { PageType, urls } from 'app/website';

import { ColumnsLayout, ContentColumn } from '@Layout/ColumnsLayout';
import { PageLayout } from '@Layout/PageLayout';
import { PageSection } from '@Layout/PageSection';
import SEOMetadata from '@Utils/browser/SEOMetadata';

import { TitleSection } from '@Styles/GlobalStyle.css';
import { Device, fontSize, margin, padding } from '@Styles/theme';
import {PageProps} from "gatsby";
import TeamCarousel from '../components/TeamCarousel';


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

const Section = styled.div`
  margin-top: ${margin.big};
`;

const TitleTeam = styled(TitleSection)`
  font-weight: normal;
  text-align: center;
  margin-top: ${margin.big};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 24px;
  margin-top: ${margin.normal};
  text-align: center;
`;

const RoleCard = styled.div`
  border-radius: 16px;
  padding: 16px 20px;
  text-align: center;
  justify-self: center;
`;

const RoleName = styled.p`
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #777;
  margin: 0 0 4px;
`;

const PersonName = styled.p`
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0;
`;


const TeamPage = (props: ITeamPage) => {
  return (
    <PageLayout location={props.location} page={PageType.TEAM}>
      <Wrapper>
        <SEOMetadata pageTitle="Dołącz do zespołu" />
        <PageSection>
          <Section>
              <TitleSection style={{ textAlign: 'center', fontSize: `${fontSize.big}` }}>
                Poznaj nasz zespół
              </TitleSection>
              <br />
              <TeamCarousel />
            </Section>
          <Section>
            <TitleSection style={{textAlign: "center"}}>Obecny zespół aplikacji Pola:</TitleSection>
            <br />
             <Grid>
                <RoleCard>
                  <RoleName>Head Developer</RoleName>
                  <PersonName>Marcin Stepnowski</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>Backend Developer</RoleName>
                  <PersonName>Dominik Krzemiński</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>Flutter Developer</RoleName>
                  <PersonName>Kacper Żebrowski</PersonName>
                </RoleCard>
              </Grid>
              <Grid>
                <RoleCard>
                  <RoleName>Security Engineer</RoleName>
                  <PersonName>Hubert Skibiński</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>QA Engineer</RoleName>
                  <PersonName>Piotr Ryś</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>UI/UX Designer</RoleName>
                  <PersonName>Jakub Majkowski</PersonName>
                </RoleCard>
              </Grid>
              <Grid>
                <RoleCard>
                  <RoleName>Web Developer</RoleName>
                  <PersonName>Zuzanna Dudzińska</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>SEO Manager</RoleName>
                  <PersonName>Magdalena Redka</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>Data Analyst</RoleName>
                  <PersonName>Monika Kotula</PersonName>
                </RoleCard>
              </Grid>
              <Grid>
                <RoleCard>
                  <RoleName>Media Manager</RoleName>
                  <PersonName>Anna Siłaczuk</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>Redaktor</RoleName>
                  <PersonName>Adam Bajerski</PersonName>
                </RoleCard>
                <RoleCard>
                  <RoleName>Relacja z Biznesem</RoleName>
                  <PersonName>Marcin Kawko</PersonName>
                </RoleCard>
              </Grid>
              <Grid>
                <RoleCard style={{ textAlign: 'center' }}>
                  <RoleName>Project Manager</RoleName>
                  <PersonName>Mateusz Perowicz</PersonName>
                </RoleCard>
              </Grid>
          </Section>
          <Section>
          <TitleSection style={{textAlign: "center", paddingTop: margin.big}}>Pola istnieje dzięki nim!</TitleSection>
          <ColumnsLayout>
            <ContentColumn>
                <TitleTeam>Programowanie:</TitleTeam>
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
                <TitleTeam>Algorytm:</TitleTeam>
                <List>
                  <li>Piotr Dardziński</li>
                  <li>Michał Kot</li>
                  <li>Piotr Mieczkowski</li>
                  <li>Joanna Szalacha-Jarmużek</li>
                  <li>Leszek Wojdalski</li>
                </List>
            </ContentColumn>
            <ContentColumn>
                <TitleTeam>Projektowanie i Design:</TitleTeam>
                <List>
                  <li>Katarzyna Grudzień</li>
                  <li>Magdalena Karpińska</li>
                  <li>Tomasz Szczodrowski</li>
                  <li>Przemek Pomaski</li>
                  <li>Jakub Majkowski</li>
                </List>
                <TitleTeam>Baza danych i promocja projektu:</TitleTeam>
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
                    <li>Adam Bajerski</li>
                    <li>Marcin Kawko</li>
                </List>
                  <TitleTeam>Inicjatorzy i pomysłodawcy:</TitleTeam>
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
                  <TitleTeam>Koordynacja:</TitleTeam>
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

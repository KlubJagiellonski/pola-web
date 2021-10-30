import React from 'react';
import { connect, useDispatch } from 'react-redux';
import styled from 'styled-components';

import { PageLayout } from '../layout/PageLayout';
import SEOMetadata from '../utils/browser/SEOMetadata';
import { IPolaState } from '../state/types';
import { LoadBrowserLocation, SelectActivePage } from '../state/app/app-actions';
import { PageType } from '../domain/website';
import { PageSection } from '../layout/PageSection';
import { ColumnsLayout, ContentColumn } from '../layout/ColumnsLayout';
import { PartnerService } from '../domain/partners/partners-service';
import { PartnersList } from '../components/partners/PartnersList';
import { Device, margin, padding } from '../styles/theme';
import { ResponsiveImage } from '../components/images/ResponsiveImage';
import { Text, TitleSection } from '../styles/GlobalStyle.css';

const Title = styled(TitleSection)`
  margin: ${margin.normal} 0;
  text-align: center;
`;

const Wrapper = styled.div`
  margin-top: ${margin.veryBig};
`;

const TextSection = styled(Text)`
  margin: ${margin.big} 0;
  text-align: center;
`;

const ImageSection = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
  align-items: center;
  margin: 0 ${padding.veryBig};
  padding: 0 ${padding.veryBig};

  li {
    flex: 1;
    width: 100%;
    margin: 0 ${padding.veryBig};

    img {
      width: 100%;
    }
  }

  @media ${Device.mobile} {
    padding: 0;
    flex-flow: column;
    max-width: 20em;
    gap: ${padding.normal};
    margin: 0 ${margin.big};

    li {
      margin: 0 ${margin.normal};
    }
  }
`;

interface IPartnersPage {
  location?: Location;
}

const PartnersPage = (props: IPartnersPage) => {
  const { location } = props;
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (location) {
      dispatch(LoadBrowserLocation(location));
      dispatch(SelectActivePage(PageType.PARTNERS));
    }
  }, []);

  return (
    <PageLayout styles={{ marginTop: padding.big }}>
      <SEOMetadata pageTitle="Partnerzy" />
      <ColumnsLayout>
        <ContentColumn fraction={60}>
          <PageSection>
            <Wrapper>
              <Title>Partner aplikacji Pola</Title>
              <ImageSection>
                <li>
                  <ResponsiveImage imageSrc="PGE_logo.png" />
                </li>
                <li>
                  <ResponsiveImage imageSrc="polskie_kupuje.png" />
                </li>
              </ImageSection>
              <TextSection>
                Celem zainicjowanej przez Pracowników oraz Grupę Kapitałową PGE kampanii społecznej POLSKIE – KUPUJĘ TO!
                jest zachęcanie Polaków do kupowania rodzimych produktów i usług. W ramach tego przedsięwzięcia PGE
                wspiera rozwój aplikacji Pola.
              </TextSection>
            </Wrapper>
          </PageSection>
          <PageSection>
            <TitleSection>Partnerzy</TitleSection>
            <PartnersList partners={PartnerService.getAll()} />
          </PageSection>
        </ContentColumn>
        <ContentColumn hideOnMobile={true} fraction={40}></ContentColumn>
      </ColumnsLayout>
    </PageLayout>
  );
};

export default connect((state: IPolaState) => ({ location: state.app.location }), {})(PartnersPage);

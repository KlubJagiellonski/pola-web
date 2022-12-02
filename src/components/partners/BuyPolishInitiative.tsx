import * as React from 'react';

import { urls } from '../../domain/website';
import { ResponsiveImage } from '../../components/images/ResponsiveImage';
import { Device, margin, padding } from '../../styles/theme';
import styled from 'styled-components';
import { ExternalLink } from 'utils/browser/links';
import { Text } from '../../styles/GlobalStyle.css';

const Wrapper = styled.div`
  text-align: center;
  margin-top: ${margin.veryBig};
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const TextSection = styled(Text)`
  margin: ${margin.big} 0;
  text-align: center;
`;

const ImageSection = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  margin: 0 ${padding.veryBig};
  padding: 0 ${padding.veryBig};

  .image-element {
    width: 100%;
    margin: 0 ${padding.veryBig};

    img {
      width: 100%;
    }
  }

  @media ${Device.mobile} {
    padding: 0;
    gap: ${padding.normal};
    margin: 0 ${margin.big};

    .image-element {
      max-width: 18em;
      margin: 0 ${margin.normal};
    }
  }
`;

export interface IBuyPolishInitiative {}

export const BuyPolishInitiative: React.FC<IBuyPolishInitiative> = () => (
  <Wrapper>
    <ImageSection className="images-sections">
      <div className="image-element">
        <ExternalLink url={urls.external.links.pge}>
          <ResponsiveImage imageSrc="PGE_logo.png" />
        </ExternalLink>
      </div>
      <div className="image-element">
        <ExternalLink url={urls.external.links.polskieKupujeTo}>
          <ResponsiveImage imageSrc="polskie_kupuje.png" />
        </ExternalLink>
      </div>
    </ImageSection>
    <TextWrapper>
      <TextSection styles={{ maxWidth: '32rem' }}>
        Celem zainicjowanej przez Pracowników oraz Grupę Kapitałową PGE kampanii społecznej&nbsp;
        <ExternalLink url={urls.external.links.polskieKupujeTo}>
          <span>POLSKIE – KUPUJĘ TO!</span>
        </ExternalLink>
        &nbsp;jest zachęcanie Polaków do kupowania rodzimych produktów i usług. W ramach tego przedsięwzięcia PGE
        wspiera rozwój aplikacji Pola.
      </TextSection>
    </TextWrapper>
  </Wrapper>
);

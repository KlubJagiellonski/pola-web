import { IPartnerData } from 'partners';
import styled from 'styled-components';

import React from 'react';

import { ResponsiveImage } from '@Components/images/ResponsiveImage';

import { PartnerLogo } from './PartnerLogo';

const Tile = styled.div`
  text-align: center;
  width: 100%;

  .title {
    width: 100%;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  padding: 0 2rem;
  margin-bottom: 1rem;
`;

export const PartnerTile: React.FC<IPartnerData> = ({ name, image, description, sourceUrl }) => (
  <Tile>
    <a href={sourceUrl} target="__blank">
      <ImageContainer>
        <PartnerLogo title={name} imageSrc={image} />
      </ImageContainer>
      <p className="title">{description}</p>
    </a>
  </Tile>
);

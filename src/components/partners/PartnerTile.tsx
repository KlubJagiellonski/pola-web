import React from 'react';
import styled from 'styled-components';
import { IPartner } from '../../domain/website';
import { ResponsiveImage } from '../images/ResponsiveImage';

const Tile = styled.div``;

export const PartnerTile: React.FC<IPartner> = ({ name, imageSrc, description, sourceUrl }) => (
  <Tile>
    <a href={sourceUrl} target="__blank">
      <ResponsiveImage imageSrc={imageSrc} />
    </a>
    <span>{description}</span>
  </Tile>
);

import { IPartnerData } from 'partners';
import styled from 'styled-components';

import React from 'react';

import { PartnerTile } from './PartnerTile';

import { Device, padding } from '@Styles/theme';

interface IPartnersList {
  partners: IPartnerData[];
}

const List = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: 0 auto;
  padding: 0;
  gap: 10rem;

  li {
    flex: 1;
    width: 100%;

    img {
      width: 100%;
    }
  }

  @media ${Device.mobile} {
    padding: 0;
    flex-flow: column;
    max-width: 20em;
    gap: 1rem;
  }
`;

export const PartnersList: React.FC<IPartnersList> = ({ partners }) => (
  <List>
    {partners.map((partner) => (
      <PartnerTile key={partner.name} {...partner} />
    ))}
  </List>
);

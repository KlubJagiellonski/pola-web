import styled from 'styled-components';

import React from 'react';

import { color, padding, px } from '@Styles/theme';

import Logo from '@Assets/logo/pola-color.svg';

interface IPolaLogo {
  size?: number;
  alt?: string;
}

export const LogoColor = styled.div`
  background-color: ${color.background.white};
  border-radius: 50%;
  padding: ${padding.normal};
  margin-top: 60px;
  box-shadow: 0 10px 10px -9px ${color.background.secondary};
`;

export const PolaLogo: React.FC<IPolaLogo> = ({ size = 80 }) => (
  <LogoColor>
    <img width={size} height={size} src={Logo} alt="Pola logo" loading="lazy" />
  </LogoColor>
);

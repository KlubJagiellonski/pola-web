import { urls } from 'app/website';
import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

import { PolaLogo } from '../PolaLogo';

import { Device } from '@Styles/theme';

interface INavbarMenu {}

const NavbarLayout = styled.nav`
  @media ${Device.mobile} {
    display: none;
  }

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  flex: 1 1 100%;
  align-items: center;
  height: 100%;
`;

export const NavbarMenu: React.FC<INavbarMenu> = ({ children }) => (
  <NavbarLayout className="navbar-manu">
    <Link 
    to={urls.pola.home()}
    onClick={() => {
      const layout = document.getElementById('layout-container');
      if (layout) {
        layout.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }}
    >
      <PolaLogo />
    </Link>
    {children}
  </NavbarLayout>
);

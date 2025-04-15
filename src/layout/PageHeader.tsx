import styled from 'styled-components';

import React from 'react';
import { ConnectedProps, connect } from 'react-redux';

import { IPolaState } from '@App/state';
import { appDispatcher } from '@App/state/app-dispatcher';
import { ExternalLinkData, PageLinkData, PageType, pageLinks } from 'app/website';

import { HamburgerMenu } from './nav/HamburgerMenu';
import { ExtNavItem, NavItem } from './nav/NavItem';
import { NavbarMenu } from './nav/NavbarMenu';

import { Device, color, desktopHeaderHeight, pageWidth } from '@Styles/theme';

const connector = connect(
  (state: IPolaState) => {
    const { app } = state;
    return {
      activePage: app.activePage,
      isMenuExpanded: app.isMenuExpanded,
    };
  },
  {
    expandMenu: appDispatcher.expandMenu,
  }
);

type ReduxProps = ConnectedProps<typeof connector>;

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
  background: ${color.background.white};
  box-shadow: 0 1px 10px ${color.background.secondary};

  .header-content {
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    max-width: ${pageWidth};
  }

  @media ${Device.mobile} {
    .navbar-menu {
      display: none;
    }
  }
  @media ${Device.desktop} {
    height: ${desktopHeaderHeight};
    .hamburger-menu {
      display: none;
    }
  }
`;

type IPageHeader = ReduxProps & {
  siteTitle?: string;
};

const Header: React.FC<IPageHeader> = ({ siteTitle, activePage, isMenuExpanded, expandMenu }) => {
  const isExternalLink = (link: PageLinkData | ExternalLinkData) => {
    const href = typeof link.url === 'function' ? link.url() : link.url;
    return href.startsWith('http');
  };

  const navItems = pageLinks.map((link) => {
    if (!isExternalLink(link)) {
      return <NavItem key={link.type} data={link} activePage={activePage} />;
    } else {
      return <ExtNavItem key={link.type} data={link} activePage={activePage} />;
    }
  });

  return (
    <HeaderContainer>
      <div className="header-content">
        <NavbarMenu>{navItems}</NavbarMenu>
        <HamburgerMenu expanded={isMenuExpanded} onExpand={expandMenu}>
          {navItems}
        </HamburgerMenu>
      </div>
    </HeaderContainer>
  );
};

export const PageHeader = connector(Header);

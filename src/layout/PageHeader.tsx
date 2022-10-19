import { ExternalLinkData, PageLinkData, PageType, pageLinks } from 'app/website';
import React from 'react';
import styled from 'styled-components';

import { HamburgerMenu } from './nav/HamburgerMenu';
import { ExtNavItem, NavItem } from './nav/NavItem';
import { NavbarMenu } from './nav/NavbarMenu';

import { Device, color, desktopHeaderHeight, pageWidth } from '@Styles/theme';

const HeaderContainer = styled.header`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  position: absolute;
  top: 0;
  z-index: 1;
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

interface IPageHeader {
  siteTitle?: string;
  activePage: PageType;
  isMenuExpanded: boolean;

  onExpand: (expanded: boolean) => void;
}

export const PageHeader = (props: IPageHeader) => {
  const isExternalLink = (link: PageLinkData | ExternalLinkData) => {
    const href = typeof link.url === 'function' ? link.url() : link.url;
    return href.startsWith('http');
  };

  const navItems = pageLinks.map((link) => {
    if (!isExternalLink(link)) {
      return <NavItem key={link.type} data={link} activePage={props.activePage} />;
    } else {
      return <ExtNavItem key={link.type} data={link} activePage={props.activePage} />;
    }
  });

  return (
    <HeaderContainer>
      <div className="header-content">
        <NavbarMenu>{navItems}</NavbarMenu>
        <HamburgerMenu expanded={props.isMenuExpanded} onExpand={props.onExpand}>
          {navItems}
        </HamburgerMenu>
      </div>
    </HeaderContainer>
  );
};

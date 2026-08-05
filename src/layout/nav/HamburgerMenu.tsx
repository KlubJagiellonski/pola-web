import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { urls } from 'app/website';
import { Link } from 'gatsby';
import React, { createRef } from 'react';
import styled from 'styled-components';

import { classNames } from '@Utils/class-names';

import { Device, color, mobileHeaderHeight, padding } from '@Styles/theme';

import LogoColor from '@Assets/logo/pola-color.svg';

const HamburgerLayout = styled.nav`
  background: ${color.background.white};
  @media ${Device.desktop} {
    display: none;
  }

  flex: 1 1 100%;

  height: 100%;

  .nav-items {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    .nav-item {
      font-weight: bolder;
      cursor: pointer;
    }
  }
`;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${padding.small};

  height: ${mobileHeaderHeight};

  .menu-icon {
    cursor: pointer;
  }
`;

const Items = styled.div`
  overflow: hidden;
  height: 0;
  transition: height 0.5s;
  &.open {
    height: 21rem;
  }
`;

interface IHamburgerMenu {
  expanded: boolean;
  onExpand: (expanded: boolean) => void;
}

export const HamburgerMenu: React.FC<IHamburgerMenu> = ({ expanded, children, onExpand }) => {
  const itemsRef = createRef<HTMLDivElement>();

  const handleOpen = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    onExpand(!expanded);
    const items = itemsRef.current;
    items?.classList.toggle('open');
  };

  const handleItemClick = () => {
    onExpand(false);
    const items = itemsRef.current;
    items?.classList.remove('open');
  };

  const handleLogoClick = () => {
    const layout = document.getElementById('layout-container');
    if (layout) {
      layout.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <HamburgerLayout className="hamburger-menu">
      <Navbar>
        <Link to={urls.pola.home()} onClick={handleLogoClick}>
          <img width="auto" height="100%" src={LogoColor} alt="Pola" />
        </Link>
        <FontAwesomeIcon icon={faBars} onClick={handleOpen} className="menu-icon" size="2x" />
      </Navbar>
      <Items ref={itemsRef} className={classNames('nav-items', expanded && 'open')} onClick={handleItemClick}
      >
        {children}
      </Items>
    </HamburgerLayout>
  );
};

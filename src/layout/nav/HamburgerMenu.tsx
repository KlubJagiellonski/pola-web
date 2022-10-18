import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import React, { createRef } from 'react';
import styled from 'styled-components';

import { urls } from '@Domain/website';

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

  return (
    <HamburgerLayout className="hamburger-menu">
      <Navbar>
        <Link to={urls.pola.home()}>
          <img width="auto" height="100%" src={LogoColor} />
        </Link>
        <FontAwesomeIcon icon={faBars} onClick={handleOpen} className="menu-icon" size="2x" />
      </Navbar>
      <Items ref={itemsRef} className={classNames('nav-items')}>
        {children}
      </Items>
    </HamburgerLayout>
  );
};

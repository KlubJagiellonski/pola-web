import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { ExternalLinkData, PageLinkData, PageType } from '../../domain/website';
import { color, Device, margin } from '../../styles/theme';
import { ExternalLink } from '../../utils/browser/links';

const Item = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: center;
  position: relative;
  font-weight: bolder;
  height: 3em;

  a {
    margin-top: ${margin.big};
    z-index: 1;
    color: ${(props) => (props.selected ? color.text.red : color.text.primary)};
    cursor: ${(props) => (props.selected ? 'default' : 'pointer')};
    text-decoration: none;

    @media ${Device.mobile} {
      margin-top: 0;
    }
  }
`;

const Cricle = styled.div`
  background-color: ${color.background.white};
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  z-index: 0;
  position: absolute;
  top: 1rem;
  box-shadow: 0 10px 10px -9px ${color.background.secondary};

  @media ${Device.mobile} {
    display: none;
  }
`;

interface INavItem {
  data: PageLinkData;
  activePage: PageType;
}

export const NavItem: React.FC<INavItem> = ({ data, activePage }) => {
  const selected = data.type === activePage;
  const href = typeof data.url === 'function' ? data.url() : data.url;

  return (
    <Item className={data.type} selected={selected}>
      <Link to={href}>{data.label}</Link>
      {selected && <Cricle />}
    </Item>
  );
};

interface IExtNavItem {
  data: ExternalLinkData;
  activePage: PageType;
}

export const ExtNavItem: React.FC<IExtNavItem> = ({ data, activePage }) => {
  const selected = data.type === activePage;
  const href = typeof data.url === 'function' ? data.url() : data.url;

  return (
    <Item className={data.type} selected={selected}>
      <ExternalLink url={href} newTab={true}>
        {data.label}
      </ExternalLink>
      {selected && <Cricle />}
    </Item>
  );
};

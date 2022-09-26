import React from 'react';
import styled from 'styled-components';

import { color, Device, fontSize, padding, margin } from 'styles/theme';

const Section = styled.div`
  flex: 1 1 25%;

  .link {
    text-decoration: none;
  }

  .text {
    font-size: ${fontSize.normal};
    font-weight: 400;
    line-height: 21px;
    color: ${color.text.light};
  }

  .title {
    font-size: ${fontSize.normal};
    font-weight: bold;
    line-height: 21px;
  }

  .social-rows {
    display: flex;
    flex-direction: row;
  }

  @media ${Device.mobile} {
    background-color: transparent;
    text-align: right;
    margin-right: ${margin.normal};

    .title,
    .social-rows,
    .hide-mobile {
      display: none;
    }

    .logo {
      padding-left: ${padding.normal};
    }
  }

  @media ${Device.desktop} {
    padding: ${padding.normal};
    .hide-desktop {
      display: none;
    }
  }
`;

interface IFooterSection {
  title?: string;
}

export const FooterSection: React.FC<IFooterSection> = ({ title, children }) => (
  <Section>
    <p className="title">{title}</p>
    {children}
  </Section>
);

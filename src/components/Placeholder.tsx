import styled from 'styled-components';

import React from 'react';

import { WrapperSection } from '@Styles/GlobalStyle.css';
import { color, desktopHeaderHeight, fontSize, margin, mobileHeaderHeight, padding } from '@Styles/theme';

const Wrapper = styled(WrapperSection)`
  color: ${color.text.light};
  padding: ${padding.normal};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: ${fontSize.normal};
  font-weight: bold;
  height: ${desktopHeaderHeight};
  margin-bottom: ${margin.normal};

  p {
    margin: 0;
    padding: 0;
  }

  @media (max-width: 768px) {
    height: 72px;
    font-size: ${fontSize.normal};
    font-weight: normal;
    padding: 0;
    position: relative;
    margin-bottom: 0;

    p {
      position: relative;
      top: 6px;
    }
  }
`;

interface IPlaceholder {
  text: string;
}

const Placeholder: React.FC<IPlaceholder> = ({ text }) => {
  return (
    <Wrapper color={color.background.red}>
      <p>{text}</p>
    </Wrapper>
  );
};

export default Placeholder;

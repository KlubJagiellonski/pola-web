import React from 'react';
import styled from 'styled-components';

import { IButtonTheme } from '@Components/buttons/Button';
import { PrimaryButton } from '@Components/buttons/PrimaryButton';

import { color, padding } from '@Styles/theme';

interface ITheme {
  backgroundColor?: string;
  buttonTheme?: IButtonTheme;
}

const Container = styled.div<{ theme?: ITheme }>`
  display: flex;
  flex-flow: row nowrap;
  padding: ${padding.normal} ${padding.normal};
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${color.background.transparencyGrey};
  background-color: ${(props) => props.theme?.backgroundColor || color.background.white};

  .action-btn {
    width: 14rem;
  }
`;

interface IModalAction {
  label: string;
  callback: () => void;
}

interface IProductModalAction {
  action?: IModalAction;
  theme?: ITheme;
  children?: React.ReactNode;
}

export const ProductModalAction: React.FC<IProductModalAction> = ({ action, theme, children }) => (
  <Container theme={theme}>
    <div className="content">{children}</div>
    {action && (
      <PrimaryButton
        styles={theme?.buttonTheme}
        label={action.label}
        className="action-btn"
        onClick={action.callback}
      />
    )}
  </Container>
);

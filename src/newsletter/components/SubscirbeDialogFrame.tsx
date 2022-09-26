import * as React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
  .buttons {
    text-align: center;
  }
  .email-address {
    font-weight: 900;
  }
`;
export interface ISubscibeDialogFrame {
  title?: string;
  children: JSX.Element | JSX.Element[];
  nextActionButton?: JSX.Element;
}

export const SubscibeDialogFrame: React.FC<ISubscibeDialogFrame> = ({ title, children, nextActionButton }) => (
  <Frame className="dialog-frame">
    {title && <h2 className="centered-text">{title}</h2>}
    {children}
    {nextActionButton && <div className="buttons">{nextActionButton}</div>}
  </Frame>
);

import * as React from 'react';

export interface ISubscibeDialogFrame {
  title?: string;
  children: JSX.Element | JSX.Element[];
}

export const SubscibeDialogFrame: React.FC<ISubscibeDialogFrame> = ({ title, children }) => (
  <div className="dialog-frame">
    {title && <h2 className="centered-text">{title}</h2>}
    {children}
  </div>
);

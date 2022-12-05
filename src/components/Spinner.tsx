import styled from 'styled-components';

import React from 'react';
import { Rings } from 'react-loader-spinner';

import { color, pixels } from '@Styles/theme';

const Container = styled.div`
  display: flex;
  flex-flow: column;
  text-align: center;
`;

interface ISpinner {
  text?: string;
  styles?: {
    size?: pixels;
    color?: string;
  };
}

export const Spinner: React.FC<ISpinner> = ({ text, styles = { size: 80, color: color.button.red } }) => (
  <Container>
    <Rings color={styles.color} height={styles.size} width={styles.size} />
    {text && <label>{text}</label>}
  </Container>
);

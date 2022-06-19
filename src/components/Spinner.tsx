import React from 'react';
import { Rings } from 'react-loader-spinner';
import styled from 'styled-components';
import { color, pixels } from '../styles/theme';

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

export const Spinner: React.FC<ISpinner> = ({ text, timeout, styles = { size: 80, color: color.button.red } }) => (
  <Container>
    <Rings color={styles.color} height={styles.size} width={styles.size} />
    {text && <label>{text}</label>}
  </Container>
);

import styled from 'styled-components';
import { Device, pageWidth, padding, color } from '../styles/theme';

interface IColumnsLayout {
  size?: 'narrow' | 'full';
}

export const ColumnsLayout = styled.div<IColumnsLayout>`
  display: flex;
  flex-flow: row nowrap;
  gap: ${padding.big};
  position: relative;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @media ${Device.mobile} {
    padding: 0 ${padding.normal};
    flex-flow: column;
  }
  @media ${Device.desktop} {
    max-width: ${(props) => (props.size === 'full' ? undefined : pageWidth)};
    padding-bottom: ${(props) => (props.size === 'full' ? 0 : padding.normal)};
  }
`;

export const ContentColumn = styled.div<{ hideOnMobile?: boolean }>`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;

  @media ${Device.mobile} {
    display: ${(props) => (props.hideOnMobile ? 'none' : 'block')};
  }
`;
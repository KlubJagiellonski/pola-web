import styled from 'styled-components';

import { Device, color, padding, pageWidth } from '@Styles/theme';

interface IPageSection {
  size?: 'narrow' | 'full';
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    textAlign?: string;
    marginBottom?: string;
  };
}

export const PageSection = styled.section<IPageSection>`
  width: 100%;
  margin: 0 auto;
  background-color: ${({ styles }) => styles?.backgroundColor || 'transparent'};
  color: ${({ styles }) => styles?.textColor || color.text.primary};
  text-align: ${({ styles }) => styles?.textAlign || 'left'};
  position: relative;
  box-sizing: border-box;
  margin-bottom: ${({ styles }) => styles?.marginBottom || 0};

  @media ${Device.mobile} {
    padding: 0 ${padding.tiny};
  }
  @media ${Device.desktop} {
    max-width: ${(props) => (props.size === 'full' ? undefined : pageWidth)};
    padding-bottom: ${(props) => (props.size === 'full' ? 0 : padding.normal)};
  }
`;

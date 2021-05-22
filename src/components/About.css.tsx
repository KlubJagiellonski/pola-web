import styled from 'styled-components';
import { WrapperSection, Text, TitleSection } from '../styles/GlobalStyle.css';
import {padding, margin, color, fontSize} from '../styles/theme';
import { SecondaryButton } from './buttons/SecondaryButton';

export const Wrapper = styled(WrapperSection)`
  min-height: 580px;
  grid-area: about;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column-reverse;
`;

export const MockUp = styled.div`
  background-color: ${color.background.primary};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p{
    margin: 0;
    color: ${color.text.secondary};
    font-size: ${fontSize.small};
  }
`

export const Info = styled.div`
  background-color: ${color.background.dark};
  padding: ${padding.normal} ${padding.big};
`

export const AboutText = styled(Text)`
  color: ${color.text.light};
  margin-top: ${margin.normal};
`

export const AboutTitle = styled(TitleSection)`
  color: ${color.text.light};
`
export const AboutButton = styled(SecondaryButton)`
  margin: ${margin.normal} 0;
`

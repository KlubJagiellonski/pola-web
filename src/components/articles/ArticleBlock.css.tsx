import styled from 'styled-components';
import { WrapperSection, Text, TitleSection } from '../../styles/GlobalStyle.css';
import {Device, fontSize, margin, color} from '../../styles/theme'
import {SecondaryButton } from '../buttons/SecondaryButton';

export const Wrapper = styled(WrapperSection)`
  display: flex;
  flex-direction: row;
  min-height: 300px;
  margin-bottom: 15px;

  @media ${Device.mobile}{
    min-height: 120px;
  }
`;

export const ArticleImage = styled.div<{ img?: string }>`
  width: 50%;
  text-align: left;
`;

export const ArticleSection = styled.div`
  width: 50%;
  margin: 0 15px;

  @media ${Device.mobile} {
    width: 60%;
  }
`;

export const ArticleButton = styled(SecondaryButton)`
  margin-top: ${margin.big};
  font-weight: 300;
  
  @media ${Device.mobile} {
    display: none;
    font-size: ${fontSize.tiny};
  }
`;

export const ArticleDate = styled(Text)`
  color: ${color.text.red};

  @media ${Device.mobile} {
    display: none;
  }
`

export const ArticleTitle = styled(TitleSection)`
  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`

export const ArticleText = styled(Text)`
  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`

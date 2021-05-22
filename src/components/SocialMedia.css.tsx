import styled from 'styled-components';
import { WrapperSection, TitleSection } from '../styles/GlobalStyle.css';
import {Device} from './../styles/theme'

export const Wrapper = styled(WrapperSection)`
  min-height: 100px;
  height: 100%;
  grid-area: social-media;

  @media ${Device.desktop}{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media ${Device.mobile}{
    padding: 30px 0;
  }
`;

export const Items = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  width: 80%;
  float: left;

  @media ${Device.mobile} {
    width: 100%;
  }
`;

export const Item = styled.div`
  flex: 1;
  text-align: center;
`;

export const Title = styled(TitleSection)`
  width: 20%;
  float: left;
  text-align: center;
  margin: 0;

  @media ${Device.mobile} {
    width: 100%;
    margin-bottom: 20px;
  }
`;

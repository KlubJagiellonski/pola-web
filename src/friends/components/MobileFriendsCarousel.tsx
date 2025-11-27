import { IFriendData } from '..';
import { WrapperSection } from '../../styles/GlobalStyle.css';
import { Device, color, fontSize, margin, padding, width } from '../../styles/theme';
import styled from 'styled-components';

import React from 'react';

import { urls } from '@App/website';

import { SliderContainer, SliderElement } from '@Components/SliderComponent';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';

import { FriendLogo } from './FriendLogo';

const Wrapper = styled(WrapperSection)`
  grid-area: friends;
  overflow: hidden;
  border-top: 1px solid ${color.background.gray};

  p {
    margin: 0;
  }
`;

const Image = styled.div`
  height: 5.6em;

  div {
    width: 100%;
    height: 100%;

    // picture {
    img {
      object-fit: contain !important;
    }
    // }
  }
`;

const Element = styled.div`
  opacity: 0.6;
`;

interface IFriends {
  friends?: IFriendData[];
  rows?: number;
}

export const MobileFriendsCarousel: React.FC<IFriends> = ({ friends, rows }) => {
  return (
    <Wrapper>
      <SliderContainer title="Przyjaciele Poli" rows={rows} isMobile={true}>
        {friends?.map((el) => (
          <SliderElement to={"/m/friends"} key={el.id}>
            <Element>
              <Image>{el.image && <FriendLogo title={el.name} imageSrc={el.image} />}</Image>
              {el.slug && <>Zobacz {'>'}</>}
            </Element>
          </SliderElement>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

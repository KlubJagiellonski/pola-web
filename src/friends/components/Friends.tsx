import { urls } from 'app/website';
import React from 'react';
import styled from 'styled-components';

import { FriendData } from '@Domain/friends';

import { SliderContainer, SliderElement } from '@Components/SliderComponent';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';

import { WrapperSection } from '@Styles/GlobalStyle.css';

const Wrapper = styled(WrapperSection)`
  grid-area: friends;
  overflow: hidden;
`;

const Image = styled.div`
  height: 5.6em;

  div {
    width: 100%;
    height: 100%;

    picture {
      img {
        object-fit: contain !important;
      }
    }
  }
`;

const Element = styled.div`
  opacity: 0.6;
`;

interface IFriends {
  friends?: FriendData[];
  rows?: number;
}

const Friends: React.FC<IFriends> = ({ friends, rows }) => {
  return (
    <Wrapper>
      <SliderContainer title="Przyjaciele Poli" rows={rows}>
        {friends?.map((el) => (
          <SliderElement to={urls.pola.friends('friend', el.slug)} key={el.id}>
            <Element>
              <Image>{el.image && <ResponsiveImage imageSrc={el.image} />}</Image>
              {el.slug && <>Zobacz {'>'}</>}
            </Element>
          </SliderElement>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

export default Friends;

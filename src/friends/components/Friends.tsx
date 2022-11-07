import { urls } from 'app/website';
import React from 'react';
import styled from 'styled-components';

import { FriendData } from '@Domain/friends';

import { SliderContainer, SliderElement } from '@Components/SliderComponent';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';

import { WrapperSection } from '@Styles/GlobalStyle.css';
import { FriendLogo } from '@Components/images/FriendLogo';

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
        {friends?.map((friend) => (
          <SliderElement to={urls.pola.friends('friend', friend.slug)} key={friend.id}>
            <Element>
              <Image>{friend.image && <FriendLogo title={friend.name} imageSrc={friend.image} />}</Image>
              {friend.slug && <>Zobacz {'>'}</>}
            </Element>
          </SliderElement>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

export default Friends;

import { IFriendData } from 'friends';
import styled from 'styled-components';

import React from 'react';

import { urls } from 'app/website';

import { SliderContainer, SliderElement } from '@Components/SliderComponent';

import { FriendLogo } from 'friends/components/FriendLogo';

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
  friends: IFriendData[];
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

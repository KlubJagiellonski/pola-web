import { IFriendData } from '..';
import { WrapperSection } from '../../styles/GlobalStyle.css';
import styled from 'styled-components';

import React from 'react';

import { urls } from '@App/website';

import { SliderContainer, SliderElement } from '@Components/SliderComponent';
import { ResponsiveImage } from '@Components/images/ResponsiveImage';

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
  friends?: IFriendData[];
  rows?: number;
}

export const MobileFriendsCarousel: React.FC<IFriends> = ({ friends, rows }) => {
  return (
    <Wrapper>
      <SliderContainer title="Przyjaciele Poli" rows={rows}>
        {friends?.map((el) => (
          <a key={el.id} href={urls.pola.friends('friend', el.slug)} target="_blank">
            <SliderElement to={''}>
              <Element>
                <Image>{el.image && <ResponsiveImage title={el.name} imageSrc={el.image} />}</Image>
                {el.slug && <>Zobacz {'>'}</>}
              </Element>
            </SliderElement>
          </a>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

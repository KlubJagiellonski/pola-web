import React from 'react';
import styled from 'styled-components';

import { WrapperSection } from '../../styles/GlobalStyle.css';
import { Friend } from '../../domain/friends';
import { ResponsiveImage } from '../images/ResponsiveImage';
import { urls } from '../../domain/website';
import { SliderContainer, SliderElement } from '../SliderComponent';
import { Device, color, margin, padding, fontSize, width } from '../../styles/theme';

const Wrapper = styled(WrapperSection)`
  grid-area: friends;
  overflow: hidden;
  border-top: 1px solid ${color.background.gray};
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
  friends?: Friend[];
  rows?: number;
}

export const MobileFriendsCarousel: React.FC<IFriends> = ({ friends, rows }) => {
  return (
    <Wrapper>
      <SliderContainer title="Przyjaciele Poli" rows={rows} isMobile={true}>
        {friends?.map((el) => (
          <a key={el.id} href={urls.pola.friends('friend', el.slug)} target="_blank">
            <SliderElement>
              <Element>
                <Image>{el.image && <ResponsiveImage imageSrc={el.image} />}</Image>
                {el.slug && <>Zobacz {'>'}</>}
              </Element>
            </SliderElement>
          </a>
        ))}
      </SliderContainer>
    </Wrapper>
  );
};

import { urls } from 'app/website';
import Img, { FluidObject } from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

import { SliderElement } from '../SliderComponent';

import { Text } from '@Styles/GlobalStyle.css';
import { Device, fontSize, padding } from '@Styles/theme';

const Image = styled.div`
  height: 5.6em;
  flex-grow: 1;

  .gatsby-image-wrapper {
    width: 100%;
    height: 100%;
    flex-grow: 1;

    picture {
      img {
        object-fit: contain !important;
      }
    }
  }
`;

const Title = styled(Text)`
  margin-bottom: ${padding.small};

  @media ${Device.mobile} {
    font-size: ${fontSize.tiny};
  }
`;

const Slider = styled(SliderElement)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface ISingleBusinessSlider {
  title: string;
  iconFluid: FluidObject | FluidObject[];
  slug: string;
}

export const SingleBusinessSlider: React.FC<ISingleBusinessSlider> = ({ slug, title, iconFluid }) => {
  return (
    <Slider to={urls.pola.business('business-element', slug)}>
      <Title>{title}</Title>
      <Image>
        <Img fluid={iconFluid} />
      </Image>
    </Slider>
  );
};

export default SingleBusinessSlider;

import { IBusinessData } from 'business';
import { useBusinessParams } from 'business/state/business-loader';
import styled from 'styled-components';

import React from 'react';

import { SliderContainer } from '@Components/SliderComponent';

import BusinessElement from './BusinessElement';
import SingleBusinessSlider from './SingleBusinessSlider';

const SliderOrientation = styled.div`
  .slick-slider {
    .slick-list {
      .slick-track {
        display: flex;
        align-items: flex-end;
      }
    }
  }
`;

interface IBusinessElements {
  services: IBusinessData[];
  location: Location
}

const BusinessElements: React.FC<IBusinessElements> = ({ services , location}) => {
  const query = useBusinessParams(location);

  return (
    <>
      <SliderOrientation>
        <SliderContainer rows={1}>
          {services.map((node) => (
            <SingleBusinessSlider key={node.slug} slug={node.slug} title={node.title} imageSrc={node.icon} />
          ))}
        </SliderContainer>
      </SliderOrientation>
      {services
        ?.filter((node) => node.slug === query.value)
        .map((node) => (
          <BusinessElement key={node.slug} html={node.html} title={node.title} imageSrc={node.cover} />
        ))}
    </>
  );
};

export default BusinessElements;

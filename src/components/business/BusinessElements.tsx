import { IBusinessTemplate } from '../../gatsby-templates/BusinessTemplate';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import React from 'react';

import { useQueryParam } from 'posts/services/article-service';

import BusinessElement from './BusinessElement';
import SingleBusinessSlider from './SingleBusinessSlider';
import { SliderContainer } from '@Components/SliderComponent';

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
  data: IBusinessTemplate;
}

const BusinessElements: React.FC<IBusinessElements> = ({ data }) => {
  // const [query, setQuery] = useQueryParams({
  //   value: StringParam,
  // });

  const query = useQueryParam('value', '');

  return (
    <>
      <SliderOrientation>
        <SliderContainer rows={1}>
          {data.allMarkdownRemark.nodes?.map((node) => (
            <SingleBusinessSlider
              key={node.frontmatter.slug}
              slug={node.frontmatter.slug}
              title={node.frontmatter.title}
              iconFluid={node.frontmatter.icon.relativePath}
            />
          ))}
        </SliderContainer>
      </SliderOrientation>
      {data.allMarkdownRemark.nodes
        ?.filter((node) => node.frontmatter.slug === query.value)
        .map((node) => (
          <BusinessElement
            key={node.frontmatter.slug}
            html={node.html}
            imgFluid={node.frontmatter.cover?.relativePath}
          />
        ))}
    </>
  );
};

export default BusinessElements;

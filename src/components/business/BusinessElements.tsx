import { IBusinessTemplate } from '../../templates/BusinessTemplate';
import { SliderContainer } from '../SliderComponent';
import { useLocation } from '@reach/router';
import styled from 'styled-components';
import { StringParam, useQueryParams } from 'use-query-params';

import React from 'react';
import { useEffect } from 'react';

import BusinessElement from './BusinessElement';
import SingleBusinessSlider from './SingleBusinessSlider';

const H = styled.div`
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
  const location = useLocation();
  const [query, setQuery] = useQueryParams({
    value: StringParam,
  });

  useEffect(() => {
    if (!query.value && data.allMarkdownRemark.nodes.length > 0) {
      //setQuery({ value: data.allMarkdownRemark.nodes[0].frontmatter.slug }, 'push');
    }
  }, [query, data]);

  return (
    <>
      <H>
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
      </H>
      {/* {data.allMarkdownRemark.nodes
        ?.filter((node) => node.frontmatter.slug === query.value)
        .map((node) => (
          <BusinessElement
            key={node.frontmatter.slug}
            html={node.html}
            imgFluid={node.frontmatter.cover?.relativePath}
          />
        ))} */}
    </>
  );
};

export default BusinessElements;

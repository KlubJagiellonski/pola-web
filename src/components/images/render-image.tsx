import { GatsbyImage, GatsbyImageProps, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import React from 'react';

import { pixels } from '@Styles/theme';

export interface IResponsiveImage {
  imageSrc: string;
  title: string;
}

export interface IGatsbyImageNode {
  extension: string;
  relativePath: string;
  name: string;
  childImageSharp: {
    id: string;
    gatsbyImageData: IGatsbyImageData;
  };
}

export const renderFromQuery = (imageNodes: IGatsbyImageNode[], imageSrc: string, title: string) => {
  const image = findImage(imageNodes, imageSrc);

  if (!image) {
    return console.error(`Cannot render image "${imageSrc}" from static query`);
  }

  const imageComponent = renderImage(image, title);

  return imageComponent;
};

function findImage(imageNodes: IGatsbyImageNode[], imageSrc: string) {
  try {
    const image = imageNodes.find((node: IGatsbyImageNode) => node.relativePath === imageSrc);
    return image;
  } catch (error: unknown) {
    console.error(`Cannot load image "${imageSrc}"`, error);
    return;
  }
}

function renderImage(image: IGatsbyImageNode, title: string) {
  try {
    const imageMetadata = getImage(image.childImageSharp.gatsbyImageData);
    if (!imageMetadata) {
      return console.error(`Cannot read Gatsby image data "${image.relativePath}"`);
    }

    const component = <GatsbyImage alt={title || 'no title'} image={imageMetadata} />;
    return component;
  } catch (error: unknown) {
    console.error(`Cannot render image "${image.relativePath}"`, error);
    return;
  }
}

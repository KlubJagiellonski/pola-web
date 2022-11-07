import React from 'react';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { pixels } from '@Styles/theme';

export interface IResponsiveImage {
  imageSrc: string;
  title: string;
}

// export interface GatsbyImageSource {
//   srcSet: string;
//   type: string;
//   sizes: string;
// }

// export interface GatsbyImageData {
//   layout: 'fixed' | 'constrained' | 'full-width';
//   backgroundColor: string;
//   images: {
//     fallback: {
//       src: string;
//       srcSet: string;
//       sizes: string;
//     }
//     sources:GatsbyImageSource[];
//   };
//   width: pixels;
//   height: pixels;
// }

export interface IGatsbyImageNode {
  extension: string;
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export const renderFromQuery = (
  imageNodes: IGatsbyImageNode[],
  imageSrc: string,
  title: string
): JSX.Element | undefined => {
  const image = findImage(imageNodes, imageSrc);
  if (image) {
    return renderImage(image, title);
  }

  console.error(`Cannot render image "${imageSrc}" from static query`);
  return;
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
    const gatsbyImage = getImage(image.childImageSharp.gatsbyImageData);
    if (gatsbyImage) {
      const component = <GatsbyImage alt={title} image={gatsbyImage} />;
      return component;
    }

    console.error(`Cannot read Gatsby image data "${image.relativePath}"`);
    return;
  } catch (error: unknown) {
    console.error(`Cannot render image "${image.relativePath}"`, error);
    return;
  }
}

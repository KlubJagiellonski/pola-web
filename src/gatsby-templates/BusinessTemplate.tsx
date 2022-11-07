import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import React from 'react';

import BusinessElements from '@Components/business/BusinessElements';

export interface IGatsbyImageWrapper {
  extension: string;
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

export interface IBusinessTemplate {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          title: string;
          slug: string;
          cover: IGatsbyImageWrapper;
          icon: IGatsbyImageWrapper;
        };
        html: string;
      }
    ];
  };
}

const BusinessTemplate = () => {
  const data: IBusinessTemplate = useStaticQuery(graphql`
    {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/business/" } }) {
        nodes {
          frontmatter {
            title
            slug
            cover {
              extension
              relativePath
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
            icon {
              extension
              relativePath
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
          }
          html
        }
      }
    }
  `);

  return <BusinessElements data={data} />;
};

export default BusinessTemplate;

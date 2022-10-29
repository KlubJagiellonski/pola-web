import { graphql, useStaticQuery } from 'gatsby';
//import { FluidObject } from 'gatsby-image';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';

import BusinessElements from '@Components/business/BusinessElements';

export interface IBusinessTemplate {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          title: string;
          slug: string;
          cover: {
            extension;
            relativePath;
            childImageSharp: {
              gatsbyImageData: any | any[];
            };
          };
          icon: {
            extension;
            relativePath;
            childImageSharp: {
              gatsbyImageData: any | any[];
            };
          };
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

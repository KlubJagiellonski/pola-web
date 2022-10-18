import { graphql, useStaticQuery } from 'gatsby';
import { FluidObject } from 'gatsby-image';
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
            childImageSharp: {
              fluid: FluidObject | FluidObject[];
            };
          };
          icon: {
            childImageSharp: {
              fluid: FluidObject | FluidObject[];
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
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            icon {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
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

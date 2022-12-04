import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, IGatsbyImageData, getImage } from 'gatsby-plugin-image';
import React from 'react';

import BusinessElements from '@Components/business/BusinessElements';
import { IGatsbyImageNode } from '@Components/images/render-image';

export interface IBusinessTemplate {
  allMarkdownRemark: {
    nodes: [
      {
        frontmatter: {
          title: string;
          slug: string;
          cover: IGatsbyImageNode;
          icon: IGatsbyImageNode;
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
              name
              extension
              relativePath
              childImageSharp {
                id
                gatsbyImageData(layout: CONSTRAINED)
              }
            }
            icon {
              name
              extension
              relativePath
              childImageSharp {
                id
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

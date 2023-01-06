import { useLocation } from '@reach/router';
import { IBusinessData } from 'business';
import queryString from 'query-string';

import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

import { IGatsbyNode } from '@App/generics';

import { IGatsbyImageNode } from '@Components/images/render-image';

export interface IBusinessNode extends IGatsbyNode {
  frontmatter: {
    title: string;
    slug: string;
    cover: IGatsbyImageNode;
    icon: IGatsbyImageNode;
  };
  html: string;
}

export interface IBusinessServicesGraph {
  allMarkdownRemark: {
    nodes: IBusinessNode[];
  };
}

export class BusinessLoader {
  public static getAllData() {
    const nodes = BusinessLoader.getAllNodes();
    const services = nodes.map((node) => BusinessLoader.toDataModel(node));
    return services;
  }

  private static getAllNodes() {
    const resultGraph: IBusinessServicesGraph = useStaticQuery(
      graphql`
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
      `
    );

    return resultGraph?.allMarkdownRemark?.nodes;
  }

  private static toDataModel = (node: IBusinessNode): IBusinessData => ({
    id: node.id,
    title: node.frontmatter.title,
    slug: node.frontmatter.slug,
    icon: node.frontmatter.icon.relativePath,
    cover: node.frontmatter.cover.relativePath,
    html: node.html,
  });
}

export interface IBusinessQuery {
  value?: string;
}

export const useBusinessParams = (): IBusinessQuery => {
  const location = useLocation();
  const [storedQuery, setStoredQuery] = useState<IBusinessQuery>({});

  useEffect(() => {
    const parsedSearch = location?.search ? queryString.parse(location.search, { arrayFormat: 'comma' }) : undefined;
    const query: IBusinessQuery = {
      value: typeof parsedSearch?.value === 'string' ? parsedSearch.value : undefined,
    };
    setStoredQuery(query);
  }, [location]);

  return storedQuery;
};

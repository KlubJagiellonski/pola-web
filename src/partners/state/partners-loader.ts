import { IPartnerData } from '..';

import { graphql, useStaticQuery } from 'gatsby';

import { IGatsbyNode } from '@App/generics';

export interface IPartnerNode extends IGatsbyNode {
  name: string;
  description: string;
  imageSrc: {
    base: string;
  };
  sourceUrl: string;
}

export interface IPartnersGraph {
  allPartnersYaml: {
    nodes: IPartnerNode[];
  };
}

export class PartnersLoader {
  public static getAllData() {
    const nodes = PartnersLoader.getAllNodes();
    const partners = nodes.map((node) => PartnersLoader.toDataModel(node));
    return partners;
  }

  private static getAllNodes() {
    const resultGraph: IPartnersGraph = useStaticQuery(
      graphql`
        {
          allPartnersYaml {
            nodes {
              id
              name
              description
              imageSrc {
                base
              }
              sourceUrl
            }
          }
        }
      `
    );

    return resultGraph?.allPartnersYaml?.nodes;
  }

  private static toDataModel = (node: IPartnerNode): IPartnerData => ({
    id: node.id,
    name: node.name,
    image: node.imageSrc.base,
    description: node.description,
    sourceUrl: node.sourceUrl,
  });
}

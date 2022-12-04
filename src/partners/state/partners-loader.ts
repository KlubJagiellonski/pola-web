import { IPartnerData } from '..';
import { urls } from '../../app/website';

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

// const partners: IPartnerData[] = [
//   {
//     name: 'Klub Jagielloński',
//     imageSrc: 'logo_cakjv2_crop.png',
//     description: 'Opracowanie algorytmu i wydawanie aplikacji',
//     sourceUrl: urls.external.links.klubJagiellonski.href,
//   },
//   {
//     name: 'Instytut Logistyki i Magazynowania',
//     imageSrc: 'logo_logistyka.png',
//     description: 'Baza kodów kreskowych i producentów',
//     sourceUrl: urls.external.links.instytutLogistyki.href,
//   },
//   {
//     name: 'Koduj dla Polski',
//     imageSrc: 'logo_kodujdlapolski.png',
//     description: 'Otwarte spotkania projektowe dla programistów',
//     sourceUrl: urls.external.links.mojePanstwo.href,
//   },
// ];

// export const PartnerService = {
//   getAll: (): IPartnerData[] => partners,
// };

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

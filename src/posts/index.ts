import { IGatsbyNode, IReduxData } from '@App/generics';

import { encodeStringToBase64 } from 'posts/services/url-service';

export const mapArticlesToDataModel = (nodes: IArticleNode[]): IArticleData[] =>
  nodes.map((node) => ({
    id: node.id,
    title: node.title,
    subTitle: node.subTitle,
    slug: node.slug,
    date: node.date,
    imagePath: node.cover.url,
    tag: node.category,
    urlTag: node.category ? encodeStringToBase64(node.category) : undefined,
  }));

export interface IArticleNode extends IGatsbyNode {
  id: string;
  title: string;
  subTitle: string;
  date: string;
  slug: string;
  category: string;
  cover: {
    url: string
  }
  html? : {
    raw: string
    references: {
      url: string
      contentful_id: string
      title: string
    }
  }
}

export interface IArticleData extends IReduxData {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  date?: string;
  imagePath?: string;
  tag?: string;
  urlTag?: string;
}

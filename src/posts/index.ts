import { IGatsbyNode, IReduxData } from '@App/generics';

import { IGatsbyImageNode } from '@Components/images/render-image';

import { encodeStringToBase64 } from 'posts/services/url-service';

export const mapArticlesToDataModel = (nodes: IArticleNode[]): IArticleData[] =>
  nodes.map((node) => ({
    id: node.id,
    title: node.frontmatter.title,
    subTitle: node.frontmatter.subTitle,
    slug: node.fields.slug,
    date: node.fields.prefix,
    imagePath: node.frontmatter.cover.relativePath,
    tag: node.frontmatter.category,
    urlTag: node.frontmatter.category ? encodeStringToBase64(node.frontmatter.category) : undefined,
  }));

export interface IArticleNode extends IGatsbyNode {
  id: string;
  html: any;
  wordCount: {
    paragraphs: number;
    sentences: number;
    words: number;
  };
  fields: {
    prefix: string;
    slug: string;
  };
  frontmatter: {
    title: string;
    subTitle: string;
    category: string;
    cover: IGatsbyImageNode;
  };
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
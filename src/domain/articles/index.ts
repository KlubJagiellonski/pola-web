import { IGatsbyNode, IReduxData } from '@State/app';

import { encodeStringToBase64 } from 'posts/services/url-service';

export const mapArticlesToDataModel = (nodes: IArticleNode[]): ArticleData[] =>
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
    cover: {
      extension: string;
      name: string;
      childImageSharp: {
        id: string;
        gatsbyImageData: {
          layout: string;
          // width: number;
          // height: number;
          aspectRatio: number;
        };

        // fixed: {
        //   src: string;
        //   width: number;
        //   height: number;
        // };
        // fluid: {
        //   src: string;
        //   presentationWidth: number;
        //   presentationHeight: number;
        //   aspectRatio: number;
        // };
      };
      relativePath: string;
    };
  };
}

export interface ArticleData extends IReduxData {
  id: string;
  title: string;
  subTitle: string;
  slug: string;
  date?: string;
  imagePath?: string;
  tag?: string;
  urlTag?: string;
}

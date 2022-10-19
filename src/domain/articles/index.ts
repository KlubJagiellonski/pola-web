import { IGatsbyNode, IReduxData } from '@State/app';

export class Article {
  public id: string;
  public title: string;
  public subTitle: string;
  public slug: string;
  public date?: string;
  public imagePath?: string;
  public tag: string;

  constructor(data: IArticleNode) {
    this.id = data.id;
    this.title = data.frontmatter.title;
    this.subTitle = data.frontmatter.subTitle;
    this.slug = data.fields.slug;
    this.date = data.fields.prefix;
    this.imagePath = data.frontmatter.cover.relativePath;
    this.tag = data.frontmatter.category;
  }

  public static fromNode(node: IArticleNode): Article {
    return new Article(node);
  }

  public toDataModel = (): ArticleData => ({
    id: this.id,
    title: this.title,
    subTitle: this.subTitle,
    slug: this.slug,
    date: this.date,
    imagePath: this.imagePath,
    tag: this.tag,
  });
}

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
        fixed: {
          src: string;
          width: number;
          height: number;
        };
        fluid: {
          src: string;
          presentationWidth: number;
          presentationHeight: number;
          aspectRatio: number;
        };
      };
      relativePath: string;
    };
  };
}

export interface ArticleData extends IReduxData {
  title: string;
  subTitle: string;
  slug: string;
  date?: string;
  imagePath?: string;
  tag: string;
}

import { ContentfulRichTextGatsbyReference, RenderRichTextData } from 'gatsby-source-contentful/rich-text';

export type ContentfulRichText = RenderRichTextData<ContentfulRichTextGatsbyReference>;

export const EmptyRichText: ContentfulRichText = { raw: '', references: [] };

export type ContentfulQuestion = {
  order: number;
  categoryId: string;
  title: string;
  options: {
    name: string;
    score: number;
  }[];
};

export type ContentfulSurvey = {
  title: string;
  description: ContentfulRichText;
  automaticCalculationMessage: ContentfulRichText;
  invalidOptionsMessage: ContentfulRichText;
  manualCalculationMessage: ContentfulRichText;
  questions: ContentfulQuestion[];
};

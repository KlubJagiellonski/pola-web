import { graphql, useStaticQuery } from 'gatsby';

import { ContentfulSurvey } from '@Utils/contentful';

export const SurveyService = {
  getAllSurveys: (): ContentfulSurvey[] => {
    const query = useStaticQuery(
      graphql`
        {
          allContentfulSurveys {
            nodes {
              title
              description {
                raw
              }
              automaticCalculationMessage {
                raw
              }
              invalidOptionsMessage {
                raw
              }
              manualCalculationMessage {
                raw
              }
              questions {
                order
                categoryId
                title
                options {
                  score
                  name
                }
              }
            }
          }
        }
      `
    );

    return query.allContentfulSurveys.nodes as ContentfulSurvey[];
  },
};

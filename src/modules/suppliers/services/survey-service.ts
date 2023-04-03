import { useLocation } from '@reach/router';
import { IArticleData } from 'posts';
import queryString from 'query-string';
import { ArrayParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';

import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';

export const SurveyService = {
  getAll: () => {
    const c = useStaticQuery(
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

    return c.allContentfulSurveys.nodes[0];
  },
};

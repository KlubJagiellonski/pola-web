import { useLocation } from "@reach/router";
import { graphql, useStaticQuery } from "gatsby";
import { useEffect, useState } from "react";
import { useQueryParams, NumberParam } from "use-query-params";
import queryString from "query-string";

export interface IArticleQuery {
  page: number;
}

export const buildMaterialsQuery = (
  query: IArticleQuery
): string | undefined => {
  const { page } = query;
  let url = "";
  const hasAnyParameters = !!page;

  if (hasAnyParameters) {
    const pageSegment = page ? `page=${page}` : "";

    url += `?${pageSegment}`;
  }

  return url;
};

export const MaterialsService = {
  getAll: () =>
    useStaticQuery(
      graphql`
        {
          allContentfulMaterials(limit: 1000) {
            nodes {
              title
              id
              description {
                childMarkdownRemark {
                  html
                }
              }
              file {
                url
              }
              prevImage {
                url
                title
              }
            }
          }
        }
      `
    ),
};

export interface IMaterialQuery {
  page: number;
}

export const useMaterialsParams = (
  withUseQueryParams: boolean = false
): IMaterialQuery => {
  const location = useLocation();
  if (withUseQueryParams) {
    const [query, setQuery] = useQueryParams({
      page: NumberParam,
    });

    return query as IMaterialQuery;
  } else {
    const [storedQuery, setStoredQuery] = useState<IMaterialQuery>({ page: 1 });

    useEffect(() => {
      const parsedSearch = location?.search
        ? queryString.parse(location.search, { arrayFormat: "comma" })
        : undefined;
      const query: IMaterialQuery = {
        page:
          parsedSearch?.page && !Array.isArray(parsedSearch.page)
            ? parseInt(parsedSearch.page)
            : 1,
      };
      setStoredQuery(query);
    }, [location]);

    return storedQuery;
  }
};

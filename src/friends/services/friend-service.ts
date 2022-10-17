import { graphql, useStaticQuery } from 'gatsby';

export const FriendsService = {
  getAll: () =>
    useStaticQuery(
      graphql`
        {
          allFriendsYaml {
            nodes {
              id
              name
              description
              image {
                base
              }
              page
              slug
            }
          }
        }
      `
    ),
};

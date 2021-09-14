const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  const config = getConfig();
  config.devServer.proxy = {
    '/a': 'https://www.pola-app.pl/a',
  };
  // This will completely replace the webpack config with the modified object.
  actions.replaceWebpackConfig(config);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    const separtorIndex = ~slug.indexOf('--') ? slug.indexOf('--') : 0;
    const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
    createNodeField({
      node,
      name: `slug`,
      value: `${separtorIndex ? '/' : ''}${slug.substring(shortSlugStart)}`,
    });
    createNodeField({
      node,
      name: `prefix`,
      value: separtorIndex ? slug.substring(1, separtorIndex) : '',
    });
  }
};

exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMarkdownRemark(filter: { fileAbsolutePath: { regex: "//posts//" } }, limit: 1000) {
          edges {
            node {
              id
              fields {
                slug
                prefix
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    console.log(result.errors);
    throw new Error('Unable to fetch pages');
  }

  const articleTemplate = path.resolve('./src/templates/ArticleTemplate.tsx');

  // Create articles
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    const { slug } = edge.node.fields;

    createPage({
      path: slug,
      component: articleTemplate,
      context: {
        slug,
      },
    });
  });
};

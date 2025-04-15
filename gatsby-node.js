const path = require('path');
// const { createFilePath } = require(`gatsby-source-filesystem`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const fs = require('fs-extra');

exports.onPostBuild = async () => {
  const filesToCopy = ['google1de6e0bf81fe0e15.html'];

  filesToCopy.forEach((file) => {
    const destination = path.join(__dirname, 'public', path.basename(file));
    fs.copySync(file, destination);
  });

  console.log('Files copied to public folder:', filesToCopy.join(', '));
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  // if (node.internal.type === `MarkdownRemark`) {
  //   const slug = createFilePath({ node, getNode, basePath: `pages` });
  //   const separtorIndex = ~slug.indexOf('--') ? slug.indexOf('--') : 0;
  //   const shortSlugStart = separtorIndex ? separtorIndex + 2 : 0;
  //   createNodeField({
  //     node,
  //     name: `slug`,
  //     value: `${separtorIndex ? '/' : ''}${slug.substring(shortSlugStart)}`,
  //   });
  //   createNodeField({
  //     node,
  //     name: `prefix`,
  //     value: separtorIndex ? slug.substring(1, separtorIndex) : '',
  //   });
  // }
};

exports.createPages = async function ({ graphql, actions }) {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allContentfulPosts {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    console.error(result.errors);
    throw new Error('Unable to fetch pages');
  }

  const articleTemplate = path.resolve('./src/gatsby-templates/ArticleTemplate.tsx');

  // Create articles
  result.data.allContentfulPosts.edges.forEach((edge) => {
    const { slug } = edge.node;

    createPage({
      path: slug,
      component: articleTemplate,
      context: {
        slug,
      },
    });
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
    plugins: [
      // hack source: https://robertmarshall.dev/blog/fix-warn-chunk-commons-mini-css-extract-plugin-error-in-gatsby-js/
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};

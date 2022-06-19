require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  pathPrefix: (process.env.PUBLIC_URL && new URL(process.env.PUBLIC_URL).pathname) || null,
  siteMetadata: {
    title: `Pola Web`,
    description: `Strona aplikacji Pola`,
    author: `Klub Jagielloński`,
    siteUrl: (process.env.PUBLIC_URL && new URL(process.env.PUBLIC_URL).origin) || 'http://localhost:8000',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['UA-68999963-1'],
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    // generic images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/`,
      },
    },
    // images for articles
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/posts/`,
      },
    },
    //image for logos friends
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/content/logos/images/`,
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        // issue: https://github.com/gatsbyjs/gatsby/issues/21776
        checkSupportedExtensions: false,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#D8152F`,
        display: `minimal-ui`,
        icon: `src/assets/logo/pola-color.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/createStore',
        serialize: {
          space: 0,
          isJSON: true,
          unsafe: false,
        },
        cleanupOnClient: true,
        windowKey: '__PRELOADED_STATE__',
      },
    },
    // Markdown
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `business`,
        path: `${__dirname}/content/business`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml-full`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/logos`,
      },
    },
    {
      resolve: `gatsby-transformer-yaml-full`,
      options: {
        plugins: [
          {
            resolve: `gatsby-yaml-full-file`,
            options: {
              path: `${__dirname}/content/logos`,
            },
          },
        ],
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/faq`,
      },
    },
    `gatsby-plugin-anchor-links`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-plugin-sharp`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              backgroundColor: 'transparent',
            },
          },
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: '@sentry/gatsby',
      dsn: 'https://76785631b189463b86823d54c0cffc44@o1100740.ingest.sentry.io/6126100',
      tracesSampleRate: 1.0,
      sampleRate: 1.0,
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['UA-68999963-1'],
        gtagConfig: {
          optimize_id: 'OPT_CONTAINER_ID',
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          exclude: [],
        },
      },
    },
  ],
  // shadowing API request domain for development
  // https://www.gatsbyjs.com/docs/api-proxy/
  proxy: [
    {
      prefix: '/a',
      url: 'https://www.pola-app.pl',
    },
  ],
};

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
  flags: {
    FAST_DEV: false,
    DEV_SSR: false,
    PRESERVE_FILE_DOWNLOAD_CACHE: false,
    PARALLEL_SOURCING: false,
    DETECT_NODE_MUTATIONS: false,
  },
  plugins: [
    'gatsby-plugin-use-query-params',
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,

    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        // The option defaults to true
        // issue: https://github.com/gatsbyjs/gatsby/issues/21776
        checkSupportedExtensions: false,
      },
    },
    // generic images
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `asset-images`,
        path: `${__dirname}/src/assets/`,
      },
    },
    // images for articles
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `article-images`,
        path: `${__dirname}/content/posts/`,
      },
    },
    //images for friends' logos
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `friend-images`,
        path: `${__dirname}/content/friends/logos/`,
      },
    },
    //images for partners' logos
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `partner-images`,
        path: `${__dirname}/content/partners/logos/`,
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#D8152F`,
        display: `minimal-ui`,
        icon: `./src/assets/logo/pola-color.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/app/state/index',
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
    `gatsby-transformer-remark`,
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `suppliers`,
        path: `${__dirname}/content/suppliers`,
      },
    },
    `gatsby-transformer-remark`,

    // YAML
    `gatsby-transformer-yaml-full`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/friends`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/friends/logos`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/partners`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/partners/logos`,
      },
    },

    // JSON
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
      resolve: `gatsby-plugin-tsconfig-paths`,
      options: {
        configFile: `${__dirname}/tsconfig.json`,
        silent: true,
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
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
        pluginConfig: {
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `webviews`,
        path: `${__dirname}/webviews/`,
      },
    },
    {
      resolve: 'gatsby-plugin-copy-files',
      options: {
        source: `${__dirname}/webviews/`,
        destination: 'm',
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

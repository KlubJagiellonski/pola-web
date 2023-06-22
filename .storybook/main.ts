import type { StorybookConfig } from '@storybook/react-webpack5';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

const storybookConfiguration: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config, mode) => {
    // config.resolve?.modules?.push(path.resolve(__dirname, '../src'));
    config.resolve?.plugins?.push(new TsconfigPathsPlugin());
    return config;
  },
};
export default storybookConfiguration;

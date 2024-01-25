import type { StorybookConfig } from '@storybook/angular';

const config: StorybookConfig = {
  stories: ['../src/app/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [
    { from: '../src/assets', to: '/assets' },
    { from: '../../../node_modules/@mdi/angular-material/mdi.svg', to: '/assets/mdi/mdi.svg' },
    { from: '../../../node_modules//cesium/Build/Cesium', to: '/assets/cesium' }
  ],
  docs: {
    autodocs: true,
    defaultName: 'Docs',
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs

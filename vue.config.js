const path = require('path');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/spacex' : '/',
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/global.scss')],
    },
  },
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {

  },
  configureWebpack: {
    plugins: [
      new VuetifyLoaderPlugin(),
    ],
  },
};

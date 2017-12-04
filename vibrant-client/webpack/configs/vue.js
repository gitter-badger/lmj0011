// require('dotenv').load();
const path = require('path');

console.log('process.env.VIBRANT_SERVICE_ENDPOINT', process.env.VIBRANT_SERVICE_ENDPOINT)

module.exports = {
  // context: path.resolve('./src/vue-components'),

  entry: './src/vue-components/vue-components.js',

  output: {
    path: path.resolve('./dist/js'),
    filename: 'vue-components.bundle.js',
  },

  externals: {
        "vue": "Vue"
    },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'string-replace-loader',
          query: {
            multiple: [
               { search: 'process.env.VIBRANT_SERVICE_ENDPOINT', replace: process.env.VIBRANT_SERVICE_ENDPOINT }
            ]
          }
        }],
      },

      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        }],
      },

      {
        test: /\.vue$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'vue-loader',
          options: {
            loaders: {
              js: 'babel-loader?presets[]=env'
            },
          },

        }],
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },

      // Loaders for other file types can go here
    ],
  },

  devtool: 'source-map'
};

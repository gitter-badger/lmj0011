const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'path to where the files are'),

  entry: {
    'example-bundle.js': ['./example1.js', './example2.js'],
  },

  output: {
    // path: path.resolve(__dirname, './resources/assets/js/webpack-test/dist'),
    path: path.resolve(__dirname, '../../public/js'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'es2016', 'es2017'],
          },
        }],
      },

      // Loaders for other file types can go here
    ],
  },
};

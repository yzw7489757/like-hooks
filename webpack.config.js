const path = require('path');

const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve('lib'),
    filename: 'index.js',
    library: 'like-hooks',
    libraryTarget: 'umd',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      hooks: resolve('src/hooks'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};

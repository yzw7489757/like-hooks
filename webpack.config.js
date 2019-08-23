const path = require('path');

module.export = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'lib/'),
    filename: 'index.js',
    library: 'like-hooks',
    libraryTarget: 'umd',
  },
  external: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      hooks: path.resolve(__dirname, 'hooks'),
    },
  },
  module: {
    rule: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src/'),
        use: ['babel-loader', 'eslint-loader'],
      },
    ],
  },
};

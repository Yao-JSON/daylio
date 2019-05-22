const path = require('path');

const fileLoader = name => ({
  loader: 'file-loader',
  options: {
    publicPath: '',
    context: path.resolve(__dirname, '../src'),
    name
  }
});

module.exports = [
  {
    test: /\.ts$/,
    include: path.resolve(__dirname, './../src/'),
    exclude: /node_modules/,
    use: [
      'cache-loader',
      'babel-loader',
      'ts-loader',
    ],
  },
  {
    test: /.wxml/,
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /.js/,
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /.wxss/,
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader',
    ]
  },
  {
    test: /\.less$/,
    use: [
      fileLoader('[path][name].wxss'),
      {
        loader: 'postcss-loader',
        options: {
          plugins: loader => [
            require('cssnano')(),
            require('autoprefixer')()
          ]
        }
      },
      'less-loader'
    ]
  },
  {
    test: /\.json/,
    type: 'javascript/auto',
    use: [
      fileLoader('[path][name].[ext]'),
      'mini-program-webpack-loader'
    ]
  },
  {
    test: /\.(png|jpg|gif)$/,
    include: /src/,
    use: fileLoader('[path][name].[ext]')
  }
];

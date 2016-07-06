var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,

  debug: true,

  devServer: {
    contentBase: './dist',
    inline: true,
    port: 3000,
    stats: {
      assets: false,
      chunks: true,
      chunkModules: false,
      colors: true,
      hash: false,
      timings: true,
      version: false
    }
  },

  devtool: '#cheap-module-eval-source-map',

  entry: path.join(__dirname, 'DEV_ONLY', 'App.js'),

  eslint:{
    configFile: './.eslintrc',
    emitError: true,
    failOnError: true,
    failOnWarning: false,
    formatter: require('eslint-friendly-formatter')
  },

  module: {
    preLoaders: [
      {
        exclude: [
            /node_modules/
        ],
        include: [
          /src/,
          /DEV_ONLY/
        ],
        loader: 'eslint',
        test: /\.js$/
      }
    ],

    loaders: [
      {
        loader: 'json',
        test: /\.json$/
      }, {
        exclude: [
          /node_modules/
        ],
        include: [
          /src/,
          /DEV_ONLY/
        ],
        loader: 'babel-loader',
        test: /\.js$/
      }
    ]
  },

  output: {
    filename: 'prisma.js',
    library: 'prisma',
    libraryTarget: 'umd',
    path: path.join(__dirname, '/dist')
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }
    })
  ],

  resolve: {
    extensions: [
      "",
      '.js'
    ],

    /* Allows you to require('models/myModel') instead of needing relative paths */
    fallback : [
      path.join(__dirname, 'src')
    ],

    root : __dirname
  }
};

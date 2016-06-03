var path = require('path'),
    webpack = require('webpack');

module.exports = {
  cache: true,

  debug: true,

  devtool: '#cheap-module-eval-source-map',

  entry: path.join(__dirname, 'src', 'index.js'),

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
        exclude: /scss/,
        include: [
          /src/,
          /public\/js/
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
        include: [
          /src/,
          /public\/js/
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
    path: path.join(__dirname, '/dist'),
    umdNamedDefine: true
  },

  plugins: [
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

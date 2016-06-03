var path = require('path'),
    webpack = require('webpack');

module.exports = {
  cache: false,

  debug: false,

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
    filename: 'prisma.min.js',
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
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        booleans:true,
        conditionals:true,
        drop_console:true,
        drop_debugger:true,
        join_vars:true,
        screw_ie8:true,
        sequences:true,
        warnings:false
      },
      mangle:{
        screw_ie8:true
      },
      sourceMap:false
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

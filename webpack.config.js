const pkg = require('./package.json')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TARGET = process.env.npm_lifecycle_event
const PROD = TARGET == 'build'

const url = require('postcss-url')
const fontMagician = require('postcss-font-magician')
const cssnext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const responsiveType = require('postcss-responsive-type')

module.exports = {
  context: __dirname,
  devtool: PROD ? 'eval' : 'source-map',
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.json', '.css']
  },

  module: {
    preLoaders: [
      { test: /\.js?$/, loader: 'eslint', include: /src/ }
    ],
    loaders: [
      { test: /\.js$/, loader: 'babel', include: /src/ },
      { test: /\.css$/, loaders: ['style', 'css', 'postcss']  },
      { test: /\.(png|jpg|eot|ttf|woff|woff2|svg)/, loader: 'file-loader' },
      { test: /\.(json|xml)/, loader: 'file-loader' }
    ]
  },

  postcss: [
    postcssImport({
      addDependencyTo: webpack,
      transform: content => content
          .split('\n')
          .reduce((lines, line) => {
            return /@import/.test(line) ? [line].concat(lines) : lines.concat(line)
          }, [])
          .join('\n')
    }),
    cssnext({
      features: { rem: false }
    }),
    responsiveType(),
    fontMagician(),
    url()
  ],

  devServer: {
    https: true,
    hot: true,
    inline: true,
    quiet: false,
    noInfo: false,
    stats: { colors: true },
    host: '0.0.0.0',
    historyApiFallback: true,
    port: 3000
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(PROD ? 'production' : 'development'),
      __VERSION__: JSON.stringify(pkg.version)
    }),
    new HtmlWebpackPlugin({
      inject: false,
      file: '200.html',
      template: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'index.html'
    })
  ]
}

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  glob = require('glob'),
  PurgecssPlugin = require('purgecss-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  // StyleLintPlugin = require('stylelint-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src')
};

const config = {
  context: __dirname,

  entry: {
    common: './src/index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },

  devtool: 'source-map',

  externals: {
    jquery: 'jQuery'
  },

  devServer: {
    compress: true,
    port: 8000,
    contentBase: './dist'
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /(node_modules)/,
      //   use: {
      //     loader: 'eslint-loader'
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader?limit=20000',
        options: {
          outputPath: 'fonts',
          publicPath: '../fonts',
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|ttf|svg|gif|)$/,
        loader: 'file-loader?limit=20000',
        options: {
          name: '[name].[ext]',
          outputPath: 'images',
          publicPath: 'images',
          useRelativePaths: true
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
            root: path.resolve(__dirname, 'src'),
            minimize: false,
            minify: false
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded'
            }
          }
        ]
      }
    ]
  },

  plugins: [
    //new StyleLintPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/main.css' }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    // }),
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: __dirname + '/src/html/index.html'
    })
  ],

  optimization: {
    minimize: false
    // minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()]
  }
};

module.exports = config;

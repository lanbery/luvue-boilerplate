'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { VueLoaderPlugin } = require("vue-loader");
const { transformToRequire, analyzOption } = require("./vue-loader.conf");
const VuetifyLoaderPlugin  = require('vuetify-loader/lib/plugin')
const { default: chalk } = require('chalk')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath("js/[name].[chunkhash].js"),
    chunkFilename: utils.assetsPath("js/[id].[chunkhash].js")
  },
  optimization: {
    // Setting optimization.runtimeChunk to true adds an additonal chunk to each entrypoint containing only the runtime.
    // The value single instead creates a runtime file to be shared for all generated chunks
    runtimeChunk: "single",
    minimize: env === "production" ? true : false, // only Production Mode compress js
    //see detail http://webpack.html.cn/plugins/split-chunks-plugin.html
    splitChunks: {
      chunks: "all", //officail sugguest
      minSize: 30000, //module >=30k 会被抽离到公共模块,
      minChunks: 1, //module 出现1次就抽离到公共模块
      maxAsyncRequests: 5, //异步模块,一次最多只能被加载5个,
      maxInitialRequests: 3, //入口模块最多只能加载3个
      name: true, //拆分出来块的名字(Chunk Names)，默认由块名和hash值自动生成；设置为true则表示根据模块和缓存组秘钥自动生成
      automaticNameDelimiter: "~", //打包分隔符
      cacheGroups: {
        default: {
          minChunks: 2,
          reuseExistingChunk: true
        },
        //packing repeat coding
        vendors: {
          chunks: "all",
          test: /(vue|vue-i18n|vue-router)/,
          minChunks: 2,
          priority: 100,
          name: "vendors"
        },
        // vuetify: {
        //   // 将体积较大的vuetify单独提取包，指定页面需要的时候再异步加载
        //   test: /vuetify/,
        //   priority: 100, // 设置高于async-commons，避免打包到async-common中
        //   name: "vuetify",
        //   chunks: "async"
        // },
        //packing 异步加载的lib
        "async-commons": {
          chunks: "async",
          minChunks: 2,
          priority: 90,
          name: "async-commons"
        },
        //packing third dependencies lib package
        commons: {
          chunks: "all",
          name: "commons",
          minChunks: 2,
          priority: 80
        }
      }
    }
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      "process.env": env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    // new ExtractTextPlugin({
    //   filename: utils.assetsPath("css/[name].[contenthash].css"),
    //   // Setting the following option to `false` will not extract CSS from codesplit chunks.
    //   // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
    //   // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
    //   // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
    //   allChunks: true
    // }),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash].css"),
      allChunks: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename:
        process.env.NODE_ENV === "testing" ? "index.html" : config.build.index,
      template: "index.html",
      inject: true,
      favicon: path.resolve("favicon.ico"),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: "dependency"
    }),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   minChunks(module) {
    //     // any required modules inside node_modules are extracted to vendor
    //     return (
    //       module.resource &&
    //       /\.js$/.test(module.resource) &&
    //       module.resource.indexOf(path.join(__dirname, "../node_modules")) === 0
    //     );
    //   }
    // }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "manifest",
    //   minChunks: Infinity
    // }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "app",
    //   async: "vendor-async",
    //   children: true,
    //   minChunks: 3
    // }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "../static"),
        to: config.build.assetsSubDirectory,
        ignore: [".*"]
      }
    ]),
    new VueLoaderPlugin(),
    // see https://vuetifyjs.com/zh-Hans/customization/a-la-carte/#vueconfigjs-installation
    new VuetifyLoaderPlugin({
      match(originalTag, { kebabTag, camelTag, path, component }) {
        if (kebabTag.startsWith("core-")) {
          return [
            camelTag,
            `import ${camelTag} from '@/components/core/${camelTag.substring(
              4
            )}.vue'`
          ];
        }
      }
    })
  ]
});

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  console.log(
    chalk.bgGreen(
      "process.env.npm_config_report",
      process.env.npm_config_report
    )
  );
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(
    new BundleAnalyzerPlugin(Object.assign(analyzOption,{
      analyzerPort: 8889,
      openAnalyzer: true
    }))
  );
}

module.exports = webpackConfig

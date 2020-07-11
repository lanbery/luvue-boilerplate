'use strict'
const utils = require('./utils')
const config = require('../config')
const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap

const statsPath = path.resolve(__dirname,'../build/',"stats.json")

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ["src", "poster"],
    source: "src",
    img: "src",
    image: "xlink:href"
  },
  analyzOption: {
    analyzerMode:'json',
    analyzerPort: 8964,
    openAnalyzer: true,
    statsFilename: statsPath,
    generateStatsFile: true
  }
};

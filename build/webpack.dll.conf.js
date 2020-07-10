const webpack = require("webpack"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  path = require("path");

const config = require('../config')

// dll dir
const dllPath = path.resolve(__dirname,'../static/dll')

module.exports = {
  mode: "production",
  entry: {
    vue: ["vue", "vue-i18n", "vue-router"]
  },
  output: {
    filename: "[name].dll.js", //生成的 dll.js
    path: config.common.dllPath,
    library: "[name]_dll_lib"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      context: process.cwd(),
      name: "[name]_dll_lib",
      path: path.resolve(config.common.dllPath, "[name].dll.manifest.json")
    })
  ]
};

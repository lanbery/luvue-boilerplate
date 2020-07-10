const webpack = require("webpack"),
  { CleanWebpackPlugin } = require("clean-webpack-plugin"),
  path = require("path");


// dll dir
const dllPath = path.resolve(__dirname,'../static/dll')

module.exports = {
  mode: "production",
  entry: {
    vue: ["vue", "vue-i18n", "vue-router"]
  },
  output: {
    filename: "[name].dll.js", //生成的 dll.js
    path: dllPath,
    library: "[name]_dll_lib"
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: path.resolve(dllPath, "[name].dll.manifest.json")
    })
  ]
};

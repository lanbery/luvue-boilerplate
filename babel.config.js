//root and sub dir general configuration
const presets = [
  [
    '@babel/preset-env',
    {
      "modules":false,
      "targets": {
        "browsers": [
          "> 1%",
          "last 2 versions",
          "not ie <= 8"
        ]
      }
    }
  ]
]

//root&sub dir general plugins
const plugins = [
  "@babel/plugin-transform-runtime"
]

module.exports = {
  presets,
  plugins
}

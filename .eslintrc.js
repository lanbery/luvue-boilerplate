// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    "plugin:vue/essential",
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    "standard"
  ],
  // required to lint *.vue files
  plugins: ["vue"],
  // add your custom rules here
  rules: {
    // allow async-await
    "generator-star-spacing": "off",
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-irregular-whitespace": "off", //禁掉空格报错警告
    "quotes":0,
    //
    "array-bracket-spacing": [1, "always"],
    //switch中的case标签不能重复
    "no-duplicate-case": 1,
    "eslint-disable-next-line":0,
    "array-bracket-spacing":0,
    "comma-dangle": [
      "error",
      {
        arrays: "never",
        objects: "ignore",
        imports: "never",
        exports: "never",
        functions: "ignore"
      }
    ]
  }
};

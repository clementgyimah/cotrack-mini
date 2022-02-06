module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["prettier-standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  // plugins: ["react", "prettier"],
  rules: {
    "max-len": [
      "error",
      {
        code: 80,
        ignoreRegExpLiterals: true,
        ignoreUrls: true,
        // ignoreComments: true,
      },
    ],
    "prettier/prettier": "error",
  },
};

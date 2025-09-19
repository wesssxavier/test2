module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  plugins: ['@typescript-eslint', 'react-refresh'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react-refresh/recommended', 'prettier'],
  ignorePatterns: ['dist', 'dist-electron'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
};

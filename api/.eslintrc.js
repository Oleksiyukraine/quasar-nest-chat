module.exports = {
  env: {
    es2020: true,
    node: true,
    mocha: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'max-len': [
      'error',
      150,
    ],
    'import/no-unresolved': 'off',
    'no-useless-constructor': 'off',
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    'no-empty-function': 'off',
    'no-underscore-dangle': 'off',
    indent: [
      'error',
      2,
    ],
    // 'arrow-body-style': 'off',
    'class-methods-use-this': [
      'error',
      {
        exceptMethods: [
          // 'getHelloMessage',
          // 'index',
          'validate',
          'defaultMessage',
          // 'catch',
          // 'getRequest',
        ],
      },
    ],
  },
};

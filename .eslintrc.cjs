module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'import-helpers'],
  rules: {
    'react-prop-types': 'off',
    'no-case-declarations': 'off',
    'no-restricted-globals': 0,
    'no-extra-boolean-cast': 'off',
    'react/prop-types': 'off',
    eqeqeq: 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'warn',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          '/^react/',
          '/^gatsby/',
          'module',
          '/layout$/',
          ['parent', 'sibling', 'index'],
          '/.css$/',
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },
    ],
  },
};


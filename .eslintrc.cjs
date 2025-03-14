module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'jsx-a11y', 'import', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 'error',
    'import/extensions': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    'no-console': 'warn',
    'react/jsx-props-no-spreading': 'error',
    'react/prop-types': 'error',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

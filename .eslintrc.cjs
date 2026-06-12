module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },

  parser: '@typescript-eslint/parser',

  plugins: ['react', 'react-hooks', '@typescript-eslint'],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    // React 17+ JSX runtime fix
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // Fix unused React imports warning
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^React$',
      },
    ],

    '@typescript-eslint/no-explicit-any': 'warn',

    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-eval': 'error',
  },
}

module.exports = {
  extends: ['standard-with-typescript', 'airbnb-base'],
  plugins: ['import'],
  root: true,
  rules: {
    '@typescript-eslint/array-type': ['error', { default: 'generic' }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/no-extraneous-class': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-throw-literal': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 'off',
    curly: ['error', 'multi-or-nest', 'consistent'],
    'import/extensions': 'off',
    'import/no-unresolved': ['error', { caseSensitive: true, commonjs: true }],
    'import/prefer-default-export': 'off',
    'linebreak-style': 'off',
    'max-len': [
      'error', {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true
      }
    ],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: { if: 'any' } }],
    'no-await-in-loop': 'off',
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-continue': 'off',
    'no-eval': 'off',
    'no-new': 'off',
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
    'no-throw-literal': 'off',
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    'no-underscore-dangle': ['error', { allowAfterThis: true, enforceInMethodNames: false }],
    'prefer-promise-reject-errors': 'off',
    radix: ['error', 'as-needed'],
    semi: 'off'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': 'typescript'
  },
  env: {
    jest: true,
    node: true
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
}

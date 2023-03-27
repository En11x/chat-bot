const ignorePatterns = [
  '*.min.*',
  'CHANGELOG.md',
  'dist',
  'LICENSE*',
  'output',
  'coverage',
  'public',
  'temp',
  'packages-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  '__snapshots__',
  '!.github',
  '!.vitepress',
  '!.vscode',
]

module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns,
  extends: ['plugin:astro/recommended'],
  rules: {
    'no-console': ['error', { allow: ['error'] }],
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks': 'off',
    '@typescript-eslint/no-use-before-define': 'off'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
      },
    },
    {
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ],
}

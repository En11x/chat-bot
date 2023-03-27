module.exports = {
  extends:[
    "plugin:astro/recommended"
  ],
  rules:{
    'no-console':['error',{allow:['error']}],
    'react/display-name': 'off',
    'react-hooks/rules-of-hooks':'off',
    '@typescript-eslint/no-use-before-define': 'off',
  },
  overrides:[
    {
      files:['*.astro'],
      parser:'astro-eslint-parser',
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
    },
    {
      files: ['**/*.astro/*.js', '*.astro/*.js'],
      parser: '@typescript-eslint/parser',
      rules: {
        'prettier/prettier': 'off',
      },
    },
  ]
}
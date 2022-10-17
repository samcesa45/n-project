module.exports = {
  'env': {
    'browser':true,
    'commonjs': true,
    'es2021': true,
    'node':true,
    'jest':true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'overrides': [
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'plugins': [
    '@typescript-eslint'
  ],
  'rules': {
    'eqeqeq':'error',
    'no-trailing-spaces':'error',
    'object-curly-spacing':[
      'error','always'
    ],
    'arrow-spacing':[
      'error',{ 'before':true,'after':true }
    ],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}

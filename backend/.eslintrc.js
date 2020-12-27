module.exports = {
  'env': {
    'commonjs': true,
    'es6': true,
    'node': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parserOptions': {
    'ecmaVersion': 2018
  },
  'rules': {
    'keyword-spacing': [
      'error',
      { 'before':true, 'after':true },
    ],
    'space-unary-ops': [
      'error'
    ],
    'space-infix-ops':[
      'error'
    ],
    'operator-linebreak': [
      'error',
      'before'
    ],
    'no-multiple-empty-lines': [
      'error',
      { 'max': 1, 'maxEOF': 0 }
    ],
    'indent': [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error',
      { 'before': true, 'after': true }
    ],
    'no-console': 0,
    'eol-last': ['error', 'always']
  }
}

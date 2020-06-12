module.exports = {
  root: true,
  env: {
    node: true
  },
  //扩展支持vue 的standard
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'template-curly-spacing': 'off',
    'padded-blocks': 'off',
    'indent': 0,
    'object-property-newline': 'off',
    'no-new': 'off',
    'camelcase': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  }
}

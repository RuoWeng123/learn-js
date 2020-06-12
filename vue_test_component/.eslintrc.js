module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: ['plugin:vue/essential'],
    plugins: ['vue'],
    rules: {
      //不允许未声明的变量
      'no-undef': 0,
      //不允许有声明后未使用的变量或者参数
      'no-unused-vars': [0, { vars: 'all', args: 'after-used' }],
      //不允许tabs
      'no-tabs': 0,
      //不允许混用tab和空格
      'no-mixed-spaces-and-tabs': [0, 'smart-tabs'],
      // 强制驼峰命名规则
      camelcase: [0, { properties: 'never' }],
      // 函数定义时括号前的空格
      'space-before-function-paren': [0, { anonymous: 'always', named: 'never' }],
      // allow paren-less arrow functions
      'arrow-parens': 0,
      // 强制使用单引号
      quotes: 'off',
      // 强制不使用分号结尾
      'semi': ['error', 'never'],
      // 不允许出现不必要的分号
      'no-extra-semi': 0,
      // 关闭空格
      indent: 'off',
      'no-multi-spaces': 'error',
      'vue/require-v-for-key': 'error',
      // allow async-await
      'generator-star-spacing': 'off',
      'no-console': 'off',
      // allow debugger during development
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'block-spacing': 'error',
      'comma-dangle': 'error',
      'no-new-func': 'off'
    },
    parserOptions: {
      parser: 'babel-eslint',
      ecmaFeatures: {
        legacyDecorators: true
      }
    }
  }
  
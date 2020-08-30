module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['@nuxtjs', 'prettier', 'prettier/vue'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/attributes-order': [0],
    'no-console': 'off',
    'prefer-const': 1,
    'no-unused-vars': [
      1,
      {
        vars: 'all',
        args: 'none',
      },
    ],
  },
}

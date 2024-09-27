module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    'vue/multi-word-component-names': 0,
    'no-console': 'off',
    'vue/no-v-for-template-key': 0,
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ]
  }
}
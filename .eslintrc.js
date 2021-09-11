module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // import/parsers:
  //   @typescript-eslint/parser: [ .ts, .tsx ]

  /*  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
  }, */
  extends: [
    // '@nuxtjs/eslint-config-typescript',
    //  'plugin:nuxt/recommended',
    //  'prettier'

    '@nuxtjs/eslint-config-typescript',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended',
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
  },
}

import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: { link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }] },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  plugins: [
    '~/plugins/initConfigs.ts',
    '~/plugins/helper.ts',
    '~/plugins/apolloClient.ts',
    '~/plugins/web3/web3.ts',
    '~/plugins/typer.client.ts',
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api/module', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/google-analytics',
      {
        ua: process.env.GA_ID,
        debug: { sendHitTask: true },
      },
    ],
    '@nuxtjs/apollo',
    [
      'nuxt-compress',
      {
        gzip: {
          threshold: 8192,
        },
        brotli: {
          threshold: 8192,
        },
      },
    ],
  ],

  // Apollo client setup
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.BASE_GRAPHQL_SERVER_URL,
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.BASE_URL,
    withCredentials: true,
    debug: false,
  },

  webfontloader: {
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  loading: false,
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      // dark: true,
      themes: {
        dark: {
          primary: '#536af6',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },

        light: {
          primary: '#536af6',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    analyze: false,
    build: {},
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[id].[contenthash].js'),
    },

    extractCSS: false,
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue|ts)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: { fix: true },
        })
      }
    },
    transpile: ['@vue/apollo-composable'],
  },

  env: {
    amChartLicense: process.env.AMCHARTS_LICENSE,
    baseURL: process.env.BASE_URL,
  },

  server: { port: 3000, host: process.env.SERVER_HOST },
}

import colors from 'vuetify/es5/util/colors'
// defiheatmap.com

require('dotenv').config()

const runEnv = process.env.RUN_ENV

const config = {
  development: {
    BASE_URL: process.env.BASE_URL_DEV,
    SERVER_HOST: process.env.SERVER_HOST_DEV,
  },
  staging: {
    BASE_URL: process.env.BASE_URL_STAGING,
    SERVER_HOST: process.env.SERVER_HOST_STAGING,
  },
  production: {
    BASE_URL: process.env.BASE_URL_PROD,
    SERVER_HOST: process.env.SERVER_HOST_PROD,
  },
}

console.log(config[runEnv])

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    [
      '@nuxtjs/google-analytics',
      {
        ua: 'UA-119114337-5',
        debug: { sendHitTask: true },
      },
    ],
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: config[runEnv].BASE_URL,
    withCredentials: true,
    debug: false,
  },
  webfontloader: {
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  },
  pwa: {
    manifest: {
      name: 'Quantify Crypto',
      description: 'Uniswap DEX NexGen Display  | DeFi Heatmap',
      short_name: 'Quantify Crypto DeFi',
      lang: 'en',
      display: 'standalone',
      theme_color: '#1c31b5',
      start_url: '/',
    },
    workbox: false,
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  loading: false,
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // light: true,
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
        })
      }
    },
  },

  env: { baseURL: config[runEnv].BASE_URL, runEnv },

  server: { port: 3000, host: config[runEnv].SERVER_HOST },
}

import https from 'https'
import colors from 'vuetify/es5/util/colors'
import axios from 'axios'
// defiheatmap.com

require('dotenv').config()

const runEnv = process.env.RUN_ENV

const config = {
  development: {
    BASE_URL: process.env.BASE_URL_DEV,
    SERVER_HOST: process.env.SERVER_HOST_DEV,
    BASE_GRAPHQL_SERVER: process.env.BASE_GRAPHQL_SERVER_DEV,
  },
  staging: {
    BASE_URL: process.env.BASE_URL_STAGING,
    SERVER_HOST: process.env.SERVER_HOST_STAGING,
    BASE_GRAPHQL_SERVER: process.env.BASE_GRAPHQL_SERVER_STAGING,
  },
  production: {
    BASE_URL: process.env.BASE_URL_PROD,
    SERVER_HOST: process.env.SERVER_HOST_PROD,
  },
}

config[runEnv].COVALENT_API_KEY = process.env.COVALENT_API_KEY

console.log(config[runEnv])

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  plugins: [
    '~/plugins/initConfigs.client.ts', // only in client side
    '~/plugins/typer.client.ts',
  ],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    'cookie-universal-nuxt',
    [
      '@nuxtjs/robots',
      {
        UserAgent: '*',
        Disallow: '/wallet',
      },
    ],
    [
      '@nuxtjs/google-analytics',
      {
        ua: 'UA-119114337-5',
        debug: { sendHitTask: true },
      },
    ],
    '@nuxtjs/apollo',
    '@nuxtjs/sitemap', // must be last
  ],

  // Apollo client setup
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: config[runEnv].BASE_GRAPHQL_SERVER,
      },
      aaveV2Mainnet: {
        // httpEndpoint: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2',
        httpEndpoint: 'https://thegraph.defiheatmap.com/subgraphs/name/aave/protocol-v2',
      },
      aaveV2Kovan: {
        httpEndpoint: 'https://api.thegraph.com/subgraphs/name/aave/protocol-v2-kovan',
      },
      curve: {
        httpEndpoint: 'https://api.thegraph.com/subgraphs/name/curvefi/curve',
      },
    },
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: config[runEnv].BASE_URL,
    withCredentials: true,
    debug: false,
  },

  sitemap: {
    hostname: config[runEnv].BASE_URL,
    gzip: true,
    exclude: ['/wallet/**'],
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date(),
    },
    routes: async () => {
      axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
      const { data } = await axios.get(`${config[runEnv].BASE_URL}/api/defi/heatmap/uniswap-heatmap?num_of_coins=100`)
      return data.data.map((v) => `/token/${v.pool_id}`)
    },
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
          // background: '#121212',
          // bgAccent: colors.grey.darken4,
          // overlay: '#121212',
          // appBg: '#151A23',
          // baseText: '#fff',
          // outline: '#2F2F2F',
          // baseButton: colors.grey.darken4,
          // card: '#121212',
          // innerCard: '#151A23',
        },

        light: {
          primary: '#536af6',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          // background: '#fff',
          // bgAccent: '#fff',
          // overlay: '#fff',
          // appBg: colors.grey.lighten4,
          // baseText: colors.grey.darken3,
          // outline: '#E0E0E0',
          // baseButton: colors.white,
          // card: colors.grey.lighten2,
          // innerCard: colors.grey.lighten2,
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

    extractCSS: {
      ignoreOrder: false,
    },

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
  },

  env: {
    runEnv,
    baseURL: config[runEnv].BASE_URL,
    amChartLicense: process.env.AMCHARTS_LICENSE,
  },

  server: { port: 3000, host: config[runEnv].SERVER_HOST },
}

import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - defi-heatmap-nuxt-server',
    title: 'defi-heatmap-nuxt-server',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/pwa', 'nuxt-webfontloader'],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://127.0.0.1:5000',
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
      description:
        'Designed to Assist Cryptocurrency Traders with Superior Visual Displays',
      short_name: 'Quantify Crypto',
      lang: 'en',
      display: 'standalone',
      theme_color: '#1c31b5',
      start_url: '/',
    },
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  loading: false,
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      // light: true,
      themes: {
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
  build: {},
}

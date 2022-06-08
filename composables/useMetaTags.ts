import { useMeta, reactive, computed } from '@nuxtjs/composition-api'

const TWITTER_HANDLE = 'EVMX_IO'

export function useMetaTags() {
  const metaTags = reactive({
    title: 'NexGen Defi Tools, Tracking, Explorer, Price Alerts and Analysis | EVM Finance',
    description: 'NexGen Defi Tools, Tracking, Explorer, Price Alerts and Analysis | EVM Finance',
    subDirectory: '',
    imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXHomePage.jpg',
    imgAlt: 'EVM Finance Homepage',
  })

  const meta = computed(() => {
    return [
      {
        name: 'description',
        hid: 'description',
        content: metaTags.description,
      },

      // Open Graph
      {
        name: 'og:title',
        content: metaTags.title,
      },
      {
        name: 'og:description',
        content: metaTags.description,
      },
      { name: 'og:type', content: 'website' },
      {
        name: 'og:url',
        content: `${process.env.BASE_URL}${metaTags.subDirectory}`,
      },
      {
        name: 'og:image',
        content: metaTags.imgUrl,
      },

      {
        name: 'og:image:alt',
        content: metaTags.imgAlt,
      },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      {
        name: 'twitter:title',
        content: metaTags.title,
      },
      {
        name: 'twitter:description',
        content: metaTags.description,
      },
      {
        name: 'twitter:image',
        content: metaTags.imgUrl,
      },
      {
        name: 'twitter:image:alt',
        content: metaTags.imgAlt,
      },
    ]
  })

  useMeta(() => ({ title: metaTags.title, meta: meta.value }))

  return { metaTags }
}

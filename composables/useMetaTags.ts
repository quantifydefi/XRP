import { useMeta, computed } from '@nuxtjs/composition-api'

export function useMetaTags({
  title = 'NexGen Defi Tools, Tracking, Explorer, Price Alerts and Analysis | EVM Finance',
  description = 'NexGen Defi Tools, Tracking, Explorer, Price Alerts and Analysis | EVM Finance',
  subDirectory = '',
  imgUrl = 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXHomePage.jpg',
  imgAlt = 'EVM Finance Homepage',
  twitterHandle = 'EVMX_IO',
}) {
  const meta = computed(() => {
    return [
      {
        name: 'description',
        hid: 'description',
        content: description,
      },

      // Open Graph
      {
        name: 'og:title',
        content: title,
      },
      {
        name: 'og:description',
        content: description,
      },
      { name: 'og:type', content: 'website' },
      {
        name: 'og:url',
        content: `${process.env.BASE_URL}${subDirectory}`,
      },
      {
        name: 'og:image',
        content: imgUrl,
      },

      {
        name: 'og:image:alt',
        content: imgAlt,
      },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: twitterHandle },
      {
        name: 'twitter:title',
        content: title,
      },
      {
        name: 'twitter:description',
        content: description,
      },
      {
        name: 'twitter:image',
        content: imgUrl,
      },
      {
        name: 'twitter:image:alt',
        content: imgAlt,
      },
    ]
  })

  useMeta(() => ({ title, meta: meta.value }))
}

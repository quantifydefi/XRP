import { useMeta, computed, reactive, useContext } from '@nuxtjs/composition-api'

const TWITTER_HANDLE = 'EVMX_IO'
type PageKeyType =
  | 'homepage'
  | 'aave_v2'
  | 'balances'
  | 'transactions'
  | 'termsAndConditions'
  | 'teams'
  | 'tokenPage'
  | 'about'
  | 'faq'

export function useMetaTags(key: PageKeyType, path = '', coinName = '', coinSymbol = '') {
  const { env } = useContext()
  const metadata = reactive({
    homepage: {
      title: 'EVM is Ethereum Virtual Machine Finance | Defi interfaces | Web3 Data',
      description:
        'Professional Web3 Dashboard | DeFi Made Simple Interfaces | Multi Chains | Metrics | Live Prices | Balances | Transaction History | Multi Chain Support',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    aave_v2: {
      title: 'Aave DeFi Trading Interface | ERC Token Transactions and Balances',
      description:
        'Aave interface for Pro Traders and Novice Users | Secure | Aave Smart Contracts | Deposits | Borrows | Withdraws | Repays ',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    balances: {
      title: 'DeFi Asset Management for ERC20 tokens | EVM Ethereum Virtual Machine Finance',
      description:
        'Aesthetic display of DeFi Balances, Deposits, and Loans | Metamask Balances | Ethereum Binance Polygon Fantom Chain Balances | Individual Token Balances',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    transactions: {
      title: 'DeFi Transaction History | EVM Ethereum Virtual Machine Finance',
      description: 'DeFi transactions for Ethereum Mainnet, Polygon, Binance Smart Chain, Fantom Opera',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    termsAndConditions: {
      title: 'Terms and Conditions | EVM Finance',
      description:
        'Professional Web3 Dashboard | DeFi Made Simple Interfaces | Multi Chains | Metrics | Live Prices | Balances | Transaction History | Multi Chain Support',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    teams: {
      title: 'Aave DeFi Interface | EVM Finance Team',
      description: 'Aave Pro interface, Balances, Transactions, ‘A’ token pages, price charts',
      imgUrl: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg',
      imgAlt: 'EVM Finance Homepage',
    },
    tokenPage: {
      title: `DeFi Metrics for ${coinName} | ${coinSymbol} Strategy Trading Interface | EVM Finance`,
      description: `Professional AAVE interface for ${coinName} | Deposit Borrow Repay Withdraw | Live Prices, Charts, Trends, News, Metric, and more`,
      imgUrl: `https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg`,
      imgAlt: 'EVM Finance Homepage',
    },
    about: {
      title: `Web3 Investing Portal | Defi Metrics | EVM Finance`,
      description: `DeFi Asset Management and Strategic Investments | Aave Pro Interface | Live Metrics`,
      imgUrl: `https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg`,
      imgAlt: 'EVM Finance Homepage',
    },
    faq: {
      title: `FAQ for Aave Lending and Borrowing | EVM Finance`,
      description: `How to use the Aave Pro Interface for Lending and Borrowing`,
      imgUrl: `https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/evmfinancehomepage.jpg`,
      imgAlt: 'EVM Finance Homepage',
    },
  })

  const meta = computed(() => {
    return [
      {
        name: 'description',
        hid: 'description',
        content: metadata[key].description,
      },
      // Open Graph
      {
        name: 'og:title',
        content: metadata[key].title,
      },
      {
        name: 'og:description',
        content: metadata[key].description,
      },
      { name: 'og:type', content: 'website' },
      {
        name: 'og:url',
        content: `${process.env.baseURL}${path}`,
      },
      {
        name: 'og:image',
        content: metadata[key].imgUrl,
      },

      {
        name: 'og:image:alt',
        content: metadata[key].imgAlt,
      },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: TWITTER_HANDLE },
      {
        name: 'twitter:title',
        content: metadata[key].title,
      },
      {
        name: 'twitter:description',
        content: metadata[key].description,
      },
      {
        name: 'twitter:image',
        content: metadata[key].imgUrl,
      },
      {
        name: 'twitter:image:alt',
        content: metadata[key].imgAlt,
      },
    ]
  })
  const link = computed(() => {
    return [
      {
        rel: 'canonical',
        href: `${env.baseURL}${path}`,
      },
    ]
  })

  useMeta(() => ({ title: metadata[key].title, meta: meta.value, link: link.value }))
}

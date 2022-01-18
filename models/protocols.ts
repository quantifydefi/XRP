/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { ProtocolGQL } from '~/apollo/main/portfolio.query.graphql'
import { AllProtocolsGQL } from '~/apollo/main/pools.query.graphql'
import { Protocol } from '~/types/apollo/main/types'
import { ChainItem } from '~/models/portfolio'
import { Events } from '~/types/global'

@Component({
  apollo: {
    protocols: {
      prefetch: false,
      query: AllProtocolsGQL,
      deep: false,
      result({ loading }) {
        this.config.isProtocolsLoading = loading
      },
      watchLoading(isLoading) {
        this.loading = isLoading
      },
    },
    protocol: {
      prefetch: false,
      query: ProtocolGQL,
      deep: false,
      variables() {
        return {
          protocolId: this.currentProtocolId,
        }
      },
      // Optional result hook
      result({ loading }) {
        this.config.isCurrentProtocolLoading = loading
      },
      watchLoading(isLoading) {
        this.config.isCurrentProtocolLoading = isLoading
      },
    },
  },
  async asyncData(context: Context) {
    let currentProtocolId: string | (string | null)[] = '3'
    if (context.route.query?.protocol) {
      currentProtocolId = await context.route.query.protocol
      return { currentProtocolId }
    }
    return { currentProtocolId }
  },
})
export class Protocols extends Vue {
  config = {
    isProtocolsLoading: false,
    isCurrentProtocolLoading: false,
    tokenOrPoolOptions: [
      { text: 'Liquidity Pools', value: 'pool' },
      { text: 'Tokens', value: 'token' },
    ],
    currentSelection: 'pool' as 'token' | 'pool',
    tokenListCols: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
        class: 'px-2',
        cellClass: ['px-1', 'text-truncate'],
        width: 100,
      },
      {
        text: 'Symbol',
        align: 'start',
        value: 'symbol',
        class: 'px-0',
      },

      {
        text: 'Token Balance',
        align: 'left',
        value: 'tokenBalance',
        class: 'px-0',
        cellClass: ['px-1', 'text-truncate'],
      },

      {
        text: 'USD Balance',
        align: 'left',
        value: 'usdBalance',
        class: 'px-2',
        cellClass: ['px-2', 'text-truncate'],
      },

      {
        text: '',
        align: 'right',
        value: 'action',
        class: 'px-2',
        width: 10,
        cellClass: ['px-0'],
        sortable: false,
      },
      {
        text: '',
        align: 'right',
        value: 'link',
        class: 'px-2',
        width: 10,
        cellClass: ['px-0'],
        sortable: false,
      },
    ],
  }

  balanceType: Record<string, { chain: string; logo: string; url?: string }> = {
    'ethereum-staking': {
      chain: 'Ethereum',
      logo: 'eth',
      url: 'https://etherscan.io/token',
    },
    'ethereum-pool2': {
      chain: 'Ethereum',
      logo: 'eth',
      url: 'https://etherscan.io/token',
    },
    'ethereum-borrowed': {
      chain: 'Ethereum',
      logo: 'eth',
      url: 'https://etherscan.io/token/',
    },
    ethereum: {
      chain: 'Ethereum',
      logo: 'eth',
      url: 'https://etherscan.io/token',
    },

    'avalanche-borrowed': {
      chain: 'Avalanche',
      logo: 'avax',
      url: 'https://snowtrace.io/adddress',
    },
    avalanche: {
      chain: 'Avalanche',
      logo: 'avax',
      url: 'https://snowtrace.io/address',
    },
    polygon: {
      chain: 'Polygon',
      logo: 'matic',
      url: 'https://polygonscan.com/address',
    },
    'polygon-borrowed': {
      chain: 'Polygon',
      logo: 'matic',
      url: 'https://polygonscan.com/address',
    },

    xdai: { chain: 'Polygon', logo: 'matic' },
    fantom: { chain: 'Fantom', logo: 'ftm' },
    harmony: { chain: 'Harmony', logo: 'one' },
    arbitrum: { chain: 'Arbitrum', logo: 'eth' },
    optimism: { chain: 'Optimism', logo: 'snx' },
    tvl: { chain: 'Ethereum', logo: 'eth' },
    celo: { chain: 'Celo', logo: 'celo' },
    moonriver: { chain: 'Moonriver', logo: 'movr' },
    bsc: { chain: 'BCS', logo: 'bnb', url: 'https://bscscan.com/address' },
    heco: { chain: 'Heco', logo: 'eth' },
    palm: { chain: 'Palm', logo: 'eth' },
    okexchain: { chain: 'Okexchain', logo: 'eth' },
  }

  protocols: Protocol[] = []
  protocol!: Protocol
  currentProtocolId: string = '3'

  @Watch('currentProtocolId')
  async onProtocolChange(value: string) {
    await this.$router.push({ path: this.$route.path, query: { protocol: value } })
  }

  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
    } catch (e) {}
  }

  allowBalanceRendering(chain: ChainItem, balanceType: string): boolean {
    if (this.balanceType[balanceType]) {
      return this.balanceType[balanceType].chain === chain.name
    } else return false
  }

  // TODO: Add missing link handlers
  navigateToExplorer(key: string, address: string) {
    if (this.balanceType[key].url) {
      const url = `${this.balanceType[key].url}/${address}`
      window.open(url)
    } else {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: `Missing link, we are working to fix that`,
      })
    }
  }
}

import 'reflect-metadata'
import { Component, Ref, Vue, Watch } from 'vue-property-decorator'
import { plainToClass, Type } from 'class-transformer'
import { ethers, Signer } from 'ethers'
import { CurvePoolsGQL } from '~/apollo/main/pools.query.graphql'
import {
  CurvePool,
  CurveAddresses,
  CoingeckoInfo,
  CurveCoin,
  LpTokenInfo,
  PageMetaData,
  CurveRewards,
} from '~/types/apollo/main/types'
import { Helper } from '~/models/helper'
import { actionTypes, CurvePoolAction, curveActions } from '~/models/web3'
import erc20Abi from '~/constracts/abi/erc20Abi.json'
declare const window: any

export class CurveCoinCl implements CurveCoin {
  ID!: string
  address!: string
  coingeckoId!: string
  decimals!: number
  liquidity!: number
  symbol!: string
  tokenBalance!: number
  type!: string
  usdPrice!: number
  wrappedCoinType!: string
  isLpToken!: boolean
  walletBalance: number = 0
  get image() {
    return `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${this.symbol.toLowerCase()}.png`
  }

  get amount() {
    return new Intl.NumberFormat('en').format(this.inputVal.value)
  }

  set amount(value: string) {
    if (value && value.length > 0) {
      const num = parseFloat(value.replace(/,/g, ''))
      if (!isNaN(num)) {
        this.inputVal.value = parseFloat(value.replace(/,/g, ''))
      } else this.inputVal.value = 0
    } else this.inputVal.value = 0
  }

  inputVal = {
    approvedToSpend: 0 as number,
    value: 0 as number,
    hidden: true as boolean,
    disabled: false as boolean,
    placeholder: 'Number Of tokens',
    rules: {
      mustBeNumber: (v: string) => !isNaN(parseFloat(v)) || 'Must be Number',
    },
  }
}

export class CurvePoolCl implements CurvePool {
  ID!: string
  addresses!: CurveAddresses
  adminFee!: string
  assetType!: string
  assets!: string
  baseAPY!: number
  coingeckoInfo!: CoingeckoInfo

  @Type(() => CurveCoinCl)
  coins!: CurveCoinCl[]

  isMetaPool!: boolean

  @Type(() => CurveCoinCl)
  metaCoins!: CurveCoinCl[]

  dataIndex!: number
  fee!: string
  hasAMultiplier!: boolean
  idAlias!: string
  isLendingPool!: boolean
  isOldPool!: boolean
  lpTokenInfo!: LpTokenInfo
  name!: string
  pageMetaData!: PageMetaData
  rewards!: CurveRewards
  totalDailyVolume!: number
  totalLiquidity!: number
  totalTokenBalance!: number

  @Type(() => CurveCoinCl)
  underlyingCoins!: CurveCoinCl[]

  virtualPrice!: string
  depositWrapped: boolean = true
  lpBalance: number = 0
  lpBalanceToWithdraw: number = 0

  resetCoinValues() {
    this.coins.forEach((coin) => {
      coin.inputVal.value = 0
      coin.inputVal.approvedToSpend = 0
    })
    this.metaCoins.forEach((coin) => {
      coin.inputVal.value = 0
      coin.inputVal.approvedToSpend = 0
    })
    this.lpBalanceToWithdraw = 0
  }

  async calculateBalance(signer: Signer) {
    try {
      const poolLPContract = new ethers.Contract(this.addresses.lpToken, erc20Abi, signer)
      const walletAddress = await signer.getAddress()
      const lpBal = await poolLPContract.balanceOf(walletAddress)
      const bal = parseInt(lpBal, 10) / 10 ** 18
      this.lpBalance = bal
      return bal
    } catch (e) {
      console.log('LP BAL ERROR', e)
      return 0
    }
  }

  /*  get formattedCoins(): CurveCoinCl[] {
    // Use regular coins if pool is not metaPool
    if (!this.isMetaPool) {
      return this.coins
    }
    if (this.isMetaPool) {
      if (!this.depositWrapped) {
        const coins: CurveCoinCl[] = []
        this.coins.forEach((coin) => {
          if (coin.symbol !== '3Crv') {
            coins.push(coin)
          }
        })
        this.metaCoins.forEach((coin) => {
          coins.push(coin)
        })
        return coins
      } else return this.coins
    } else return []
  } */
}

@Component({
  name: 'CurvePools',
  apollo: {
    curvePools: {
      fetchPolicy: 'cache-and-network',
      query: CurvePoolsGQL,
      update: ({ curvePools }) => plainToClass(CurvePoolCl, curvePools as CurvePoolCl[]),
    },
  },
})
export class CurvePools extends Vue {
  @Ref('poolAction') readonly poolAction!: CurvePoolAction

  provider: any = null
  signer!: Signer
  readonly curvePools: CurvePoolCl[] = []
  readonly curveActions = curveActions
  readonly cols = [
    {
      text: 'Pool',
      align: 'start',
      value: 'pool',
      width: '450px',
      class: ['px-2', 'text-truncate'],
    },

    {
      text: '',
      align: 'right',
      value: 'action',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'LP Balance',
      align: 'start',
      value: 'lpBalance',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Base vAPY',
      align: 'start',
      value: 'baseAPY',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Rewards tAPR',
      align: 'start',
      value: 'rewards',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Liquidity, USD',
      align: 'start',
      value: 'liquidityUsd',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Daily Volume, USD',
      align: 'start',
      value: 'dailyVolume',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },

    {
      text: 'Token Balance',
      align: 'start',
      value: 'totalBalance',
      class: ['px-2', 'text-truncate'],
      cellClass: ['px-2', 'text-truncate'],
    },
    {
      text: '',
      align: 'right',
      value: 'link',
      class: ['px-2', 'text-truncate'],
      width: 40,
      cellClass: ['px-2', 'text-truncate'],
    },
  ]

  @Watch('curvePools', { immediate: false })
  async onCurePoolsCHanged() {
    await this._calculateLPBalance()
  }

  async mounted() {
    try {
      this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
      this.signer = await this.provider.getSigner()
    } catch (e) {
      console.log(e)
    }
  }

  get isPoolsLoading() {
    return this.$apollo.queries.curvePools.loading
  }

  private async _calculateLPBalance() {
    const promises: any = []
    this.curvePools.forEach((elem) => {
      promises.push(elem.calculateBalance(this.signer))
    })
    await Promise.all(promises)
  }

  valueFormatter(value: number, maximumSignificantDigits: number = 6, minimumSignificantDigits: number = 6): string {
    return new Intl.NumberFormat('en', {
      maximumSignificantDigits,
      minimumSignificantDigits,
    }).format(value)
  }

  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }

  async copyAddressToClipboard(address: string) {
    try {
      await navigator.clipboard.writeText(address)
    } catch (e) {}
  }

  navigateToExplorer(address: string) {
    const url = `https://etherscan.io/address/${address}`
    window.open(url)
  }

  async invest(poolAddress: string, action: actionTypes) {
    const pool: CurvePoolCl | undefined = this.curvePools?.find((elem) => elem.ID === poolAddress)
    if (pool) {
      await this.poolAction.init(pool, action)
    }
  }
}

import { CoinGeckoTokenDataInterface } from '~/types/coinList'

export class CoinGeckoTokenData implements CoinGeckoTokenDataInterface {
  readonly address!: string
  readonly chainId!: string
  readonly decimals!: number
  readonly logoURI!: string
  readonly name!: string
  readonly symbol!: string
}

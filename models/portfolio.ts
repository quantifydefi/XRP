/* eslint-disable camelcase */
import 'reflect-metadata'
import { Chain } from '~/types/apollo/main/types'

export class ChainItem implements Chain {
  chainId!: number
  geckoId!: string
  isTestNet!: boolean
  label!: string
  logoUrl!: string
  name!: string
  symbol!: string
  blockExplorerUrl!: string
  rpcUrl!: string

  get id() {
    return this.chainId
  }
}

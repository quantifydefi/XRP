/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Chain } from '~/types/apollo/types'

@Component
export class Config extends Vue {
  conf = {
    toggleChainSelection: false as boolean,
    selectedChainId: '1' as string,
  }

  chains: Chain[] = this.$store.state.configs.chains

  get mainNetChains(): Chain[] {
    return this.chains.filter((elem) => {
      return !elem.isTestnet
    })
  }

  get testNetChains(): Chain[] {
    return this.chains.filter((elem) => {
      return elem.isTestnet
    })
  }

  get currentChain() {
    return this._findChainById(this.conf.selectedChainId)
  }

  // TODO: Check why is double event firing
  @Watch('conf.selectedChainId')
  async onChainChanged(value: any, old: any) {
    if (value === undefined) {
      this.conf.selectedChainId = old
    } else {
      await this.$store.dispatch('configs/changeChain', value)
    }
  }

  private _findChainById(id: string): Chain | null {
    const chain: Chain | undefined = this.chains.find(
      (elem) => elem.chainId === id
    )
    if (chain) {
      return chain
    } else return null
  }
}

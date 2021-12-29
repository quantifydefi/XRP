/* eslint-disable camelcase */
import 'reflect-metadata'
import { Vue, Component } from 'vue-property-decorator'
import { Events } from '~/types/global'
declare const window: any
@Component
export class MetamaskConnector extends Vue {
  ethereum: any = null

  async ethereunAccount(): Promise<string | null> {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accounts[0]
    } catch (error) {
      /*  this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: `Something Went Wrong with Metamask`,
      }) */
      return null
    }
  }

  get isMetaMaskInstalled() {
    // Have to check the ethereum binding on the window object to see if it's installed
    const { ethereum } = window
    return Boolean(ethereum && ethereum.isMetaMask)
  }

  async connectToWallet() {
    if (this.isMetaMaskInstalled) {
      const account: string | null = await this.ethereunAccount()
      if (account) {
        await this.$store.dispatch('wallet/connectToWallet', {
          wallet: account,
          status: true,
        })
      }
    } else {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: `Metamask Is not Installed. Please install Metamask extension for your browser`,
      })
      window.open('https://metamask.io/')
    }
  }

  async mounted() {
    const { ethereum } = window
    this.ethereum = ethereum
    await this.connectToWallet()

    this.ethereum.on('accountsChanged', (accounts: string[]) => {
      if (accounts.length === 0) {
        this.$store.dispatch('wallet/connectToWallet', {
          wallet: null,
          status: false,
        })
      } else {
        this.$store.dispatch('wallet/connectToWallet', {
          wallet: accounts[0],
          status: true,
        })
      }
    })
  }
}

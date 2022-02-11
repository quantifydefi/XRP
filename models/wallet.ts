/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue } from 'vue-property-decorator'
import { ethers } from 'ethers'
import { Events } from '~/types/global'
import { Chain } from '~/types/apollo/main/types'

declare const window: any
@Component
export class MetamaskConnector extends Vue {
  ethereum: any = null

  async ethereunAccount(): Promise<string | null> {
    try {
      const accounts = await this.ethereum.request({
        method: 'eth_requestAccounts',
      })
      return accounts[0]
    } catch (error) {
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
      } else await this.$store.dispatch('wallet/disconnectToWallet')
    } else {
      setTimeout(() => {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: `Metamask Is not Installed. Please install Metamask extension for your browser`,
        })
      }, 2000)
      window.open('https://metamask.io/')
    }
  }

  async openMetamaskDialog() {
    try {
      await this.ethereum.request({ method: 'eth_requestAccounts' })
    } catch (e) {
      // eslint-disable-next-line no-self-assign
      window.location = window.location
    }
  }

  async changeNetwork(chain: Chain) {
    // console.log('Attempt to Change Chain', chain.chainId, chain)

    let chainId: string | number = chain.chainId
    if (chainId === 1) {
      chainId = '0x' + chain.chainId
    } else if (chainId === 1337) {
      chainId = '0x539'
    } else {
      chainId = ethers.utils.hexlify(chain.chainId)
    }

    // console.log('Chain ID', chainId)

    try {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }], // chainId must be in hexadecimal numbers
      })
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await this.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId,
                chainName: chain.label,
                nativeCurrency: {
                  name: chain.name,
                  symbol: chain.symbol, // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: [chain.blockExplorerUrl],
                rpcUrls: [chain.rpcUrl],
              },
            ],
          })
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  async mounted() {
    const { ethereum } = window
    this.ethereum = ethereum
    await this.connectToWallet()
    if (this.isMetaMaskInstalled) {
      this.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length === 0) {
          await this.$store.dispatch('wallet/disconnectToWallet')
        } else {
          await this.$store.dispatch('wallet/connectToWallet', {
            wallet: accounts[0],
            status: true,
          })
        }
      })
    }
    /* this.ethereum.on('chainChanged', (hexString: string) => {
      console.log('Metamask Chain Changed', parseInt(hexString, 16), hexString)
    }) */
    /* try {
      await ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] })
    } catch (error) {
      console.log(error)
    } */
    /** Listen to token metamask import */
    this.$root.$on(
      Events.IMPORT_METAMASK_TOKEN,
      async ({
        address,
        symbol,
        decimals,
        image,
      }: {
        address: string
        symbol: string
        decimals: number
        image: string
      }) => {
        try {
          await ethereum.request({
            method: 'wallet_watchAsset',
            params: { type: 'ERC20', options: { address, symbol, decimals, image } },
          })
        } catch (error) {
          console.log(error)
        }
      }
    )
  }

  /*  async mounted() {
    const { ethereum } = window
    const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')
    const signer = provider.getSigner()
    const userAddress = await signer.getAddress()
    console.log(userAddress)
    // const userAddress = await signer.getAddress()

    ethereum.on('accountsChanged', async (accounts: string[]) => {
      const userAddress = await signer.getAddress()
      console.log(accounts, userAddress)
    })
  } */
}

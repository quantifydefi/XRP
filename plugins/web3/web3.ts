import { reactive, Ref, computed, toRefs, onGlobalSetup, provide, ref } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import { MetamaskConnector } from '~/plugins/web3/metamask.connector'
import { ConnectorInterface, Web3ErrorInterface } from '~/plugins/web3/connector'
import { Cookies } from '~/types/cookies'
import { Chain } from '~/types/apollo/main/types'
export type Wallet = 'metamask'

type WalletState = 'connecting' | 'connected' | 'disconnected'
export const WEB3_PLUGIN_KEY = '$web3'

export type Web3 = {
  connectWallet: (wallet: Wallet) => Promise<void>
  disconnectWallet: () => void
  resetErrors: () => void
  changeChain: (chain: Chain) => void
  importTokenToMetamask: (params: any) => void
  provider: Ref<any>
  account: Ref<string>
  chainId: Ref<number | null>
  connector: Ref<ConnectorInterface>
  walletState: Ref<WalletState>
  walletReady: Ref<boolean>
  error: Ref<Web3ErrorInterface | null>
  signer: Ref<any>
}
type PluginState = {
  connector: any
  walletState: WalletState
}

const WalletConnectorDictionary: Record<Wallet, ConnectorInterface> = {
  metamask: new MetamaskConnector(),
}

export default (context: Context): void => {
  onGlobalSetup(async () => {
    const pluginState = reactive<PluginState>({
      connector: null as any,
      walletState: 'disconnected',
    })
    const errorStatus: Ref<Web3ErrorInterface> = ref({ status: false, message: null })

    // COMPUTED
    const account = computed(() => pluginState.connector?.account)
    const chainId = computed(() => pluginState.connector?.chainId)
    const provider = computed(() => pluginState.connector?.provider)
    const signer = computed(() => pluginState.connector?.provider?.getSigner())
    const walletReady = computed(() => {
      return !!(pluginState.connector && pluginState.connector.provider && pluginState.walletState === 'connected')
    })

    // METHODS
    const connectWallet = async (wallet: Wallet) => {
      pluginState.walletState = 'connecting'
      try {
        if (!wallet) {
          throw new Error('Please provide a wallet to facilitate a web3 connection.')
        }
        const connector = WalletConnectorDictionary[wallet]
        pluginState.connector = connector
        pluginState.connector.resetErrors()

        if (!connector) {
          throw new Error(`Wallet [${wallet}] is not supported yet. Please contact the dev team to add this connector.`)
        }
        const { account, error } = await pluginState.connector.connect()

        // Toggling Error if account is not detected or Metamask is not installed
        if (!account) {
          errorStatus.value = { status: error.status, message: error.message }
          pluginState.walletState = 'disconnected'
          return
        }
        if (account) {
          pluginState.walletState = 'connected'
          context.$cookies.set(Cookies.walletConnected, wallet)
        }
      } catch (err) {
        pluginState.walletState = 'disconnected'
      }
    }

    const disconnectWallet = () => {
      if (!pluginState.connector) {
        throw new Error('Cannot disconnect a wallet. No wallet currently connected.')
      }
      const connector = pluginState.connector as ConnectorInterface
      connector.handleDisconnect()
      pluginState.connector = null
      pluginState.walletState = 'disconnected'
      context.$cookies.remove(Cookies.walletConnected)
    }

    const resetErrors = () => {
      errorStatus.value = { status: false, message: null }
      if (pluginState.connector) {
        pluginState.connector.resetErrors()
      }
    }

    const changeChain = (chain: Chain) => {
      if (pluginState.connector) {
        pluginState.connector.handleChanChange(chain)
      }
    }

    const importTokenToMetamask = (params: any) => {
      if (pluginState.connector) {
        pluginState.connector.importTokenToMetamask(params)
      }
    }

    const plugin: Web3 = {
      connectWallet,
      disconnectWallet,
      changeChain,
      importTokenToMetamask,
      resetErrors,
      ...toRefs(pluginState),
      account,
      chainId,
      provider,
      signer,
      walletReady,
      error: errorStatus,
    }

    provide(WEB3_PLUGIN_KEY, plugin)

    const alreadyConnected: Wallet | undefined = context.$cookies.get(Cookies.walletConnected)
    if (alreadyConnected) {
      await connectWallet(alreadyConnected)
    }
  })
}

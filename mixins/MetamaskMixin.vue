<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import detectEthereumProvider from '@metamask/detect-provider'
import { Events } from '~/types/global'

@Component({ name: 'MetamaskMixin' })
export default class MetamaskMixin extends Vue {
  async initMetamask(path: string) {
    try {
      if (typeof window.ethereum === 'undefined') {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: `Metamask Is not Installed. Please install Metamask extension for your browser`,
        })
        window.open('https://metamask.io/')
        return
      }
      const provider: any = await detectEthereumProvider()

      if (provider !== (window.ethereum as any)) {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: 'Do you have multiple wallets installed? Currently supporting only Ethereum Wallets',
        })
        return
      }

      if (provider === (window.ethereum as any)) {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })

        // console.log(accounts)
        await this.$store.dispatch('wallet/connectToWallet', {
          wallet: accounts[0],
          status: true,
        })

        if (path === 'app') {
          await this.$router.push(`/app`)
        } else {
          await this.$router.push(`/wallet/${accounts[0]}`)
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: error.message,
        })
      } else {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: 'Something went wrong with metamask',
        })
      }
    }
  }
}
</script>

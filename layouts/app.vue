<template>
  <v-app
    id="portfolio"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <v-main>
      <v-container fluid>
        <left-side-bar></left-side-bar>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'

import detectEthereumProvider from '@metamask/detect-provider'
import LayoutMixin from '~/mixins/LayoutMixin.vue'
import LeftSideBar from '~/components/app/LeftSideBar.vue'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'

import walletMiddleware from '~/middleware/wallet'

@Component({
  name: 'App',
  components: { LeftSideBar },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      address: (state: any) => state.wallet.address,
    }),
  },
  middleware: [walletMiddleware],
})
export default class App extends mixins(LayoutMixin, MetamaskMixin) {
  address!: string

  async mounted() {
    await this.initMetamask('app')
    /**
     Listener for account change
     */
    const provider: any = await detectEthereumProvider()

    if (provider) {
      await provider.request({ method: 'eth_accounts' })
      provider.on('accountsChanged', (accounts: string[]) => {
        if (!accounts.length) {
          this.$store.dispatch('wallet/metamaskLogout')
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<template>
  <v-dialog v-model="dialog" max-width="525">
    <v-card tile outlined class="pa-4">
      <h5 class="text-h6 mb-2">Connect to a Wallet</h5>
      <p class="grey--text text--lighten-1">
        By connecting a wallet, I agree to EVM Finance
        <nuxt-link to="/terms-and-conditions" class="text-decoration-none">Terms and Conditions</nuxt-link>
      </p>
      <v-alert v-model="errorAlert" color="error" dense dismissible>{{ error.message }}</v-alert>
      <v-list-item link class="mb-6 grey--text" @click="connectWallet('metamask')">
        <v-list-item-avatar tile width="60" height="60">
          <img width="60" height="60" :src="`/img/metamask.svg`" alt="metamask" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="text-h6"> Metamask</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action v-if="walletReady">
          <v-icon color="green" size="30">mdi-checkbox-marked-circle</v-icon>
        </v-list-item-action>
      </v-list-item>

      <div class="pa-4 grey--text">
        <h6 class="text-subtitle-1 font-weight-bold">New to Ethereum?</h6>
        <small>
          EVM Finance is a DeFi app on Ethereum. Set up an Ethereum Wallet to Invest and Trade here.
          <span>
            <a href="https://ethereum.org/en/wallets/" target="_blank" class="text-decoration-none">
              Learn More <v-icon size="14" color="primary">mdi-open-in-new</v-icon>
            </a>
          </span>
        </small>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore, inject, watch } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Web3ErrorInterface } from '~/plugins/web3/connector'

export default defineComponent({
  setup() {
    // COMPOSABLE
    const store = useStore<State>()
    const { connectWallet, resetErrors, walletReady, error } = inject(WEB3_PLUGIN_KEY) as Web3

    // STATE
    const errorAlert = ref(false)

    // COMPUTED
    const dialog = computed({
      get() {
        return store.state.ui.walletSelectionDialog
      },
      set(value) {
        store.dispatch('ui/walletDialogStatus', value)

        /**  Reset Error id when dialog opens or closes */
        errorAlert.value = false
        resetErrors()
      },
    })

    // WATCHES
    /** Display Error alert if wev3 error field is true */
    watch(error, (newVal: Web3ErrorInterface | null) => {
      if (newVal?.status) {
        errorAlert.value = true
      }
    })

    /** Display Error alert if wev3 error field is true */
    watch(walletReady, (val: boolean) => {
      if (val) {
        setTimeout(() => {
          dialog.value = false
        }, 2000)
      }
    })

    return {
      connectWallet,
      resetErrors,

      dialog,
      walletReady,
      error,
      errorAlert,
    }
  },
})
</script>

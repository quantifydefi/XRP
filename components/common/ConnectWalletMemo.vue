<template>
  <v-row justify="center" class="pt-3">
    <v-col cols="12" md="5">
      <v-card height="360" outlined tile>
        <v-container fill-height>
          <v-row justify="center" align="center">
            <v-col cols="12" class="text-center">
              <v-icon style="margin-left: 100px; margin-bottom: -10px" color="red" right>mdi-close-circle</v-icon>
              <div>
                <v-avatar size="80"><img src="/wallets/metamask.svg" /></v-avatar>
              </div>
              <div class="title">Wallet Not Connected</div>
              <div class="subtitle-2">To start using EVMX, please connect your Metamask Wallet</div>
              <div class="pt-3">
                <wallet-connector></wallet-connector>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import WalletConnector from '~/components/common/WalletConnector.vue'

export default defineComponent({ name: 'ConnectWalletMemo', components: { WalletConnector } })
</script>

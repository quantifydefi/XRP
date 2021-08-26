<template>
  <v-btn
    tile
    color="primary"
    class="mb-7"
    block
    height="48"
    @click="initMetamask"
    >Connect To Wallet</v-btn
  >
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'

@Component({ name: 'ConnectToWalletButton' })
export default class ConnectToWalletButton extends mixins(MetamaskMixin) {}
</script>

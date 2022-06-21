<template>
  <div class="text-no-wrap d-flex grey--text text--lighten-1">
    {{ label }}
    <v-tooltip top color="black">
      <template #activator="{ on, attrs }">
        <div
          v-if="isContract"
          v-bind="attrs"
          class="ml-1 cursor-copy white--text"
          v-on="on"
          @click="$copyAddressToClipboard(address)"
        >
          <v-avatar v-if="symbol" size="16" style="margin-top: -2px; margin-right: 2px">
            <img
              :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${symbol.toLowerCase()}.png`"
              :alt="`${symbol} logo`"
              @error="$setAltImageUrl"
            />
          </v-avatar>
          <v-icon v-else class="ml-1 mt-n1" small>mdi-file-sign</v-icon>
          {{ !name ? $truncateAddress(address, 4, 10) : name }}
        </div>

        <div
          v-else
          v-bind="attrs"
          :class="[
            'cursor-copy',
            'ml-1',
            address.toLowerCase() === walletAddress.toLowerCase() ? 'pink--text' : 'white--text',
          ]"
          v-on="on"
          @click="$copyAddressToClipboard(address)"
        >
          {{ $truncateAddress(address, 4, 10) }}
        </div>
      </template>
      <span class="caption">{{ address }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
      required: true,
    },
    walletAddress: {
      type: String,
      default: '',
      required: true,
    },
    isContract: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: '',
      required: true,
    },
    name: {
      type: String,
      default: '',
      required: true,
    },
    symbol: {
      type: String,
      default: '',
      required: true,
    },
  },
})
</script>

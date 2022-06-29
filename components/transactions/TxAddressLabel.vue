<template>
  <div class="text-no-wrap d-flex grey--text text--lighten-1">
    {{ label }}
    <a v-if="isContract" class="ml-1 cursor-copy white--text" @click="navigateToExplorer(address, 'address')">
      <v-avatar v-if="symbol" size="16" style="margin-top: -2px; margin-right: 2px">
        <img alt="" :src="$imageUrlBySymbol(symbol.toLowerCase())" @error="$setAltImageUrl" />
      </v-avatar>
      <v-icon v-else class="ml-1 mt-n1" small>mdi-file-sign</v-icon>
      {{ !name ? $truncateAddress(address, 4, 10) : name }}
    </a>

    <a
      v-else
      :class="['cursor-copy', 'ml-1', address === walletAddress ? 'pink--text' : 'white--text']"
      @click="navigateToExplorer(address, 'address')"
      v-text="$truncateAddress(address, 4, 10)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
type navigateToExplorerType = (address: string, type: 'tx' | 'address') => void
export default defineComponent({
  props: {
    label: { type: String, required: true },
    walletAddress: { type: String, required: true },
    isContract: { type: Boolean, default: false },
    address: { type: String, required: true },
    name: { type: String, default: '' },
    symbol: { type: String, default: '' },
    navigateToExplorer: { type: Function as PropType<navigateToExplorerType>, required: true },
  },
})
</script>

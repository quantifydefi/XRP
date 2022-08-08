<template>
  <v-menu v-if="currentChain" :close-on-content-click="false" nudge-bottom="13" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn elevation="0" class="px-2" color="transparent" tile v-bind="attrs" :disabled="!walletReady" v-on="on">
        <v-avatar size="26" tile>
          <v-img :src="$imageUrlBySymbol(currentChain.symbol)" :lazy-src="$imageUrlBySymbol(currentChain.symbol)" />
        </v-avatar>
        <v-icon class="ml-1" size="16">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card outlined tile>
      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-list-item-group>
              <v-list-item v-for="item in chains" :key="item.chainId" no-action :value="item" @change="onSelect(item)">
                <v-list-item-avatar size="24">
                  <v-img :src="$imageUrlBySymbol(item.symbol)" :lazy-src="$imageUrlBySymbol(item.symbol)" />
                </v-list-item-avatar>
                <v-list-item-content><v-list-item-title v-text="item.label" /></v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import useMarketSelector from '~/composables/useMarketSelector'

export default defineComponent({
  setup() {
    const { chains, currentChain, walletReady, chainId, onSelect } = useMarketSelector()

    return {
      chains,
      currentChain,
      walletReady,
      chainId,
      onSelect,
    }
  },
})
</script>

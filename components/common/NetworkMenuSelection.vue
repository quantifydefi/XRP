<template>
  <v-menu v-if="currentChain" :close-on-content-click="false" nudge-bottom="13" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn elevation="0" class="px-2" color="transparent" tile v-bind="attrs" v-on="on">
        <v-avatar size="26" class="mr-2" tile>
          <v-img :src="$imageUrlBySymbol(currentChain.symbol)" :lazy-src="$imageUrlBySymbol(currentChain.symbol)" />
        </v-avatar>
        <span class="text-capitalize" v-text="currentChain.label" />
        <v-icon class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card outlined tile>
      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-list-item-group v-model="selectedChainId" mandatory color="primary">
              <v-list-item v-for="item in chains" :key="item.chainId" :value="item.chainId">
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
import { defineComponent, ref, computed, useStore, watch } from '@nuxtjs/composition-api'
import { Chain } from '~/types/apollo/main/types'
import { State } from '~/types/state'

export default defineComponent({
  setup() {
    // COMPOSABLES
    const { state, getters, dispatch } = useStore<State>()

    // COMPUTED
    const currentChain = computed<Chain>(() => state.configs.currentTransactionChain)
    const selectedChainId = ref<number>(currentChain.value.chainId)
    const chains = computed<Chain[]>(() => getters['configs/transactionsChains'])

    // WATCHERS
    watch(selectedChainId, async (newChainId) => {
      const chain: Chain | undefined = chains.value.find((elem: { chainId: number }) => elem.chainId === newChainId)
      if (chain) {
        await dispatch('configs/changeCurrentTransactionChain', chain)
      }
    })

    return {
      currentChain,
      selectedChainId,
      chains,
    }
  },
})
</script>

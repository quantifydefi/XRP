<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <!--        {{ allChains }}-->
        <v-btn-toggle v-model="selectedChainId" dark mandatory tile color="primary">
          <v-btn
            v-for="(item, index) in allChains"
            :key="index"
            :value="item.id"
            tile
            depressed
            height="36"
            color="transparent"
          >
            <v-avatar size="24" class="mr-2">
              <img :src="$imageUrlBySymbol(item.symbol)" alt="" @error="$setAltImageUrl" />
            </v-avatar>
            <span class="text-body-2 text-capitalize">{{ item.name }}</span>
          </v-btn>
        </v-btn-toggle>

        <v-divider vertical class="mx-4" />

        <v-btn-toggle v-if="selectedNetwork" v-model="selectedDexId" dark mandatory rounded color="primary">
          <v-btn
            v-for="(item, index) in selectedNetwork.dex"
            :key="index"
            :value="item.value"
            rounded
            depressed
            height="26"
            color="transparent"
          >
            <v-avatar size="16" class="mr-2">
              <img :src="$imageUrlBySymbol(item.symbol)" alt="" @error="$setAltImageUrl" />
            </v-avatar>
            <span class="text-body-2 text-capitalize">{{ item.name }}</span>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <screener-grid :search="searchString" :dex-id="selectedDexId" :network-id="selectedChainId" />
      </v-col>
      <v-col cols="3">
        <alert-stream :network-id="selectedChainId" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import ScreenerGrid from '~/components/ScreenerGrid.vue'
import useMarketSelector from '~/composables/useMarketSelector'
import { Chain } from '~/types/apollo/main/types'
export default defineComponent({
  components: {
    ScreenerGrid,
  },
  setup() {
    const { allChains } = useMarketSelector()

    const searchString = ref('')
    const selectedChainId = ref('ethereum')
    const selectedDexId = ref('uniswap_v3')
    const selectedNetwork = computed<Chain | null>(
      () => allChains.value.find((elem) => elem.id === selectedChainId.value) ?? null
    )

    return {
      allChains,
      selectedDexId,
      searchString,
      selectedChainId,
      selectedNetwork,
    }
  },
  head: {},
})
</script>

<style scoped></style>

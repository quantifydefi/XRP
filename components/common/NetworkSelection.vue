<template>
  <v-menu v-if="currentChain" :close-on-content-click="false" nudge-bottom="13" offset-y>
    <template #activator="{ on, attrs }">
      <v-badge dot overlap :color="walletReady ? 'green' : 'red'" class="ml-1 mr-4">
        <v-btn fab width="38" height="38" elevation="0" color="transparent" v-bind="attrs" v-on="on">
          <v-avatar size="26"><v-img :src="currentChain.logoUrl"></v-img></v-avatar>
        </v-btn>
      </v-badge>
    </template>

    <v-card outlined tile>
      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-subheader>Select Network</v-subheader>
            <v-list-item-group v-model="selectedChainId" mandatory color="primary">
              <v-list-item v-for="item in chains" :key="item.chainId" :value="item.chainId">
                <v-list-item-avatar size="24"><v-img :src="item.logoUrl" /></v-list-item-avatar>
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
import { computed, defineComponent, inject, ref, useStore, watch } from '@nuxtjs/composition-api'
import { Chain } from '~/types/apollo/main/types'
import { State } from '~/types/state'
import { WEB3_PLUGIN_KEY, Web3 } from '~/plugins/web3/web3'

export default defineComponent({
  setup() {
    // COMPOSABLE
    const { state, dispatch } = useStore<State>()
    const { changeChain, walletReady } = inject(WEB3_PLUGIN_KEY) as Web3

    // STATE
    const selectedChainId = ref(1)

    // COMPUTED
    const chains = computed(() => state.configs.chains)
    const currentChain = computed(() => state.configs.currentChain)

    // METHODS
    function findChainById(id: number): Chain | null {
      const chain: Chain | undefined = chains.value.find((elem: { chainId: number }) => elem.chainId === id)
      if (chain) {
        return chain
      } else return null
    }

    // WATCH
    watch(selectedChainId, async (currentValue) => {
      const chain = findChainById(currentValue)

      // Changing chain in VUEX and web3 plugin
      if (chain) {
        await dispatch('configs/changeChain', chain)
        changeChain(chain)
      }
    })

    return {
      // COMPUTED
      selectedChainId,
      chains,
      currentChain,
      walletReady,
    }
  },
})
</script>

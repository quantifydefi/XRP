<template>
  <v-menu v-if="currentSelectedChain" :close-on-content-click="false" nudge-bottom="13" offset-y>
    <template #activator="{ on, attrs }">
      <v-btn elevation="0" class="px-2" color="transparent" tile v-bind="attrs" v-on="on">
        <v-avatar size="26" class="mr-2" tile>
          <v-img
            :src="currentSelectedChain.logoUrl"
            :lazy-src="currentSelectedChain.logoUrl"
            :alt="`${currentSelectedChain.name} logo`"
          />
        </v-avatar>
        <span class="text-capitalize" v-text="currentSelectedChain.label" />
        <v-icon class="ml-1">mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-card outlined tile>
      <v-row no-gutters>
        <v-col>
          <v-list dense>
            <v-list-item-group v-model="currentSelectedChain" mandatory color="primary">
              <v-list-item v-for="item in chains" :key="item.chainId" :value="item">
                <v-list-item-avatar size="24">
                  <v-img :src="item.logoUrl" :lazy-src="item.logoUrl" :alt="`${item.name} logo`" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title v-text="item.label" />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, PropType, toRef, ref, watch } from '@nuxtjs/composition-api'

import { Chain } from '~/types/apollo/main/types'
import { EmitEvents } from '~/types/events'

export default defineComponent({
  name: 'NetworkSelectionMenu',
  props: {
    chains: {
      type: Array as PropType<Chain[]>,
      default: [] as Chain[],
      required: true,
    },
    selectedChain: {
      type: Object as PropType<Chain>,
      default: null,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedChainId = ref(1)
    const currentSelectedChain = ref<Chain>(props.selectedChain)
    const supportedChains = toRef(props, 'chains')

    watch(currentSelectedChain, () => {
      emit(EmitEvents.onNetworkSelectChange, currentSelectedChain)
    })

    return {
      selectedChainId,
      supportedChains,
      currentSelectedChain,
    }
  },
})
</script>

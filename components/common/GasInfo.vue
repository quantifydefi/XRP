<template>
  <v-menu
    v-if="gas"
    :close-on-content-click="false"
    :nudge-width="300"
    :nudge-left="200"
    nudge-bottom="10"
    offset-y
    max-width="300"
  >
    <template #activator="{ on, attrs }">
      <div class="d-flex">
        <v-btn class="mt-1 subtitle-2 px-2 text-capitalize font-weight-regular" text tile v-bind="attrs" v-on="on">
          <div>
            <v-icon>mdi-gas-station</v-icon>
            <span class="ml-1"> {{ gas.fastGasPrice }}</span>
            <v-icon small>mdi-chevron-down</v-icon>
          </div>
        </v-btn>
      </div>
    </template>

    <v-card outlined tile>
      <v-row no-gutters class="px-3 py-1">
        <v-col cols="12">
          <div class="text-subtitle-2">Current Gas Prices</div>
        </v-col>
        <v-col cols="12">
          <span class="text-caption grey--text lighten-2"> Gas fees on the Ethereum Network </span></v-col
        >
      </v-row>
      <v-divider class="my-1" />
      <v-row no-gutters class="text-center caption pb-2">
        <v-col>
          <div>Fast</div>
          <div class="subtitle-2">{{ gas.fastGasPrice }} GWEI</div>
        </v-col>
        <v-col>
          <div>Average</div>
          <div class="subtitle-2">{{ gas.proposeGasPrice }} GWEI</div>
        </v-col>
        <v-col>
          <div>Slow</div>
          <div class="subtitle-2">{{ gas.safeGasPrice }} GWEI</div>
        </v-col>
      </v-row>
    </v-card>
  </v-menu>
</template>
<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
export default defineComponent({
  setup() {
    // COMPOSABLE
    const store = useStore<State>()

    // COMPUTED
    const gas = computed(() => store.state.configs.gasStats)

    return { gas }
  },
})
</script>

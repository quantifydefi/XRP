<template>
  <v-dialog v-model="dialog" persistent hide-overlay max-width="375">
    <v-card v-if="!sourcesToggle" tile outlined>
      <v-card-title class="subtitle-1 pa-3">
        Select Token
        <v-spacer />
        <v-btn icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-row justify="center" no-gutters>
        <v-col cols="11">
          <v-text-field
            dense
            color="pink"
            class="rounded-0"
            outlined
            solo
            clearable
            label="Search or paste token address"
            @input="onSearchChange"
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-divider />
      <div v-if="loading" style="height: 500px">
        <v-skeleton-loader v-for="i in 7" :key="i" type="list-item-avatar-two-line" />
      </div>

      <v-list v-show="!loading" class="text-left overflow-y-auto" height="500" dense>
        <v-list-item-group v-model="selectedAddress" color="primary">
          <v-list-item v-for="(item, i) in tokenList" :key="i" :value="item">
            <v-list-item-icon>
              <v-avatar size="28">
                <img :src="$imageUrlBySymbol(item.symbol)" alt="" @error="$setAltImageUrl" />
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-medium" v-text="item.symbol" />
              <v-list-item-subtitle class="grey--text" v-text="item.name" />
            </v-list-item-content>
            <v-list-item-action>
              <v-tooltip v-if="item.symbol !== 'ETH'" bottom color="black">
                <template #activator="{ on, attrs }">
                  <v-btn icon color="grey" x-small v-bind="attrs" v-on="on" @click="importToMetaMask(item)">
                    <v-icon size="14">mdi-wallet</v-icon>
                  </v-btn>
                </template>
                <span v-text="'Import To Metamask Wallet'" />
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
        <div v-if="hasMoreElements" class="mt-1 text-center text-caption" @click="nextPage">
          <nuxt-link class="pink--text" to="#">Load More</nuxt-link>
        </div>
      </v-list>
      <v-divider />
      <div class="text-center py-2" @click="sourcesToggle = !sourcesToggle">
        <nuxt-link to="#">Manage Token List</nuxt-link>
      </div>
    </v-card>

    <v-card v-if="sourcesToggle" tile outlined>
      <v-card-title class="subtitle-1 pa-3">
        <v-btn icon class="mr-2" @click="sourcesToggle = !sourcesToggle"><v-icon>mdi-arrow-left</v-icon></v-btn>
        Manage Token Source
        <v-spacer />
        <v-btn icon @click="sourcesToggle = !sourcesToggle"><v-icon>mdi-close</v-icon></v-btn>
      </v-card-title>

      <v-divider />

      <v-list class="text-left overflow-y-auto" max-height="340" dense>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in sources" :key="i">
            <v-list-item-icon>
              <v-avatar size="28">
                <v-img :src="item.image" :lazy-src="item.image" />
              </v-avatar>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="subtitle-1 font-weight-medium" v-text="item.name" />
            </v-list-item-content>
            <v-list-item-action>
              <v-switch v-model="item.active" />
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, useContext, watch } from '@nuxtjs/composition-api'
import useSwapTokensList from '~/composables/useSwapTokensList'
import { UniswapToken } from '~/types/apollo/main/types'
import { EmitEvents } from '~/types/events'

type importTokenToMetamaskFunction = (params: any) => void

type Props = {
  importTokenToMetamask: importTokenToMetamaskFunction
}

export default defineComponent<Props>({
  props: {
    importTokenToMetamask: { type: Function as PropType<importTokenToMetamaskFunction>, required: true },
  },

  setup(props, { emit }) {
    // STATE
    const tokenAddressSearch = ref('')
    const sourcesToggle = ref(false)
    const dialog = ref(false)
    const selectedAddress = ref<UniswapToken | null>(null)
    const { sources, tokenList, hasMoreElements, loading, onSearchChange, nextPage } = useSwapTokensList()
    const { $imageUrlBySymbol } = useContext()

    async function importToMetaMask(token: UniswapToken) {
      await props.importTokenToMetamask({
        address: token.address,
        symbol: token.symbol,
        decimals: token.decimals,
        image: $imageUrlBySymbol(token.symbol),
      })
    }

    // WATCHERS
    watch(selectedAddress, (newVal: UniswapToken | null) => {
      if (newVal) {
        emit(EmitEvents.onUniswapTokenSelect, newVal)
        dialog.value = false
      }
    })

    return {
      dialog,
      loading,
      tokenList,
      sources,
      sourcesToggle,
      tokenAddressSearch,
      hasMoreElements,
      selectedAddress,
      onSearchChange,
      nextPage,
      importToMetaMask,
    }
  },
})
</script>

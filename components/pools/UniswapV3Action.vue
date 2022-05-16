<template>
  <div id="uniswap-dialog">
    <v-btn tile @click="toggleDialog(true)">Uniswap Action Dialog</v-btn>
    <client-only>
      <v-dialog v-model="dialog" max-width="580" class="rounded-0">
        <v-row class="overflow-hidden" no-gutters justify="center">
          <v-col cols="12">
            <v-card tile outlined width="100%">
              <v-card-title class="justify-center pa-2 text-no-wrap">
                <v-col cols="4">
                  <v-spacer />
                  <v-btn-toggle tile>
                    <v-btn small>AAVE</v-btn>
                    <v-btn small>WETH</v-btn>
                  </v-btn-toggle>
                </v-col>
                <v-col cols="4" class="text-center">Add Liquidity</v-col>
                <v-col cols="4" class="text-right">
                  <v-btn icon><v-icon>mdi-cog</v-icon></v-btn>
                  <v-btn icon @click="toggleDialog(false)"><v-icon>mdi-close</v-icon></v-btn>
                </v-col>
              </v-card-title>
              <v-divider />
              <v-row no-gutters class="pa-6" justify="center">
                <v-col cols="12" class="px-1">
                  <v-row justify="center">
                    <v-col cols="12" class="px-2 py-0 d-flex" :class="ui[theme].subTextColor">
                      <div>Deposit Pair</div>
                      <v-spacer />
                      <v-btn x-small text color="primary" class="text-capitalize">Clear All</v-btn>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <v-row>
                        <v-col cols="12" class="pa-2">
                          <v-row no-gutters>
                            <span class="caption">Available Balance:</span> <v-spacer /><span class="caption"
                              >0 ETH</span
                            >
                          </v-row>
                          <token-input-select
                            :token-list="list"
                            :token-selected="input.selectedTokenA"
                            @on-value-changed="onInputChange($event, 1)"
                            @on-token-select-change="onTokenSelectChange($event, 1)"
                          ></token-input-select>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="12" lg="6">
                      <v-row class="py-0">
                        <v-col cols="12" class="pa-2">
                          <v-row no-gutters>
                            <span class="caption">Available Balance:</span> <v-spacer /><span class="caption"
                              >0 ETH</span
                            >
                          </v-row>

                          <token-input-select
                            :token-list="list"
                            :token-selected="input.selectedTokenB"
                            @on-value-changed="onInputChange($event, 2)"
                            @on-token-select-change="onTokenSelectChange($event, 2)"
                          ></token-input-select>
                        </v-col>
                      </v-row>
                    </v-col>

                    <v-col cols="12" class="px-2 py-1" :class="ui[theme].subTextColor"> Fee Tier </v-col>
                    <v-col v-for="item in feeTier" :key="item.title" cols="6" lg="3" class="px-2 py-0">
                      <v-sheet outlined :color="item.title === selectedFee.title ? 'primary' : ''">
                        <v-card
                          outlined
                          tile
                          height="100"
                          :color="$vuetify.theme.dark ? '#121212' : ''"
                          @click="selectedFee = item"
                        >
                          <div class="pa-2">
                            <v-row class="subtitle-2">
                              <v-col> {{ item.title }}</v-col>
                              <v-col v-if="item.title === selectedFee.title" class="text-right">
                                <v-icon
                                  size="20"
                                  class="mt-n10 mr-n3"
                                  :color="item.title === selectedFee.title ? 'primary' : ''"
                                >
                                  mdi-check-circle
                                </v-icon>
                              </v-col>
                            </v-row>
                            <div class="caption grey--text" style="line-height: normal">
                              {{ item.description }}
                            </div>
                            <v-chip
                              x-small
                              :color="item.title === selectedFee.title ? 'primary' : ''"
                              class="rounded-0 font-weight-medium"
                            >
                              {{ item.selectedPercentage * 100 }}% select
                            </v-chip>
                          </div>
                        </v-card>
                      </v-sheet>
                    </v-col>

                    <v-col cols="12" class="pa-2" :class="ui[theme].subTextColor"> Price Range </v-col>
                    <v-col cols="12" class="px-2 py-0">
                      <v-card outlined tile height="180"></v-card>
                    </v-col>

                    <v-col cols="6" lg="5">
                      <v-sheet outlined tile>
                        <v-card
                          class="text-center pa-3"
                          outlined
                          elevation="0"
                          tile
                          :color="$vuetify.theme.dark ? '#121212' : ''"
                        >
                          <div class="subtitle-2 grey--text">Max Price</div>
                          <div>
                            <v-btn elevation="1" fab x-small @click="minusMaxPrice">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="px-3"> {{ range.max.toFixed(2) }}</span>

                            <v-btn elevation="1" fab x-small @click="addMaxPrice">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                          <div class="caption">
                            {{ input.selectedTokenA.symbol }} per {{ input.selectedTokenB.symbol }}
                          </div>
                        </v-card>
                      </v-sheet>
                    </v-col>
                    <v-col cols="6" lg="5">
                      <v-sheet outlined tile>
                        <v-card
                          class="text-center pa-3"
                          outlined
                          elevation="0"
                          tile
                          :color="$vuetify.theme.dark ? '#121212' : ''"
                        >
                          <div class="subtitle-2 grey--text">Min Price</div>
                          <div>
                            <v-btn elevation="1" fab x-small @click="minusMinPrice">
                              <v-icon>mdi-minus</v-icon>
                            </v-btn>
                            <span class="px-3"> {{ range.min.toFixed(2) }}</span>

                            <v-btn elevation="1" fab x-small @click="addMinPrice">
                              <v-icon>mdi-plus</v-icon>
                            </v-btn>
                          </div>
                          <div class="caption">
                            {{ input.selectedTokenA.symbol }} per {{ input.selectedTokenB.symbol }}
                          </div>
                        </v-card>
                      </v-sheet>
                    </v-col>

                    <v-col cols="12" class="pb-1">
                      <v-sheet outlined tile>
                        <v-btn
                          :color="$vuetify.theme.dark ? '#121212' : ''"
                          elevation="0"
                          block
                          small
                          class="text-capitalize font-weight-medium"
                          @click="fullRange"
                        >
                          Full Range
                        </v-btn>
                      </v-sheet>
                    </v-col>
                    <v-col cols="12">
                      <v-btn class="text-capitalize" tile block large color="primary">Create Position</v-btn>
                    </v-col>
                  </v-row>

                  <!-- <v-row>
                  <v-col v-for="i in 4" :key="i">
                    <v-card outlined tile height="100"></v-card>
                  </v-col>
                </v-row> -->
                </v-col>
                <!-- <v-col cols="12" lg="5" class="pa-1">
                <v-row class="ml-3">
                  <v-col cols="12" class="py-0 subtitle-2" :class="ui[theme].subTextColor">Fee Tier</v-col>
                  <v-col>
                    <v-card outlined tile height="280"></v-card>
                  </v-col>
                </v-row>
              </v-col> -->
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-dialog>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, computed, ref, reactive } from '@nuxtjs/composition-api'
import TokenInputSelect from '../forms/TokenInputSelect.vue'
import { State, ThemeOptions, UiState } from '~/types/state'
import { TokenSelectInterface } from '~/types/token'
import { tokenList, feeTiers } from '~/mock/data'

export default defineComponent({
  components: { TokenInputSelect },
  setup() {
    const { state } = useStore<State>()
    const ui = computed<UiState>(() => state.ui)
    const theme = computed<ThemeOptions>(() => state.ui.theme)

    const dialog = ref(false)
    const list = ref<TokenSelectInterface[]>(tokenList)
    const feeTier = ref(feeTiers)

    const range = ref({
      min: 80,
      max: 800,
      range: [0, 1000],
    })

    function minusMinPrice(): void {
      if (range.value.min > 0) {
        range.value.min--
      }
    }

    function addMinPrice(): void {
      range.value.min++
    }

    function minusMaxPrice(): void {
      if (range.value.max > 0) {
        range.value.max--
      }
    }

    function addMaxPrice(): void {
      range.value.max++
    }

    const input = reactive<{
      selectedTokenA: TokenSelectInterface
      tokenAmountA: number | null
      selectedTokenB: TokenSelectInterface
      tokenAmountB: number | null
    }>({
      selectedTokenA: {
        chainId: 1,
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        name: 'Wrapped Ether',
        symbol: 'WETH',
        decimals: 18,
        logoURI:
          'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
      },
      tokenAmountA: null,
      selectedTokenB: {
        chainId: 137,
        address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B',
        name: 'Aave',
        symbol: 'AAVE',
        decimals: 18,
        logoURI: 'https://assets.coingecko.com/coins/images/12645/thumb/AAVE.png?1601374110',
      },
      tokenAmountB: null,
    })

    const selectedFee = ref({
      title: '',
      description: '',
      selectedPercentage: 0,
    })

    // watch(
    //   input,
    //   (newVal) => {
    //     console.log(newVal)
    //   },
    //   { deep: true }
    // )

    /** METHODS **/
    function toggleDialog(value: boolean) {
      dialog.value = value
    }

    function onTokenSelectChange(value: TokenSelectInterface, id: number) {
      if (id === 1) {
        input.selectedTokenA = value
      }

      if (id === 2) {
        input.selectedTokenB = value
      }

      console.log(input.selectedTokenA, input.selectedTokenB)
    }

    function onInputChange(value: TokenSelectInterface, id: number) {
      if (id === 1) {
        input.tokenAmountA = +value
      }

      if (id === 2) {
        input.tokenAmountB = +value
      }

      console.log(`tokenAmountA: ${input.tokenAmountA}`, `tokenAmountB: ${input.tokenAmountB}`)
    }

    function fullRange() {
      range.value.min = range.value.range[0]
      range.value.max = range.value.range[1]
    }

    return {
      ui,
      theme,
      dialog,
      input,
      list,
      feeTier,
      selectedFee,
      range,
      // Methods
      toggleDialog,
      onTokenSelectChange,
      onInputChange,
      fullRange,
      minusMinPrice,
      addMinPrice,
      minusMaxPrice,
      addMaxPrice,
    }
  },
})
</script>

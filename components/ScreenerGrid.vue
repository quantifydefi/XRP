<template>
  <div>
    <v-btn-toggle v-model="dex" dark mandatory tile color="primary" class="mt-4 mb-2">
      <v-btn
        v-for="(item, index) in supportedDexes"
        :key="index"
        :value="item.value"
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

    <v-card tile outlined>
      <v-skeleton-loader v-if="loading" type="table-tbody,table-tbody,table-tbody" />

      <client-only>
        <v-data-table
          v-if="!loading"
          id="curve-pools-grid"
          hide-default-footer
          :headers="cols"
          :items="screenerDataFormatted"
          :items-per-page="50"
          class="elevation-0"
          :single-expand="false"
          item-key="address"
          mobile-breakpoint="0"
          @update:options="(options) => loadPage(options)"
        >
          <!--      Cols-->
          <template #item.rank="{ item }">
            <div class="my-1">
              <v-row no-gutters align="center">
                <v-col cols="2">
                  <v-avatar size="24" class="ml-2">
                    <img :src="$imageUrlBySymbol(item.token0Symbol)" alt="" @error="$setAltImageUrl" />
                  </v-avatar>
                </v-col>
                <v-col>
                  <v-row no-gutters>
                    <v-col>
                      <nuxt-link
                        class="text-capitalize font-weight-bold pink--text text-decoration-none"
                        :to="{
                          path: `/token/${item.token0Symbol}`,
                          query: {
                            name: item.token0Symbol,
                            contract: item.token0Address,
                            decimals: item.token0Decimals,
                          },
                        }"
                        v-text="item.token0Name"
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <span class="grey--text text-caption" v-text="`${item.token0Symbol}/${item.token1Symbol}`" />
                      <v-tooltip bottom color="black">
                        <template #activator="{ on, attrs }">
                          <v-btn
                            icon
                            color="grey"
                            x-small
                            v-bind="attrs"
                            v-on="on"
                            @click="copyAddressToClipboard(item.address)"
                          >
                            <v-icon size="12">mdi-content-copy</v-icon>
                          </v-btn>
                        </template>
                        <span v-text="'Copy Address'" />
                      </v-tooltip>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </template>

          <template #item.token_0_price_usd="{ item }">
            <!--          {{ item.price }}-->

            <span :class="`${item.priceUpdateOptions.color}--text`">
              {{ item.price }}
              <v-icon v-if="item.priceUpdateOptions.status" :color="item.priceUpdateOptions.color" size="14"
                >{{ item.priceUpdateOptions.icon }}
              </v-icon>
            </span>
          </template>

          <template #item.change_5min="{ item }">
            <span :class="`${item.change5min.color}--text`">
              {{ item.change5min.value }}
              <v-icon v-if="item.change5min.icon" :color="item.change5min.color" size="14"
                >{{ item.change5min.icon }}
              </v-icon>
            </span>
          </template>

          <template #item.change_1h="{ item }">
            <span :class="`${item.change1h.color}--text`">
              {{ item.change1h.value }}
              <v-icon v-if="item.change1h.icon" :color="item.change1h.color" size="14"
                >{{ item.change1h.icon }}
              </v-icon>
            </span>
          </template>

          <template #item.change_24h="{ item }">
            <span :class="`${item.change24h.color}--text`">
              {{ item.change24h.value }}
              <v-icon v-if="item.change24h.icon" :color="item.change24h.color" size="14"
                >{{ item.change24h.icon }}
              </v-icon>
            </span>
          </template>
        </v-data-table>
      </client-only>
    </v-card>
    <v-pagination v-model="currentPage" :length="currentPage + 1" class="mt-4" />
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  useContext,
  useStore,
  watchEffect,
} from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Chain, Pool, PriceStream } from '~/types/apollo/main/types'
import emitter from '~/types/emitter'
import useTokenScreener from '~/composables/useTokenScreener'

type ScreenerItemObserver = Pool & {
  priceUpdateOptions: { status: boolean; color: string | null; icon: string | null }
}
type Props = {
  search: string | null
}
export default defineComponent<Props>({
  props: {
    search: { type: String as PropType<string | null>, default: null, required: false },
  },
  setup() {
    // COMPOSABLE
    const { state, getters } = useStore<State>()
    const { walletReady, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
    const { $copyAddressToClipboard, $f, $applyPtcChange } = useContext()
    let priceUpdateTimeout: any = null

    // COMPUTED
    // const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)

    // STATE
    const screenerDataObserver = ref<ScreenerItemObserver[]>([])
    const sortBy = ref<string>('rank')
    const order = ref<string>('asc')
    const dex = ref('uniswap_v2')
    const supportedDexes = ref([
      { name: 'Uniswap V3', value: 'uniswap_v3', symbol: 'UNI' },
      { name: 'Uniswap V2', value: 'uniswap_v2', symbol: 'UNI' },
    ])

    const { screenerData, currentPage, loading } = useTokenScreener(dex, sortBy, order)

    watchEffect(
      () =>
        (screenerDataObserver.value = screenerData.value.map((elem) => ({
          ...elem,
          priceUpdateOptions: { status: false, color: null, icon: null },
        })))
    )

    const screenerDataFormatted = computed(() =>
      screenerDataObserver.value.map((elem) => ({
        ...elem,
        price: $f(elem.token0PriceUSD, { pre: '$ ', minDigits: 2, maxDigits: 6 }),
        change5min: $applyPtcChange(elem.change5Min),
        change1h: $applyPtcChange(elem.change1h),
        change24h: $applyPtcChange(elem.change24h),
      }))
    )

    const updateData = (input: PriceStream[]) => {
      clearTimeout(priceUpdateTimeout)
      input.forEach((inputElem) => {
        const currentGridRaw = screenerDataObserver.value.find((elem) => elem.address === inputElem.pairAddress)
        if (currentGridRaw) {
          if (inputElem.token0PriceUSD > currentGridRaw.token0PriceUSD) {
            currentGridRaw.priceUpdateOptions = { status: true, color: 'green', icon: 'mdi-arrow-up' }
          } else {
            currentGridRaw.priceUpdateOptions = { status: true, color: 'red', icon: 'mdi-arrow-down' }
          }
          currentGridRaw.token0PriceUSD = inputElem.token0PriceUSD
        }
      })

      priceUpdateTimeout = setTimeout(() => {
        input.forEach((inputElem) => {
          const currentGridRaw = screenerDataObserver.value.find((elem) => elem.address === inputElem.pairAddress)
          if (currentGridRaw) {
            currentGridRaw.priceUpdateOptions = { status: false, color: null, icon: null }
          }
        })
      }, 3000)
    }

    const loadPage = (options: any) => {
      const opt = { sortBy: 'rank', order: 'asc' }

      console.log(options)
      if (options.sortBy.length > 0) {
        opt.sortBy = options.sortBy[0]
      }
      if (options.sortDesc.length > 0) {
        opt.order = options.sortDesc[0] ? 'desc' : 'asc'
      }
      console.log(opt)
      sortBy.value = opt.sortBy
      order.value = opt.order
    }

    /*    const applyChange = (val: number) => {
      const rounded = parseFloat((val * 100).toFixed(2))
      if (rounded === 0) {
        return { value: '0,00%', color: 'grey', icon: null }
      }
      if (rounded > 0) {
        return { value: `${rounded}%`, color: 'green', icon: 'mdi-arrow-up' }
      }
      if (rounded < 0) {
        return { value: `${rounded}%`, color: 'red', icon: 'mdi-arrow-down' }
      }
      return { value: '-', color: 'grey', icon: null }
    } */

    emitter.on('priceStream', (val: any) => {
      const prices: PriceStream[] = val.priceStream ?? []
      updateData(prices)
    })

    const cols = computed(() => {
      return [
        {
          text: 'Assets',
          align: 'left',
          value: 'rank',
          width: '400',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
          sortable: true,
        },

        {
          text: 'Price',
          align: 'left',
          value: 'token_0_price_usd',
          width: '200',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
          sortable: true,
        },
        {
          text: '',
          align: 'left',
          value: 'priceUpdated.status',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
          sortable: false,
        },

        {
          text: '% 5m',
          align: 'left',
          value: 'change_5min',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },

        {
          text: '% 1h',
          align: 'left',
          value: 'change_1h',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },
        {
          text: '% 24h',
          align: 'left',
          value: 'change_24h',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },
      ]
    })

    // const dataLoading = toRefs(props).loading
    // const searchString = toRefs(props).search

    // METHODS
    /*    function initAction(poolAddress: string, action: actionTypes) {
      const pool: AavePoolModel | undefined = aavePools.value.find((elem) => elem.id === poolAddress)
      if (pool) {
        emit(EmitEvents.initAction, { action, pool })
      }
    } */

    /*    async function importToMetamask(poolId: string) {
      const pool: AavePoolModel | undefined = aavePools.value.find((elem) => elem.id === poolId)
      if (pool) {
        await importTokenToMetamask({
          address: pool.underlyingAsset,
          symbol: pool.symbol,
          decimals: pool.decimals,
          image: pool.logoUrl,
        })
      }
    } */

    // METHODS
    function navigateToExplorer(address: string) {
      const currentChain: Chain = getters['configs/chainInfo'](chainId.value ?? 1)
      const url = `${currentChain.blockExplorerUrl}address/${address}`
      window.open(url)
    }

    /*   function expendSingleRow() {
      if (props.expandFirstRow && aavePools.value.length > 0) {
        const firstRow: AavePoolModel = aavePools.value[0]
        expanded.value.push(firstRow)
      }
    } */

    // WATCHERS
    // watch(aavePools, () => expendSingleRow())

    return {
      // DATA
      screenerData,
      screenerDataFormatted,
      cols,
      walletReady,
      currentPage,
      loading,
      supportedDexes,
      dex,
      loadPage,
      updateData,
      navigateToExplorer,
      copyAddressToClipboard: $copyAddressToClipboard,
    }
  },
})
</script>

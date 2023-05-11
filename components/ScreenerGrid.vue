<template>
  <v-card tile outlined>
    <v-skeleton-loader v-if="dataLoading" type="table-tbody,table-tbody,table-tbody" />
    <client-only>
      <v-data-table
        v-if="!dataLoading"
        id="curve-pools-grid"
        hide-default-footer
        :headers="cols"
        :items="screenerDataFormatted"
        :sort-by="['usdBalance']"
        :sort-desc="[true]"
        :items-per-page="50"
        class="elevation-0"
        :expanded.sync="expanded"
        :single-expand="false"
        item-key="address"
        mobile-breakpoint="0"
      >
        <!--      Cols-->
        <template #item.symbol="{ item }">
          <div class="my-1">
            <v-row no-gutters align="center">
              <v-col cols="2">
                <v-avatar size="24" class="ml-2">
                  <img :src="$imageUrlBySymbol(item.symbol)" alt="" @error="$setAltImageUrl" />
                </v-avatar>
              </v-col>
              <v-col>
                <v-row no-gutters>
                  <v-col>
                    <nuxt-link
                      class="text-capitalize font-weight-bold pink--text text-decoration-none"
                      :to="{
                        path: `/token/${item.symbol}`,
                        query: { name: item.name, contract: item.address, decimals: item.decimals },
                      }"
                      v-text="item.name"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col>
                    <span :class="[textClass, 'text-caption']" v-text="`${item.token0Symbol}/${item.token1Symbol}`" />
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

        <template #item.change5min="{ item }">
          <span :class="`${item.change5min.color}--text`">
            {{ item.change5min.value }}
            <v-icon v-if="item.change5min.icon" :color="item.change5min.color" size="14"
              >{{ item.change5min.icon }}
            </v-icon>
          </span>
        </template>

        <template #item.change1h="{ item }">
          <span :class="`${item.change1h.color}--text`">
            {{ item.change1h.value }}
            <v-icon v-if="item.change1h.icon" :color="item.change1h.color" size="14">{{ item.change1h.icon }} </v-icon>
          </span>
        </template>

        <template #item.change24h="{ item }">
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
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  PropType,
  ref,
  toRefs,
  UnwrapRef,
  useContext,
  useStore,
} from '@nuxtjs/composition-api'
import { AavePoolModel, aaveActions } from '~/composables/useAavePools'
import { State } from '~/types/state'
import { Web3, WEB3_PLUGIN_KEY } from '~/plugins/web3/web3'
import { Chain, ScreenerItem } from '~/types/apollo/main/types'
type Props = {
  screenerData: ScreenerItem[]
  loading: boolean
  search: string | null
  hideActionCols: boolean
  expandFirstRow: boolean
}
export default defineComponent<Props>({
  props: {
    screenerData: { type: Array as PropType<UnwrapRef<ScreenerItem[]>>, default: () => [], required: true },
    loading: { type: Boolean, default: true },
    search: { type: String as PropType<string | null>, default: null, required: false },
    hideActionCols: { type: Boolean, default: false },
    expandFirstRow: { type: Boolean, default: false },
  },
  setup(props) {
    // COMPOSABLE
    const { state, getters } = useStore<State>()
    const { walletReady, chainId } = inject(WEB3_PLUGIN_KEY) as Web3
    const { $copyAddressToClipboard, $f } = useContext()

    // COMPUTED
    const textClass = computed(() => state.ui[state.ui.theme].innerCardLighten)

    // STATE
    const expanded: any = ref<AavePoolModel[]>([])
    const datatable: any = ref(null)

    const screenerDataFormatted = computed(() =>
      props.screenerData.map((elem) => ({
        ...elem,
        price: $f(elem.PriceUSD, { pre: '$ ', minDigits: 2, maxDigits: 9 }),
        change5min: applyChange(elem.change5Min),
        change1h: applyChange(elem.change1h),
        change24h: applyChange(elem.change24h),
      }))
    )

    const applyChange = (val: number) => {
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
    }

    const cols = computed(() => {
      const cols = [
        {
          text: 'Assets',
          align: 'left',
          value: 'symbol',
          width: '300',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },

        {
          text: 'Price',
          align: 'left',
          value: 'price',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },

        {
          text: '% 5m',
          align: 'left',
          value: 'change5min',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },

        {
          text: '% 1h',
          align: 'left',
          value: 'change1h',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },
        {
          text: '% 24h',
          align: 'left',
          value: 'change24h',
          class: ['px-2', 'text-truncate'],
          cellClass: ['px-2', 'text-truncate'],
        },
      ]
      return props.hideActionCols ? cols.filter((item) => item.value !== 'action') : cols
    })

    const dataLoading = toRefs(props).loading
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
      screenerDataFormatted,
      dataLoading,
      cols,
      textClass,
      expanded,
      aaveActions,
      walletReady,
      // searchString,
      datatable,

      //  METHODS
      navigateToExplorer,
      copyAddressToClipboard: $copyAddressToClipboard,
    }
  },
})
</script>

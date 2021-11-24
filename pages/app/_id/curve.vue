<template>
  <client-only>
    <v-data-table
      id="curve-assets"
      :style="{
        backgroundColor: $vuetify.theme.themes[theme].background,
      }"
      :headers="cols"
      :items="poolList"
      mobile-breakpoint="0"
      disable-pagination
      hide-default-footer
      :sort-by="['volume']"
      :sort-desc="[true]"
    >
      <template #[`item.name`]="{ item }">
        <v-row
          no-gutters
          class="text-no-wrap text-left py-3 overflow-hidden"
          style="min-width: 200px"
        >
          <v-col
            cols="2"
            style="display: flex; justify-content: center; align-items: center"
          >
            <v-avatar v-if="item.coingeckoInfo" size="32">
              <img
                :alt="` logo`"
                :src="`https://curve.fi/static/icons/svg/crypto-icons-stack-2-ethereum.svg#${item.coingeckoInfo.symbol.toLowerCase()}`"
              />
            </v-avatar>

            <v-avatar v-else size="32">
              <img
                :alt="` logo`"
                :src="`https://curve.fi/static/icons/svg/crypto-icons-stack-2-ethereum.svg#${item.name}`"
              />
            </v-avatar>
          </v-col>
          <v-col cols="9" class="pl-3">
            <div class="subtitle-2">
              {{ item.name }}
              <v-chip
                v-if="item.referenceAsset"
                label
                x-small
                class="ml-2 text-uppercase rounded-0"
                color="grey darken-3"
                >{{ item.referenceAsset }}
              </v-chip>
              <v-chip
                v-else
                label
                x-small
                class="ml-2 text-uppercase rounded-0"
                color="grey darken-3"
                >USD
              </v-chip>
            </div>

            <div class="caption text-no-wrap">
              {{ item.assets }}
            </div>
          </v-col>
        </v-row>
      </template>

      <template #[`item.balance`]>
        <div style="min-width: 70px">
          <div class="subtitle-2">0</div>
          <div class="text-no-wrap">
            0.00
            <span class="caption">USD</span>
          </div>
        </div>
      </template>

      <template #[`item.baseApy`]="{ item }">
        <div>{{ (item.baseApy * 100).toFixed(2) }}%</div>
      </template>

      <!--      <template #[`item.baseApy`]="{ item }">-->
      <!--        <v-chip-->
      <!--          small-->
      <!--          label-->
      <!--          outlined-->
      <!--          color="grey darken-2"-->
      <!--          class="mt-2 caption font-weight-medium rounded-0"-->
      <!--        >-->
      <!--          <span-->
      <!--            :style="{-->
      <!--              width: '60px',-->
      <!--              color: $vuetify.theme.themes[theme].baseText,-->
      <!--            }"-->
      <!--          >-->
      <!--            {{ (item.baseApy * 100).toFixed(2) }}% APY-->
      <!--          </span>-->
      <!--        </v-chip>-->
      <!--      </template>-->

      <!--      <template #[`item.crvApy`]="{ item }">-->
      <!--        <v-chip-->
      <!--          v-if="item.crvApy"-->
      <!--          small-->
      <!--          label-->
      <!--          outlined-->
      <!--          color="grey darken-2"-->
      <!--          class="mt-2 caption font-weight-medium rounded-0"-->
      <!--        >-->
      <!--          <span-->
      <!--            :style="{-->
      <!--              width: '100px',-->
      <!--              color: $vuetify.theme.themes[theme].baseText,-->
      <!--            }"-->
      <!--          >-->
      <!--            +{{ item.crvApy.toFixed(2) }}% →-->
      <!--            {{ (item.crvApy * 2.5).toFixed(2) }}%-->
      <!--          </span>-->
      <!--        </v-chip>-->
      <!--      </template>-->

      <template #[`item.crvApy`]="{ item }">
        <div v-if="item.crvApy" class="text-no-wrap caption">
          +{{ item.crvApy.toFixed(2) }}% → {{ (item.crvApy * 2.5).toFixed(2) }}%
        </div>
      </template>

      <template #[`item.volume`]="{ item }">
        <div v-if="item.volume > 0">
          $
          {{ numFormatter(item.volume) }}
        </div>
      </template>

      <template #[`item.actions`]>
        <v-row no-gutters class="text-no-wrap" style="min-width: 480px">
          <v-col cols="3">
            <v-btn
              small
              width="110"
              class="mt-3 mx-3 rounded-xl"
              outlined
              color="grey darken-2"
            >
              <span
                :style="{
                  color: $vuetify.theme.themes[theme].baseText,
                }"
              >
                Deposit
              </span>
            </v-btn>
          </v-col>

          <v-col cols="3">
            <v-btn
              small
              width="110"
              class="mt-3 mx-3 rounded-xl"
              outlined
              color="grey darken-2"
            >
              <span
                :style="{
                  color: $vuetify.theme.themes[theme].baseText,
                }"
              >
                Borrow
              </span>
            </v-btn>
          </v-col>

          <v-col cols="3">
            <v-btn
              small
              width="110"
              class="mt-3 mx-3 rounded-xl"
              outlined
              color="grey darken-2"
            >
              <span
                :style="{
                  color: $vuetify.theme.themes[theme].baseText,
                }"
              >
                Repay
              </span>
            </v-btn>
          </v-col>

          <v-col cols="3">
            <v-btn
              small
              width="110"
              outlined
              class="mt-3 mx-3 rounded-xl"
              color="grey darken-2"
            >
              <span
                :style="{
                  color: $vuetify.theme.themes[theme].baseText,
                }"
              >
                Withdraw
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>
  </client-only>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { pools } from '@/constants/curve/pools'

@Component({
  name: 'Curve',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      stablePoolStats: (state: any) => state.curve.stablePoolStats,
      cryptoPoolStats: (state: any) => state.curve.cryptoPoolStats,
      apys: (state: any) => state.curve.apys,
    }),
  },
})
export default class Curve extends Vue {
  stablePoolStats: any
  cryptoPoolStats: any
  apys: any

  get cols() {
    return [
      {
        text: 'Pool',
        align: 'start',
        value: 'name',
      },
      {
        text: 'Balance',
        align: 'start',
        value: 'balance',
      },
      {
        text: 'Base vAPY',
        align: 'start',
        value: 'baseApy',
        class: 'text-no-wrap',
      },
      {
        text: 'Rewards tAPY',
        align: 'start',
        value: 'crvApy',
        class: 'text-no-wrap',
      },
      {
        text: 'Volume',
        align: 'start',
        value: 'volume',
        class: 'text-no-wrap',
      },
      {
        text: '',
        align: 'start',
        value: 'actions',
        sortable: false,
      },
    ]
  }

  numFormatter(num: number) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
    } else if (num < 900) {
      return num.toFixed(2) // if value < 1000, nothing to do
    }
  }

  poolList: any = []

  async mounted() {
    await this.$store.dispatch('curve/stablePoolStats')
    await this.$store.dispatch('curve/cryptoPoolStats')
    await this.$store.dispatch('curve/getApys')

    console.log(this.$store.state.curve.apys)

    for (const pool of pools) {
      const item = {
        ...pool,
        baseApy: this.stablePoolStats.apy.day[pool.name.toLowerCase()] || 0,
        volume: this.stablePoolStats.volume[pool.name.toLowerCase()] || 0,
        crvApy: 0,
      }

      if (this.apys[pool.name.toLowerCase()]) {
        item.crvApy = this.apys[pool.name.toLowerCase()].crvApy || 0
      }

      if (pool.referenceAsset === 'crypto') {
        item.baseApy = this.cryptoPoolStats.apy.day[pool.name.toLowerCase()]
        item.volume = this.cryptoPoolStats.volume[pool.name.toLowerCase()]

        console.log(item)
      }

      // item.apy = this.stablePoolstats.apy.day[pool.name.toLowerCase()]
      this.poolList.push(item)
    }

    console.log(this.$store.state.curve.stablePoolStats)
  }
}
</script>

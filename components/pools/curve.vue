<template>
  <v-card tile outlined height="100%">
    <v-skeleton-loader v-if="isPoolsLoading" type="table-tbody,table-tbody,table-tbody" />
    <v-data-table
      v-if="!isPoolsLoading"
      id="curve-pools-grid"
      :headers="cols"
      :items="curvePools"
      :sort-desc="[true]"
      height="100%"
      :items-per-page="100"
      class="elevation-0"
    >
      <template #[`item.pool`]="{ item }">
        <div class="my-1">
          <v-row no-gutters align="center">
            <v-col cols="4">
              <v-avatar v-for="(coin, i) in item.coins" :key="i" size="24" class="mr-2">
                <img :alt="`${item.coingeckoInfo.symbol} logo`" :src="coin.image" @error="setAltImg" />
              </v-avatar>
            </v-col>
            <v-col>
              <v-row no-gutters>
                <v-col>
                  <span class="text-capitalize font-weight-bold pink--text">{{ item.name.toUpperCase() }}</span>
                  <v-chip v-if="item.assetType.length > 0" x-small label class="text-caption transparent">
                    {{ item.assetType }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <span v-for="(coin, i) in item.coins" :key="i" :class="[ui[theme].innerCardLighten, 'text-caption']">
                    {{ coin.symbol }} <span v-if="i < item.coins.length - 1" class="mx-1"> |</span>
                  </span>

                  <v-tooltip right color="black">
                    <template #activator="{ on, attrs }">
                      <v-btn icon color="grey" x-small v-bind="attrs" v-on="on">
                        <v-icon size="14">mdi-information-outline</v-icon>
                      </v-btn>
                    </template>

                    <v-simple-table dense>
                      <template #default>
                        <thead>
                          <tr>
                            <th>Symbol</th>
                            <th>Token Balances</th>
                            <th>USD Price</th>
                            <th>USD Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(coin, i) in item.coins" :key="i">
                            <td>{{ coin.symbol }}</td>
                            <td>{{ valueFormatter(coin.tokenBalance) }}</td>
                            <td>{{ valueFormatter(coin.usdPrice, 3, 3) }}</td>
                            <td>${{ valueFormatter(coin.liquidity, 4, 4) }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                    <v-divider />
                    <div class="my-2 ml-4">
                      <span class="font-weight-bold">Total Balance: {{ valueFormatter(item.totalTokenBalance) }}</span>
                    </div>
                    <div class="ml-4">
                      <span class="font-weight-bold">Liquidity: ${{ valueFormatter(item.totalLiquidity) }}</span>
                    </div>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </template>

      <template #[`item.lpBalance`]="{ item }">
        <span v-if="item.lpBalance > 0">
          {{ item.lpBalance.toFixed(2) }}
          <small>{{ item.lpTokenInfo.symbol }}</small>
        </span>
        <span v-else>0</span>
      </template>

      <template #[`item.baseAPY`]="{ item }">
        <span :class="ui[theme].innerCardLighten">{{ item.baseAPY.toFixed(2) }} % </span>
      </template>

      <template #[`item.rewards`]="{ item }">
        <div :class="ui[theme].innerCardLighten">
          <span>{{ item.rewards.rewardPtc.toFixed(2) }} % </span>
          <span class="mx-1"> - </span>
          <span>{{ item.rewards.maxRewardPtc.toFixed(2) }} % </span>
        </div>
      </template>

      <template #[`item.liquidityUsd`]="{ item }">
        <span :class="ui[theme].innerCardLighten">${{ valueFormatter(item.totalLiquidity / 10 ** 6) }} M</span>
      </template>

      <template #[`item.dailyVolume`]="{ item }">
        <div>
          <span>${{ valueFormatter(item.totalDailyVolume / 10 ** 6) }} M</span>
        </div>
      </template>

      <template #[`item.totalBalance`]="{ item }">
        <div :class="ui[theme].innerCardLighten">
          <span>{{ valueFormatter(item.totalTokenBalance / 10 ** 6) }} M</span>
        </div>
      </template>

      <template #[`item.action`]="{ item }">
        <v-btn
          v-for="action in curveActions"
          :key="action.value"
          text
          outlined
          color="pink"
          class="pa-1 ma-1"
          height="26"
          @click="invest(item.ID, action.value)"
        >
          <span class="text-caption">{{ action.text }}</span>
        </v-btn>
      </template>

      <template #[`item.link`]="{ item }">
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="copyAddressToClipboard(item.id)"
            >
              <v-icon size="18">mdi-content-copy</v-icon>
            </v-btn>
          </template>
          Copy Pool Address
        </v-tooltip>
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              v-bind="attrs"
              x-small
              class="mb-1 ml-1"
              icon
              v-on="on"
              @click="navigateToExplorer(item.addresses.swap)"
            >
              <v-icon size="18">mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          Open Pool in Etherscan
        </v-tooltip>
      </template>
    </v-data-table>
    <curve-pool-actions ref="poolAction" @transaction-result="_calculateLPBalance" />
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { CurvePools } from '~/models/pool'
import CurvePoolActions from '~/components/pools/curve-pool-actions.vue'

@Component({
  name: 'CurvePool',
  components: { CurvePoolActions },
  computed: {
    ...mapState({
      currentChain: (state: any) => state.configs.currentChain,
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class CurvePool extends mixins(CurvePools) {}
</script>

<style scoped></style>

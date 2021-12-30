<template>
  <v-card tile outlined height="100%">
    <v-skeleton-loader v-if="isPoolsLoading" type="table-heading,table-tbody,table-tbody" />
    <v-data-table
      v-if="!isPoolsLoading && curvePools"
      id="curve-pools-grid"
      :headers="cols"
      :items="curvePools"
      :sort-desc="[true]"
      height="100%"
      :items-per-page="10"
      class="elevation-0"
    >
      <template #[`item.pool`]="{ item }">
        <div class="my-1">
          <v-row no-gutters align="center">
            <v-col cols="4">
              <v-avatar v-for="(coin, i) in item.coins" :key="i" size="24" class="mr-2">
                <img
                  :alt="`${item.symbol} logo`"
                  :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${coin.token.symbol.toLowerCase()}.png`"
                  @error="setAltImg"
                />
              </v-avatar>
            </v-col>
            <v-col>
              <v-row no-gutters>
                <v-col>
                  <span class="text-capitalize font-weight-bold pink--text">{{ item.name.toUpperCase() }}</span>
                  <v-chip v-if="item.assetType.length > 0" x-small label class="text-caption ml-1" color="transparent">
                    {{ item.assetType }}
                  </v-chip>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col>
                  <span v-for="(coin, i) in item.coins" :key="i" :class="[ui[theme].innerCardLighten, 'text-caption']">
                    {{ coin.token.symbol }} <span v-if="i < item.coins.length - 1" class="mx-1"> |</span>
                  </span>

                  <v-tooltip bottom>
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
                            <td>{{ coin.token.symbol }}</td>
                            <td>{{ valueFormatter(coin.balance) }}</td>
                            <td>{{ valueFormatter(coin.token.usdPrice, 3, 3) }}</td>
                            <td>${{ valueFormatter(coin.balanceUSD, 4, 4) }}</td>
                            <td>{{ valueFormatter((coin.balanceUSD / item.liquidityUsd) * 100, 4, 4) }} %</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>

                    <div class="mt-2 ml-4">
                      <span class="font-weight-bold">Total Balance: {{ valueFormatter(item.totalBalance) }}</span>
                    </div>
                    <div class="ml-4">
                      <span class="font-weight-bold">Liquidity: ${{ valueFormatter(item.liquidityUsd) }}</span>
                    </div>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
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
        <span :class="ui[theme].innerCardLighten">${{ valueFormatter(item.liquidityUsd / 10 ** 6) }} M</span>
      </template>

      <template #[`item.dailyVolume`]="{ item }">
        <div>
          <span>${{ valueFormatter(item.dailyVolume / 10 ** 6) }} M</span>
        </div>
      </template>

      <template #[`item.totalBalance`]="{ item }">
        <div :class="ui[theme].innerCardLighten">
          <span>{{ valueFormatter(item.totalBalance / 10 ** 6) }} M</span>
        </div>
      </template>

      <template #[`item.fee`]="{ item }">
        <v-row align="center">
          <v-col>
            <span> {{ (parseFloat(item.fee) * 100).toFixed(2) }}% </span>

            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn icon color="grey" v-bind="attrs" x-small class="mb-1 ml-1" v-on="on">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>

              <div class="mt-2 ml-4">
                <span class="font-weight-bold">
                  Admin Fee: {{ (parseFloat(item.adminFee) * 100).toFixed(2) }}% of
                  {{ (parseFloat(item.fee) * 100).toFixed(2) }}%
                </span>
              </div>
            </v-tooltip>
          </v-col>
        </v-row>
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
              @click="navigateToExplorer(item.id)"
            >
              <v-icon size="18">mdi-open-in-new</v-icon>
            </v-btn>
          </template>
          Open Pool in Etherscan
        </v-tooltip>
      </template>

      <template #[`item.action`]="{ item }">
        <v-btn tile depressed small @click="invest(item.id)">Invest</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { CurvePools } from '~/models/pool'

@Component({
  name: 'CurvePool',
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

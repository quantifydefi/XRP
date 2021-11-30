<template>
  <div>
    <!--    <v-btn @click="check">Check</v-btn>-->
    <client-only>
      <v-row class="px-2 mt-1 mb-3">
        <v-col cols="4" class="pb-0">
          <v-row align="center">
            <v-menu
              v-if="mainNetChains"
              :close-on-content-click="false"
              :nudge-width="500"
              :nudge-left="0"
              offset-y
              max-width="280"
            >
              <template #activator="{ on, attrs }">
                <div class="d-flex">
                  <v-btn
                    width="200"
                    tile
                    class="text-capitalize text-subtitle-2"
                    depressed
                    color="transparent"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span class="primary--text mx-1 pr-2">
                      MainNet Networks
                    </span>
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </div>
              </template>

              <v-card outlined tile width="350">
                <v-list dense>
                  <v-list-item-group
                    v-model="configs.selectedMainNets"
                    active-class="pink--text"
                    multiple
                  >
                    <template v-for="item in mainNetChains">
                      <v-list-item :key="item.chainId" :value="item.chainId">
                        <template #default="{ active }">
                          <v-list-item-avatar size="24">
                            <v-img :src="item.logoUrl"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-title
                            v-text="item.label"
                          ></v-list-item-title>

                          <v-list-item-action>
                            <v-icon v-if="!active" color="grey lighten-1">
                              mdi-star-outline
                            </v-icon>
                            <v-icon v-else color="yellow darken-3">
                              mdi-star
                            </v-icon>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
                <!--              <v-row no-gutters>
                <v-col>
                  <v-list dense>
                    <v-subheader>MAIN NET</v-subheader>
                    <v-list-item-group
                      v-model="conf.selectedChainId"
                      color="primary"
                    >
                      <v-list-item
                        v-for="item in mainNetChains"
                        :key="item.chainId"
                        :value="item.chainId"
                      >
                        <v-list-item-avatar size="24">
                          <v-img :src="item.logoUrl"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.label"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
                <v-col>
                  <v-list dense>
                    <v-subheader>TEST NET</v-subheader>
                    <v-list-item-group
                      v-model="conf.selectedChainId"
                      color="primary"
                    >
                      <v-list-item
                        v-for="item in testNetChains"
                        :key="item.chainId"
                        :value="item.chainId"
                      >
                        <v-list-item-avatar size="24">
                          <v-img s :src="item.logoUrl"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title
                            v-text="item.label"
                          ></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-col>
              </v-row>-->
              </v-card>
            </v-menu>

            <v-menu
              v-if="mainNetChains"
              :close-on-content-click="false"
              :nudge-width="500"
              :nudge-left="0"
              nudge-bottom="5"
              offset-y
              max-width="280"
            >
              <template #activator="{ on, attrs }">
                <div class="d-flex">
                  <v-btn
                    width="200"
                    tile
                    class="text-capitalize text-subtitle-2"
                    depressed
                    color="transparent"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span class="primary--text mx-1 pr-2">
                      Test Net Networks
                    </span>
                    <v-icon right>mdi-chevron-down</v-icon>
                  </v-btn>
                </div>
              </template>

              <v-card outlined tile width="350">
                <v-list dense>
                  <v-list-item-group
                    v-model="configs.selectedMainNets"
                    active-class="pink--text"
                    multiple
                  >
                    <template v-for="item in testNetChains">
                      <v-list-item :key="item.chainId" :value="item.chainId">
                        <template #default="{ active }">
                          <v-list-item-avatar size="24">
                            <v-img :src="item.logoUrl"></v-img>
                          </v-list-item-avatar>

                          <v-list-item-title
                            v-text="item.label"
                          ></v-list-item-title>

                          <v-list-item-action>
                            <v-icon v-if="!active" color="grey lighten-1">
                              mdi-star-outline
                            </v-icon>
                            <v-icon v-else color="yellow darken-3">
                              mdi-star
                            </v-icon>
                          </v-list-item-action>
                        </template>
                      </v-list-item>
                    </template>
                  </v-list-item-group>
                </v-list>
              </v-card>
            </v-menu>
          </v-row>
        </v-col>
        <v-spacer />
        <v-col class="pb-0">
          <v-row class="d-flex justify-end">
            <v-menu
              :close-on-content-click="false"
              :nudge-width="200"
              :nudge-right="-200"
              :nudge-bottom="5"
              offset-y
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  width="140"
                  tile
                  v-bind="attrs"
                  class="text-capitalize text-subtitle-2"
                  depressed
                  color="transparent"
                  v-on="on"
                >
                  <span class="primary--text mx-1 pr-2"> Grid Height </span>
                  <v-icon right>mdi-chevron-down</v-icon>
                </v-btn>
              </template>

              <v-card tile outlined height="60">
                <v-card-text>
                  <v-slider
                    v-model="configs.gridHeight"
                    :min="400"
                    :max="1000"
                  />
                </v-card-text>
              </v-card>
            </v-menu>
            <v-btn-toggle
              v-model="configs.numberOfRows"
              mandatory
              background-color="transparent"
            >
              <v-btn
                v-for="(item, index) in configs.numOfRowsOptions"
                :key="index"
                tile
                outlined
                class="ml-1"
                color="primary"
                :value="item.col"
                :height="36"
              >
                <v-icon size="20">{{ item.icon }}</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-row>
        </v-col>
      </v-row>
    </client-only>
    <v-row>
      <v-col
        v-for="item in balances"
        :key="item.chainId"
        :cols="configs.numberOfRows"
      >
        <balances-grid
          :balance="item"
          :cols="configs.cols"
          :grid-height="configs.gridHeight"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { BalancesPortfolio, PortfolioBalance } from '~/models/portfolio'
import BalancesGrid from '~/components/portfolio/grids/BalancesGrid.vue'
import { Helper } from '~/models/helper'
@Component({
  name: 'Balances',
  components: { BalancesGrid },
})
export default class Balances extends mixins(BalancesPortfolio) {
  @Watch('balances')
  async onBalanceChange(newVal: PortfolioBalance[]) {
    const totalBalance = newVal.reduce(
      (n, { chainTotalBalance }) => n + chainTotalBalance,
      0
    )
    await this.$store.dispatch(
      'wallet/totalBalance',
      Helper.priceFormatter(totalBalance)
    )
  }
}
</script>

<style>
.v-list-item__action {
  align-self: center;
  margin: 0 0;
}
</style>

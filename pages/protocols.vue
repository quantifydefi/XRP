<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col cols="8" class="my-0 py-0">
        <v-chip-group v-model="currentProtocolId" mandatory active-class="primary--text">
          <v-chip v-for="protocol in protocols" :key="protocol.id" :value="protocol.id" outlined label>
            <v-avatar left>
              <v-img
                :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${protocol.symbol.toLowerCase()}.png`"
              />
            </v-avatar>
            {{ protocol.name }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
    <v-divider class="mb-4 mt-2" />

    <v-row v-if="protocol" no-gutters justify="center">
      <v-col cols="10">
        <v-row>
          <!--          1st Column General Details-->
          <v-col>
            <v-card tile outlined elevation="0" class="pa-4" height="100%">
              <v-row no-gutters align="center">
                <v-col cols="4" sm="2" md="1">
                  <v-avatar size="30px">
                    <v-img
                      alt="Avatar"
                      :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${protocol.symbol.toLowerCase()}.png`"
                    />
                  </v-avatar>
                </v-col>
                <v-col>
                  <h2 class="text-h4 font-weight-medium ml-3">
                    {{ protocol.name }}
                    <span>
                      <v-btn text small color="pink" tile>
                        <span class="text-h6 font-weight-medium">{{ protocol.symbol }}</span>
                      </v-btn>
                    </span>
                  </h2>
                </v-col>
              </v-row>

              <v-row no-gutters class="mb-2">
                <v-col cols="12" class="mt-2">
                  <v-chip label small v-text="`Protocol`" />
                  <v-chip label small v-text="new Date(protocol.updatedAt * 1000).toLocaleTimeString()" />
                </v-col>
              </v-row>

              <v-row v-for="(bal, key) in protocol.usdTvl" :key="bal" justify="center" no-gutters align="center">
                <v-col cols="6">
                  <span :class="[ui[theme].innerCardLighten, 'text-subtitle-1', 'text-capitalize']">
                    {{ key.replace('-', ' ') }}
                  </span>
                </v-col>
                <v-col class="text-right">{{ balanceFormatter(bal / Math.pow(10, 6)) }}</v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col lg="8" md="12">
            <v-card tile outlined elevation="0" class="pa-4" height="100%">
              <v-row>
                <v-col>
                  <v-row no-gutters>
                    <v-col><p class="font-weight-medium ml-1">Description:</p></v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <p class="font-weight-medium ml-1 grey--text text--lighten-1">{{ protocol.description }}</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3" class="text-right">
                  <v-btn
                    width="20"
                    height="20"
                    class="mx-1 pa-0"
                    color="primary"
                    icon
                    target="_blank"
                    :href="`https://twitter.com/${protocol.twitter}`"
                  >
                    <v-icon size="20">mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn width="20" height="20" class="pa-0" color="primary" icon target="_blank" :href="protocol.url">
                    <v-icon size="20">mdi-web</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="protocol" justify="center" class="mt-6">
      <v-col cols="10">
        <v-row>
          <v-col class="py-0 my-0 text-right">
            <v-btn-toggle v-model="config.currentSelection" mandatory>
              <v-btn
                v-for="item in config.tokenOrPoolOptions"
                :key="item.value"
                :value="item.value"
                small
                tile
                outlined
                color="primary"
                width="140"
              >
                {{ item.text }}
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>

        <v-row v-if="config.currentSelection === 'token'" justify="center">
          <v-col
            v-for="(tokens, key) in protocol.balance"
            :key="key"
            :lg="Object.keys(protocol.balance).length > 1 ? '6' : '12'"
            cols="12"
          >
            <v-card tile outlined height="100%">
              <v-card-title class="pa-0 ma-0">
                <v-col class="d-flex">
                  <v-avatar size="24px">
                    <v-img
                      v-if="balanceType.hasOwnProperty(key)"
                      :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${balanceType[key].logo}.png`"
                      :lazy-src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${balanceType[key].logo}.png`"
                      alt=""
                    ></v-img>
                  </v-avatar>
                  <h1 class="text-subtitle-1 pl-3 text-truncate text-capitalize">
                    {{ key.replace('-', ' ') }}
                    <!--                {{ balance.chainInfo(chains).label }}-->
                  </h1>
                </v-col>

                <v-col cols="4" class="text-right">
                  <h4 class="text-subtitle-1 text-truncate pink--text font-weight-medium">
                    {{ balanceFormatter(protocol.usdTvl[key] / Math.pow(10, 6)) }}
                    <!--                {{ priceFormatter(balance.chainTotalBalance) }}-->
                  </h4>
                </v-col>
              </v-card-title>
              <v-divider />
              <!--          <h6 class="text-h6 text-capitalize">{{ key.replace('-', ' ') }}</h6>-->
              <v-data-table
                v-if="tokens"
                id="balances-grid"
                :headers="config.tokenListCols"
                :items="tokens"
                :sort-desc="[true]"
                :items-per-page="10"
                class="elevation-0"
                :mobile-breakpoint="0"
                :hide-default-footer="tokens.length < 10"
              >
                <template #[`item.name`]="{ item }">
                  <div class="text-no-wrap overflow-x-hidden">
                    <v-avatar size="18" class="mr-2">
                      <img
                        :alt="`${item.symbol} logo`"
                        :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.symbol}.png`"
                        @error="setAltImg"
                      />
                    </v-avatar>
                    {{ item.name }}
                  </div>
                </template>

                <template #[`item.symbol`]="{ item }">
                  <span :class="[ui[theme].innerCardLighten]">{{ item.symbol.toUpperCase() }} </span>
                </template>

                <template #[`item.tokenBalance`]="{ item }">
                  <span :class="[ui[theme].innerCardLighten]"
                    >{{ balanceFormatter(item.tokenBalance / Math.pow(10, 6)) }}
                  </span>
                </template>
                <template #[`item.usdBalance`]="{ item }">
                  <span :class="[ui[theme].innerCardLighten]">{{
                    balanceFormatter(item.usdBalance / Math.pow(10, 6))
                  }}</span>
                </template>

                <template #[`item.action`]="{ item }">
                  <v-btn
                    width="20"
                    height="20"
                    class="mx-2 pa-0"
                    color="primary"
                    icon
                    @click="copyAddressToClipboard(item.address)"
                  >
                    <v-icon size="16">mdi-content-copy</v-icon>
                  </v-btn>
                </template>

                <template #[`item.link`]="{ item }">
                  <v-btn
                    width="20"
                    height="20"
                    class="mx-2 pa-0"
                    color="primary"
                    icon
                    @click="navigateToExplorer(key, item.address)"
                  >
                    <v-icon size="16">mdi-open-in-new</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="config.currentSelection === 'pool'" justify="center">
          <v-col cols="12">
            <curve-pools v-if="currentProtocolId === '3'" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { Protocols } from '~/models/protocols'
import BalancesGrid from '~/components/portfolio/grids/BalancesGrid.vue'
import { Helper } from '~/models/helper'
import CurvePools from '~/components/pools/curve.vue'

@Component({
  name: 'Protocol',
  components: { CurvePools, BalancesGrid },
  computed: {
    ...mapState({
      currentChain: (state: any) => state.configs.currentChain,
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Protocol extends mixins(Protocols) {
  setAltImg(event: any) {
    return Helper.setAltImg(event)
  }

  balanceFormatter(value: number): string {
    return (
      new Intl.NumberFormat('en', {
        maximumSignificantDigits: 6,
        minimumSignificantDigits: 6,
      }).format(value) + ' M'
    )
  }
}
</script>

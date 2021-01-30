<template>
  <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="2">
    <v-tabs
      color="primary"
      grow
      :background-color="theme === 'dark' ? 'transparent' : ''"
    >
      <v-tab style="min-width: 60px; padding: 0 5px" @click="changeTab('pool')"
        >Pair</v-tab
      >
      <v-tab
        style="min-width: 60px; padding: 0 5px"
        @click="changeTab('token0')"
        >{{ tokenData.token0_symbol }}

        <v-tooltip v-if="isToken0Quote" top color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-icon left v-bind="attrs" class="ml-1" size="22" v-on="on">
              mdi-cash-usd-outline
            </v-icon>
          </template>
          <span>Quote Asset</span>
        </v-tooltip>
      </v-tab>
      <v-tab
        style="min-width: 60px; padding: 0 5px"
        @click="changeTab('token1')"
        >{{ tokenData.token1_symbol }}

        <v-tooltip v-if="isToken1Quote" top color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-icon left v-bind="attrs" class="ml-1" size="22" v-on="on">
              mdi-cash-usd-outline
            </v-icon>
          </template>
          <span>Quote Asset</span>
        </v-tooltip>
      </v-tab>
    </v-tabs>

    <div v-if="tab === 'pool'">
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>
            Liquidity {{ tokenData.token0_symbol }}-{{
              tokenData.token1_symbol
            }}
          </div>
          <p class="display-1 text--primary mb-0">
            ${{ tokenData.reserve_eth.toFixed(2) }}m
          </p>
        </v-card-text>
      </v-card>
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>All time Volume in USD</div>
          <p class="display-1 text--primary mb-0">
            ${{ tokenData.volumeUsdFormatted }}m
          </p>
        </v-card-text>
      </v-card>
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Transaction Count</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.tx_count }}
          </p>
        </v-card-text>
      </v-card>
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Liquidity Provider Count</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.liquidity_provider_count }}
          </p>
        </v-card-text>
      </v-card>
      <v-card
        class="mb-2"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Created At</div>
          <p class="text-subtitle-1 text--primary mb-0">
            {{ tokenData.date }}
          </p>
        </v-card-text>
      </v-card>
    </div>

    <div v-if="tab === 'token0'">
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Name</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token0_name }}
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Price ETH</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token0_price.toFixed(4) }}
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Price USD</div>
          <p class="display-1 text--primary mb-0">
            $
            {{ (tokenData.token0_price * tokenData.eth_price_usd).toFixed(2) }}

            <span class="text-subtitle-1"
              >${{ tokenData.eth_price_usd.toFixed(2) }}/ETH</span
            >
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Ptc Change 1H</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token0_percent_change_1h }}%
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Ptc Change 24H</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token0_percent_change_24h }}%
          </p>
        </v-card-text>
      </v-card>
    </div>
    <div v-if="tab === 'token1'">
      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Name</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token1_name }}
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Price ETH</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token1_price.toFixed(4) }}
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Token Price USD</div>
          <p class="display-1 text--primary mb-0">
            $
            {{ (tokenData.token1_price * tokenData.eth_price_usd).toFixed(2) }}
            <span class="text-subtitle-1"
              >${{ tokenData.eth_price_usd.toFixed(2) }}/ETH</span
            >
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Ptc Change 1H</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token1_percent_change_1h }}%
          </p>
        </v-card-text>
      </v-card>

      <v-card
        class="mb-6"
        tile
        outlined
        :color="theme === 'dark' ? 'transparent' : ''"
        :style="theme === 'dark' ? 'border: 1px solid #424242 !important' : ''"
      >
        <v-card-text>
          <div>Ptc Change 24H</div>
          <p class="display-1 text--primary mb-0">
            {{ tokenData.token1_percent_change_24h }}%
          </p>
        </v-card-text>
      </v-card>
    </div>
  </v-col>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Token } from '~/models/token'

@Component({
  name: 'LeftBar',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class LeftBar extends Vue {
  @Prop({ default: () => ({}) }) tokenData!: Token
  tab: string = 'pool'

  get isToken0Quote() {
    return Token.isQuoteToken(this.tokenData.token0_symbol, this.tokenData)
  }

  get isToken1Quote() {
    return Token.isQuoteToken(this.tokenData.token1_symbol, this.tokenData)
  }

  changeTab(tab: string) {
    this.tab = tab
  }
}
</script>

<style scoped></style>

<template>
  <v-row no-gutters justify="center">
    <v-col cols="12" class="pa-2">
      <v-row v-if="aaveAssets">
        <v-col cols="12" class="pa-1">
          <v-card outlined tile>
            <v-card-title class="subtitle-1 pa-2"
              >{{ $route.params.id == 1 ? 'Ethereum' : 'Polygon' }} Mainnet
            </v-card-title>
            <v-divider />
            <v-data-table
              id="aave-assets"
              :headers="aaveAssets.cols"
              :items="
                $route.params.id == 1
                  ? aaveAssets.ethereumAssets
                  : aaveAssets.polygonAssets
              "
              :items-per-page="20"
              :hide-default-footer="true"
              mobile-breakpoint="0"
            >
              <template #[`item.underlying.contract_ticker_symbol`]="{ item }">
                <div class="text-no-wrap">
                  <v-avatar size="32">
                    <img
                      :alt="`${item.underlying.contract_ticker_symbol} logo`"
                      :src="item.underlying.logo_url"
                      @error="aaveAssets.setAltImg"
                    />
                  </v-avatar>
                  <div class="pt-2 caption">
                    {{ item.underlying.contract_ticker_symbol }}
                  </div>
                </div>
              </template>

              <template #[`item.atoken.logo_url`]="{ item }">
                <div class="text-no-wrap">
                  <v-avatar size="32">
                    <img
                      :alt="`${item.atoken.contract_ticker_symbol} logo`"
                      :src="item.atoken.logo_url"
                      @error="aaveAssets.setAltImg"
                    />
                  </v-avatar>
                  <div class="pt-2 caption">
                    {{ item.atoken.contract_ticker_symbol }}
                  </div>
                </div>
              </template>
              <template #[`item.variable_borrow_apr`]="{ item }">
                <span>
                  {{ (item.variable_borrow_apr * 100).toFixed(2) }}%
                </span>
              </template>

              <template #[`item.stable_borrow_apr`]="{ item }">
                <span> {{ (item.stable_borrow_apr * 100).toFixed(2) }}% </span>
              </template>

              <template #[`item.supply_apy`]="{ item }">
                <span> {{ (item.supply_apy * 100).toFixed(2) }}% </span>
              </template>
            </v-data-table>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { AaveAssets } from '~/models/aave'

@Component({
  name: 'AaveAssetsList',
  computed: {
    ...mapState({
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class Aave extends Vue {
  address!: string
  aaveAssets: AaveAssets | null = null

  async mounted() {
    if (this.$route.params.id === '1' || this.$route.params.id === '137') {
      this.aaveAssets = new AaveAssets(this.$store, this.address)

      await this.aaveAssets.getData()
    } else {
      await this.$router.push('/app')
    }
  }
}
</script>

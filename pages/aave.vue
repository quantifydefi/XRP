<template>
  <v-row no-gutters justify="center">
    <v-col cols="12">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="text-h4">Aave Assets</h1>
        </v-col>
      </v-row>
      <v-row class="pb-5">
        <v-col v-if="aaveAssets" cols="12" class="py-0 align-center">
          <v-card outlined tile>
            <v-data-table
              id="aave-assets"
              :headers="aaveAssets.cols"
              :items="aaveAssets.data"
              :items-per-page="20"
              :hide-default-footer="true"
              mobile-breakpoint="0"
            >
              <template #[`item.underlying.logo_url`]="{ item }">
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
                <span> {{ item.variable_borrow_apr.toFixed(2) }}% </span>
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
import { AaveAssets } from '~/models/aave'

@Component({ name: 'Aave' })
export default class Aave extends Vue {
  aaveAssets: AaveAssets | null = null

  async mounted() {
    this.aaveAssets = new AaveAssets(this.$store)

    await this.aaveAssets.getData()
  }
}
</script>

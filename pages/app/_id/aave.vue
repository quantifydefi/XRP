<template>
  <v-row no-gutters>
    <top-bar title="AAVE"></top-bar>
    <v-col class="pa-2" cols="12">
      <v-row>
        <v-col cols="12" class="pa-1">
          <v-btn-toggle
            v-model="toggleAssets"
            mandatory
            dense
            color="primary"
            tile
          >
            <v-btn width="100" small outlined> assets </v-btn>

            <v-btn width="100" small outlined> balances </v-btn>
          </v-btn-toggle>
        </v-col>

        <v-col v-if="toggleAssets === 0" cols="12" class="pa-1 mt-1">
          <aave-assets-list></aave-assets-list>
        </v-col>

        <v-col v-else class="pa-1">
          <aave-balances></aave-balances>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TopBar from '~/components/app/TopBar.vue'
import AaveBalances from '~/components/app/aave/AaveBalances.vue'
import AaveAssetsList from '~/components/app/aave/AaveAssetsList.vue'

@Component({
  name: 'Aave',
  components: { TopBar, AaveAssetsList, AaveBalances },
  layout: 'app',
})
export default class Aave extends Vue {
  toggleAssets = 0
}
</script>

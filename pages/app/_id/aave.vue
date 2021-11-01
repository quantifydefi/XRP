<template>
  <v-row no-gutters>
    <v-col class="pa-2" cols="12">
      <v-row>
        <v-col cols="12" class="pa-1">
          <v-btn-toggle
            v-model="toggleAssets"
            mandatory
            dense
            color="primary"
            :style="{
              backgroundColor: $vuetify.theme.themes[theme].background,
            }"
          >
            <v-btn width="100" color="primary" outlined small>Market</v-btn>

            <v-btn width="100" color="primary" outlined small>Balance</v-btn>
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
import { mapState } from 'vuex'
import AaveBalances from '~/components/app/aave/AaveBalances.vue'
import AaveAssetsList from '~/components/app/aave/AaveAssetsList.vue'

@Component({
  name: 'Aave',
  components: { AaveAssetsList, AaveBalances },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Aave extends Vue {
  toggleAssets = 0
}
</script>

<template>
  <v-row no-gutters>
    <v-overlay
      absolute
      :value="showOverlay"
      :opacity="1"
      :color="$vuetify.theme.themes[theme].overlay"
    >
      <img :src="'/img/logo/logo.svg'" height="100" width="100" alt="logo" />
      <v-progress-linear
        color="primary"
        indeterminate
        rounded
        height="6"
      ></v-progress-linear>
    </v-overlay>

    <v-col v-if="!showOverlay" class="pa-2" cols="12">
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
  showOverlay = true
  toggleAssets = 1

  mounted() {
    setTimeout(() => {
      this.showOverlay = false
    }, 1500)
  }
}
</script>

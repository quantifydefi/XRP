<template>
  <v-row no-gutters justify="center">
    <v-overlay
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

    <v-col v-if="!showOverlay && gridData.data" cols="12">
      <v-row no-gutters>
        <v-col cols="12">
          <h1 class="text-h4">Terminal</h1>
        </v-col>

        <v-row class="pt-3 px-1">
          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Top 20 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(0, 20)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 21-40 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(20, 40)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 41-60 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(40, 60)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 61-80 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(60, 80)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 81-100 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(80, 100)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 101-120 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(100, 120)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 121-140 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(120, 140)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>

          <v-col cols="12" lg="3" sm="6" class="pa-1">
            <v-card outlined height="535" tile>
              <grid-header title="Rank 141-160 Coins"></grid-header>
              <v-divider />
              <base-grid
                :row-data="gridData.data.slice(140, 160)"
                :column-defs="gridData.cols"
              ></base-grid>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import GridHeader from '~/components/terminal/GridHeader.vue'
import { TerminalGrid } from '~/models/terminal'
import { UiState } from '~/store/ui'

@Component({
  name: 'Terminal',
  components: {
    GridHeader,
    BaseGrid: () => import('~/components/terminal/BaseGrid.vue'),
  },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Terminal extends Vue {
  showOverlay = true
  gridData: TerminalGrid | null = null
  theme!: UiState

  mounted() {
    this.gridData = new TerminalGrid(this.$store)
    this.gridData.getData()

    setTimeout(() => {
      this.showOverlay = false
    }, 1500)
  }
}
</script>

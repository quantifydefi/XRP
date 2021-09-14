<template>
  <v-row no-gutters justify="center">
    <v-col cols="12">
      <v-row no-gutters class="">
        <v-col cols="12">
          <h1 class="text-h4">Terminal</h1>
        </v-col>

        <v-row v-if="showSkeleton" class="pt-3" data-nosnippet>
          <v-col v-for="i in 8" :key="i" cols="12" lg="3" sm="6" class="pa-1">
            <v-card tile outlined>
              <v-skeleton-loader
                type="table-heading, table-tbody, table-tbody"
                height="540"
                tile
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>

        <client-only>
          <v-row v-if="!showSkeleton && gridData.data" class="pt-3">
            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="540" tile>
                <grid-header title="Top 20 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(0, 20)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="540" tile>
                <grid-header title="Rank 21-40 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(20, 40)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card v-if="gridData.data" outlined height="540" tile>
                <grid-header title="Rank 41-60 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(40, 60)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card v-if="gridData.data" outlined height="540" tile>
                <grid-header title="Rank 61-80 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(60, 80)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="540" tile>
                <grid-header title="Rank 81-100 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(80, 100)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="540" tile>
                <grid-header title="Rank 101-120 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(100, 120)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="540" tile>
                <grid-header title="Rank 121-140 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(120, 140)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>

            <v-col cols="12" lg="3" sm="6" class="pa-1">
              <v-card outlined height="536" tile>
                <grid-header title="Rank 141-160 Coins"></grid-header>
                <v-divider />
                <base-grid
                  :row-data="gridData.data.slice(140, 160)"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                  row-id="pool_id"
                ></base-grid>
              </v-card>
            </v-col>
          </v-row>
        </client-only>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import GridHeader from '~/components/terminal/GridHeader.vue'
import { TerminalGrid } from '~/models/terminal'

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
  showSkeleton = true
  gridData: TerminalGrid | null = null

  @Watch('theme')
  onThemeChange() {
    this.gridData?.updateTheme()
  }

  mounted() {
    this.gridData = new TerminalGrid(this.$store, this.$root)
    this.gridData.getData()

    setTimeout(() => {
      this.showSkeleton = false
    }, 2000)
  }
}
</script>

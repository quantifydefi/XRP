<template>
  <v-row no-gutters justify="center">
    <v-col cols="12">
      <v-row no-gutters class="">
        <v-col cols="12">
          <h1 class="text-h4">Terminal</h1>
        </v-col>

        <v-row v-if="showSkeleton" class="px-1 pt-3">
          <v-col v-for="i in 8" :key="i" cols="12" lg="3" sm="6" class="pa-1">
            <v-card tile outlined>
              <v-skeleton-loader
                type="table-heading, table-tbody, table-tbody"
                height="536"
                tile
              ></v-skeleton-loader>
            </v-card>
          </v-col>
        </v-row>

        <v-row v-if="!showSkeleton" class="px-1 pt-3">
          <v-col v-for="i in 8" :key="i" cols="12" lg="3" sm="6" class="pa-1">
            <v-card v-if="gridData" outlined height="540" tile>
              <grid-header
                info-tooltip="I'm a tooltip"
                title="Top 20 Coins"
              ></grid-header>
              <client-only>
                <base-terminal-grid
                  :row-data="gridData.data"
                  :column-defs="gridData.cols"
                  :height="540 - 38"
                ></base-terminal-grid>
              </client-only>
            </v-card>
          </v-col>
        </v-row>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import GridHeader from '~/components/terminal/GridHeader.vue'
import { TerminalGrid } from '~/models/terminal'
import BaseTerminalGrid from '~/components/terminal/BaseTerminalGrid.vue'

@Component({
  name: 'Terminal',
  components: {
    GridHeader,
    BaseTerminalGrid,
  },
})
export default class Terminal extends Vue {
  showSkeleton = true

  gridData: TerminalGrid | null = null

  mounted() {
    this.gridData = new TerminalGrid(this.$store, this.$root)
    this.gridData.getData()

    setTimeout(() => {
      this.showSkeleton = false
    }, 2000)
  }
}
</script>

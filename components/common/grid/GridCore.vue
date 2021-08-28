<template>
  <client-only>
    <ag-grid-vue
      :id="gridId"
      v-resize="setGridWidth"
      :grid-options="gridOptions"
      :column-defs="gridOptions.columnDefs"
      :row-data="rowData"
      :pagination="pagination"
      :pagination-page-size="paginationPageSize"
      :dom-layout="domLayout"
      :style="{ width: '100%', height: height }"
      :header-height="headerHeight"
      :row-height="rowHeight"
      :suppress-cell-selection="true"
      :class="theme === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine'"
      auto-height="true"
      row-selection="single"
      :animate-rows="animateRows"
      filter="true"
      resizable="true"
      enable-cell-change-flash="true"
      row-buffer="0"
      @gridReady="onGridReady"
      @gridSizeChanged="onGridSizeChanged"
    ></ag-grid-vue>
  </client-only>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { AgGridVue } from 'ag-grid-vue'
import { mapState } from 'vuex'
import {
  ColumnApi,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ColDef,
} from 'ag-grid-community'

@Component({
  name: 'GridCore',
  components: { AgGridVue },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class CoreGrid extends Vue {
  @Prop({ default: [] }) columnDefs!: Array<Record<string, any>>
  @Prop({ default: [] }) rowData!: Array<Record<string, any>>
  @Prop({ default: true }) pagination!: boolean
  @Prop({ default: 'grid' }) gridId!: string
  @Prop({ default: 'token0_symbol' }) readonly rowId!: string
  @Prop({ default: false }) readonly animateRows!: boolean
  @Prop({ default: 20 }) paginationPageSize!: number
  @Prop({ default: 60 }) headerHeight!: number
  @Prop({ default: 60 }) rowHeight!: number
  @Prop({ default: '' }) domLayout!: string // dom-layout="autoHeight"
  @Prop({ default: true }) resizeGrid!: boolean // resize grid to div width
  @Prop({ default: '100%' }) height!: string

  gridOptions!: GridOptions
  gridApi!: GridApi
  columnApi!: ColumnApi

  @Watch('theme')
  onThemeChanged() {
    this.gridApi.refreshCells({ force: true, suppressFlash: true })
  }

  @Watch('columnDefs')
  onColumnDefsChange(value: ColDef[]) {
    this.gridOptions.api?.setColumnDefs([])
    this.gridOptions.api?.setColumnDefs(value)
    this.$nextTick(() => {
      this.setGridWidth()
    })
  }

  created() {
    this.gridOptions = {}
    this.gridOptions.columnDefs = this.columnDefs
    this.gridOptions.getRowNodeId = (data: any) => {
      return data[this.rowId]
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api
    this.columnApi = params.columnApi
    if (this.$vuetify.breakpoint.mdAndUp) {
      this.setGridWidth()
    }
    this.$emit('grid-ready')
  }

  onGridSizeChanged(params: any): void {
    const gridHtml: HTMLElement | null = document.getElementById(this.gridId)
    if (this.resizeGrid) {
      if (gridHtml !== null) {
        const gridWidth: number = gridHtml.offsetWidth

        let totalColsWidth = 0
        const allColumns = params.columnApi.getAllColumns()

        for (let i = 0; i < allColumns.length; i++) {
          const column = allColumns[i]
          totalColsWidth += column.getActualWidth()
        }
        if (totalColsWidth < gridWidth) {
          params.api.sizeColumnsToFit()
        }
      }
    }
  }

  getGridOptions(): GridOptions | undefined {
    if (this.gridOptions) {
      return this.gridOptions
    }
  }

  setGridWidth(): void {
    if (this.gridOptions.api) {
      const gridHtml: HTMLElement | null = document.getElementById(this.gridId)
      if (gridHtml !== null) {
        const gridWidth: number = gridHtml.offsetWidth

        if (this.gridOptions && this.gridOptions.columnApi) {
          let totalColsWidth = 0
          const allColumns = this.gridOptions.columnApi.getAllColumns()
          if (allColumns) {
            for (let i = 0; i < allColumns.length; i++) {
              const column: any = allColumns[i]
              if (column) {
                if (column.colDef.hide === false) {
                  totalColsWidth += column?.colDef.width
                }
              }
            }
            if (gridWidth > totalColsWidth) {
              this.gridOptions.api.sizeColumnsToFit()
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
@import 'node_modules/ag-grid-community/dist/styles/ag-grid.css';
@import 'node_modules/ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
@import 'node_modules/ag-grid-community/dist/styles/ag-theme-alpine.css';
@import 'assets/grid.scss';
</style>

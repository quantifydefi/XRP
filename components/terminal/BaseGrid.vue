<template>
  <client-only>
    <grid-core
      ref="gridCoreComponent"
      :row-data="rowData"
      :column-defs="columnDefs"
      :pagination="pagination"
      :header-height="30"
      :row-height="rowHeight"
      :pagination-page-size="paginationPageSize"
      :height="height + 'px'"
      :row-id="rowId"
    />
  </client-only>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
  name: 'BaseGrid',
  components: {
    GridCore: () => import('../../components/common/grid/GridCore.vue'),
  },
})
export default class TerminalGrid extends Vue {
  @Prop({ default: '' }) readonly rowId!: string
  @Prop({ default: () => [] }) readonly rowData!: Array<Record<string, any>>
  @Prop({ default: () => [] }) readonly columnDefs!: Array<Record<string, any>>

  @Prop({ default: () => 23.4 }) readonly rowHeight!: number
  @Prop({ default: 15 }) readonly paginationPageSize!: number
  @Prop({ default: false }) readonly pagination!: number

  @Prop({ default: 502 }) readonly height!: number
}
</script>

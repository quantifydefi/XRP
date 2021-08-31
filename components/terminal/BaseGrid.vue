<template>
  <client-only>
    <grid-core
      ref="gridCoreComponent"
      :row-data="rowData"
      :column-defs="columnDefs"
      :pagination="false"
      :header-height="30"
      :row-height="23.4"
      :pagination-page-size="20"
      :height="height + 'px'"
    />
  </client-only>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import GridCore from '@/components/common/grid/GridCore.vue'

@Component({
  name: 'BaseGrid',
  components: {
    GridCore,
  },
})
export default class BaseGrid extends Vue {
  @Prop({ default: () => null }) readonly rowData!: Array<Record<string, any>>
  @Prop({ default: () => null }) readonly columnDefs!: Array<
    Record<string, any>
  >

  @Prop({ default: 503 }) readonly height!: number
}
</script>

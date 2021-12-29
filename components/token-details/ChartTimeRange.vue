<template>
  <v-btn-toggle v-model="range" class="mx-1" tile color="primary" mandatory group>
    <v-btn
      v-for="range in ranges"
      :key="range"
      small
      :value="range"
      class="mx-0"
      @click="$emit('change-range', range)"
      >{{ range }}</v-btn
    >
  </v-btn-toggle>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({ name: 'ChartTimeRange' })
export default class ChartTimeRange extends Vue {
  @Prop({ default: () => [] }) readonly ranges!: string[]
  @Prop({ default: () => '1D' }) readonly defaultTimeRange!: string
  private range = this.defaultTimeRange
}
</script>

<style scoped></style>
private text = 'center'

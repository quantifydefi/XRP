<template>
  <v-tooltip right color="black" max-width="400">
    <template #activator="{ on, attrs }">
      <v-btn icon color="grey" class="pa-0 mb-0" x-small v-bind="attrs" v-on="on">
        <v-icon :size="iconSize">{{ tooltipIcon }}</v-icon>
      </v-btn>
    </template>
    <span></span>
    <div class="pa-2">
      <p v-if="toolTipHeader" class="text-center font-weight-bold text-subtitle-1" v-text="toolTipHeader" />
      <p v-if="tooltipText" v-text="tooltipText"></p>
    </div>
  </v-tooltip>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

type Props = {
  header: string
  text: string
  size: number
  icon: string
}
export default defineComponent<Props>({
  props: {
    size: { type: Number, default: 14, required: false },
    text: { type: String, default: '', required: false },
    header: { type: String as PropType<string | null>, default: null, required: false },
    icon: { type: String, default: 'mdi-information-outline', required: false },
  },
  setup(props) {
    return {
      toolTipHeader: props.header,
      tooltipText: props.text,
      iconSize: props.size,
      tooltipIcon: props.icon,
    }
  },
})
</script>

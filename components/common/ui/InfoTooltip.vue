<template>
  <v-tooltip right color="black" max-width="400" top>
    <template #activator="{ on, attrs }">
      <v-btn icon color="grey" :class="iconClass" x-small v-bind="attrs" v-on="on">
        <v-icon :size="size">{{ icon }}</v-icon>
      </v-btn>
    </template>
    <span></span>
    <div class="pa-2">
      <p v-if="header" class="text-center font-weight-bold text-subtitle-1" v-text="header" />
      <p v-if="text" v-text="text"></p>
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
  iconClass: string
}
export default defineComponent<Props>({
  props: {
    size: { type: Number, default: 14 },
    text: { type: String, default: '' },
    header: { type: String as PropType<string | null>, default: null },
    icon: { type: String, default: 'mdi-information-outline' },
    iconClass: { type: String, default: 'pa-0 mb-0' },
  },
})
</script>

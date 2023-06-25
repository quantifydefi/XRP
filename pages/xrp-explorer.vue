<template>
  <div>
    <v-row justify="center">
      <v-col cols="9"><x-r-p-grid /> </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { computed, defineComponent, inject, ref } from '@nuxtjs/composition-api'
import ScreenerGrid from '~/components/ScreenerGrid.vue'

export default defineComponent({
  setup() {
    // return {}
  },
  head: {},
})
</script>

<style scoped></style>

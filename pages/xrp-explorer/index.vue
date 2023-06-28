<template>
  <div>
    <v-row justify="center">
      <v-col md="12" lg="9">
      <client-only>
        <x-r-p-grid />
      </client-only>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {},
  head: {},
})
</script>

<style scoped></style>

<template>
  <v-row justify="center">
    <v-col cols="12" lg="10">
      <!--      <v-row class="mt-6" align="center">-->
      <!--        <v-col cols="3" class="hidden-sm-and-down">-->
      <!--          <v-text-field v-model="searchString" append-icon="mdi-magnify" color="primary" outlined dense hide-details />-->
      <!--        </v-col>-->
      <!--      </v-row>-->
      <v-row>
        <v-col class="py-0">
          <screener-grid :search="searchString" />
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unused-vars */

import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import ScreenerGrid from '~/components/ScreenerGrid.vue'
import useTokenScreener from '~/composables/useTokenScreener'
export default defineComponent({
  components: {
    ScreenerGrid,
  },
  setup() {
    const searchString = ref('')
    // COMPOSABLE
    // const { screenerData, currentPage, loading } = useTokenScreener()
    // WATCHERS

    // METHODS

    // META TAGS

    return {
      searchString,
      // loading,
      // screenerData,
      // currentPage,

      // COMPUTED
      // METHODS
    }
  },
  head: {},
})
</script>

<style scoped></style>

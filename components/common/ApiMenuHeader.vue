<template>
  <v-menu open-on-hover bottom offset-y>
    <template #activator="{ on, attrs }">
      <v-btn text tile v-bind="attrs" v-on="on"
        >API
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list tile>
      <v-list-item v-for="(item, index) in items" :key="index" dense link target="_blank" :href="item.href">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({ name: 'ApiMenuHeader' })
export default class ApiMenuHeader extends Vue {
  items = [
    { title: 'Heatmap', href: '/api/defi/heatmap/docs' },
    { title: 'Common', href: '/api/defi/common/docs' },
  ]
}
</script>

<style scoped></style>

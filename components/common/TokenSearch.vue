<template>
  <div>
    <v-autocomplete
      v-model="value"
      solo
      :items="results"
      append-icon=""
      :search-input.sync="search"
      hide-no-data
      hide-selected
      item-text="pool_id"
      item-value="pool_id"
      label="Search by Token ID, Symbol or Name"
      return-object
      no-filter
      prepend-inner-icon="mdi-magnify"
      @input="goToPool"
    >
      <template #append>
        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
      </template>

      <template #item="data">
        <v-avatar max-height="24" class="mx-0" min-width="24" width="24">
          <v-img
            :src="`https://tokens.dharma.io/assets/${data.item.token0_id}/icon.png`"
            :lazy-src="`https://tokens.dharma.io/assets/${data.item.token0_id}/icon.png`"
            max-width="24"
            max-height="24"
            min-width="24"
          />
        </v-avatar>

        <v-avatar max-height="24" class="mr-2" min-width="24" width="24">
          <v-img
            :src="`https://tokens.dharma.io/assets/${data.item.token1_id}/icon.png`"
            :lazy-src="`https://tokens.dharma.io/assets/${data.item.token1_id}/icon.png`"
            max-width="24"
            max-height="24"
            min-width="24"
          />
        </v-avatar>

        {{ data.item.token0_symbol }}-{{ data.item.token1_symbol }}
        <small class="ml-2">{{ data.item.pool_id }}</small>
      </template>
    </v-autocomplete>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { TokenPoolSearch } from '~/models/token'

@Component({ name: 'TokenSearch' })
export default class TokenSearch extends Vue {
  search: string | null = null
  results: TokenPoolSearch[] = []
  loading = false
  value: TokenPoolSearch | null = null
  searchTimeout: any = null

  @Watch('search')
  onSearchChanged(value: string | null) {
    if (value === null || value.length < 3) return
    this.loading = true
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(async () => {
      this.results = await this.searchCoins(value)
      this.loading = false
    }, 1000)
  }

  async searchCoins(queryString: string): Promise<any[]> {
    try {
      return await this.$store.dispatch('token/search', {
        searchString: queryString,
      })
    } catch {
      return []
    }
  }

  goToPool(data: TokenPoolSearch) {
    this.$router.push(`/token/${data.pool_id}`)
  }
}
</script>

<style scoped></style>

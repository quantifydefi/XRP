<template>
  <v-card tile outlined height="276">
    <v-card-title class="pa-0">
      <h2 class="pb-3 subtitle-1 font-weight-bold pt-2 pl-4 pb-3" v-text="`Latest ${symbol} news`" />
      <v-spacer />
      <div class="caption mt-n1 pr-3 d-flex">
        <div class="mr-3">
          <small class="grey--text">aggregated by</small>
          <div class="mt-n1">
            <a
              class="token-link"
              href="https://cryptopanic.com/"
              target="_blank"
              style="text-decoration: none; color: inherit"
              >CryptoPanic</a
            >
          </div>
        </div>

        <v-avatar size="26" class="mt-2">
          <v-img
            lazy-src="/img/logo/crypto-panic-logo.svg"
            src="/img/logo/crypto-panic-logo.svg"
            alt="CryptoPanic logo"
          />
        </v-avatar>
      </div>
    </v-card-title>

    <v-divider />

    <v-data-table
      height="226"
      dense
      :headers="cols"
      disable-sort
      :items="news"
      disable-pagination
      fixed-header
      hide-default-footer
      mobile-breakpoint="0"
    >
      <template #[`item.currencies`]="{ item }">
        <div class="text-no-wrap text-clamp-1 caption" style="max-width: 60px">
          <nuxt-link
            v-for="(coin, i) in item.currencies"
            :key="i"
            to="/"
            class="pr-2 token-link"
            style="text-decoration: none; color: inherit"
            v-text="coin.code"
          >
          </nuxt-link>
        </div>
      </template>

      <template #[`item.title`]="{ item }">
        <v-tooltip top color="grey darken-4">
          <template #activator="{ on, attrs }">
            <div v-bind="attrs" class="text-clamp-1" v-on="on">
              <a
                :href="item.url"
                target="_blank"
                style="text-decoration: none; color: inherit"
                class="token-link grey--text"
              >
                {{ item.title }}
              </a>
            </div>
          </template>
          <span v-text="item.title" />
        </v-tooltip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from '@nuxtjs/composition-api'
import { News } from '~/types/apollo/main/types'

type Props = {
  news: News[]
  symbol: string
}
export default defineComponent<Props>({
  props: {
    symbol: { type: String, default: '' },
    news: { type: Array as PropType<News[]>, default: () => [] },
  },

  setup(props) {
    // STATE
    const tokenNews = toRefs(props).news
    const cols = [
      { text: 'Symbol', value: 'currencies' },
      { text: 'Headline', value: 'title' },
    ]

    return { cols, tokenNews }
  },
})
</script>

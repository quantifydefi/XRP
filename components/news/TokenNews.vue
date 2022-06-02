<template>
  <v-card tile outlined :min-height="505" elevation="0">
    <template v-if="loading">
      <v-skeleton-loader :height="height" type="table-heading,divider,table-tbody,table-tbody"></v-skeleton-loader>
    </template>

    <template v-else>
      <client-only>
        <v-card-title class="pa-0" :class="!$vuetify.theme.dark ? 'grey lighten-3' : ''">
          <h2 class="pb-3 subtitle-1 font-weight-bold pt-2 pl-4 pb-3">Latest {{ tokenSymbol }} News</h2>
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
              <img src="/img/logo/crypto-panic-logo.svg" alt="CryptoPanic logo" />
            </v-avatar>
          </div>
        </v-card-title>

        <v-divider />

        <v-data-table
          :height="height - 55"
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
                class="pr-1 token-link"
                style="text-decoration: none; color: inherit"
              >
                {{ coin.code }}
              </nuxt-link>
            </div>
          </template>
          <template #[`item.published_at`]="{ item }">
            <v-tooltip top color="grey darken-4">
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" class="text-no-wrap" v-on="on">
                  {{ new Date(item.publishedAt).toLocaleTimeString() }}
                </div>
              </template>
              <span>{{ new Date(item.publishedAt).toLocaleString() }}</span>
            </v-tooltip>
          </template>
          <template #[`item.title`]="{ item }">
            <v-tooltip top color="grey darken-4">
              <template #activator="{ on, attrs }">
                <div v-bind="attrs" class="text-clamp-1" v-on="on">
                  <a :href="item.url" target="_blank" style="text-decoration: none; color: inherit" class="token-link">
                    {{ item.title }}
                  </a>
                </div>
              </template>
              <span>{{ item.title }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </client-only>
    </template>
  </v-card>
</template>

<script lang="ts">
/* eslint-disable camelcase */
import { defineComponent, useStore, PropType, toRef } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { News } from '~/types/apollo/main/types'

export default defineComponent({
  name: 'TokenNews',
  props: {
    height: {
      type: Number,
      default: 375,
    },
    loading: { type: Boolean, default: true },
    tokenSymbol: {
      type: String,
      required: true,
      default: '',
    },
    coinArticles: {
      type: Array as PropType<News[]>,
      required: true,
      default: [] as News[],
    },
  },
  setup(props) {
    /** COMPOSABLES **/
    const store = useStore<State>()

    /** COMPUTED **/
    const ui = store.state.ui
    const theme = store.state.ui.theme

    /** STATE **/
    const news = toRef(props, 'coinArticles')
    const cols = [
      {
        text: 'Time',
        sortable: true,
        value: 'published_at',
      },
      { text: 'Symbol', value: 'currencies' },
      { text: 'Headline', value: 'title' },
    ]

    return { ui, theme, cols, news }
  },
})
</script>

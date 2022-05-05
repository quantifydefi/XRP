<template>
  <div style="height: 100%">
    <v-card v-if="isLoading" tile outlined :height="height" width="100%" elevation="0" class="pa-4 overflow-hidden">
      <v-row no-gutters>
        <v-col cols="12">
          <v-skeleton-loader type="article,list-item-three-line@4"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-card>

    <v-card v-else tile outlined :height="height" width="100%" elevation="0" class="pa-4 scroller">
      <v-row>
        <v-col cols="12" class="flex-no-wrap d-flex">
          <v-avatar size="30px" class="mt-1">
            <v-img
              alt="Avatar"
              :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${tokenData.qc_key.toLowerCase()}.png`"
            />
          </v-avatar>

          <h2 class="text-h4 text-no-wrap text-truncate d-flex">
            <span class="text-truncate ml-2">{{ tokenData.symbol_name }}</span>
            <v-btn text small color="pink" tile class="mt-2">
              <span class="text-h6">{{ tokenData.qc_key }}</span>
            </v-btn>
          </h2>

          <v-spacer />
          <v-chip
            small
            style="height: 24px"
            :color="ui[theme].jsonLogs"
            class="mt-4 text-highlight rounded-0"
            @click="$router.push('/coin-screener')"
          >
            Rank {{ tokenData.rank }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters align="center" class="mt-4">
        <v-col cols="2" class="ma-1"><span class="subtitle-2 text-no-wrap grey--text">Website:</span></v-col>
        <v-col class="ma-1">
          <v-menu v-if="tokenData.website_url.length > 1" nudge-top="15" nudge-left="5">
            <template #activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                target="_blank"
                style="height: 24px"
                label
                :color="ui[theme].jsonLogs"
                class="text-lowercase font-weight-medium text-highlight rounded-0"
                v-on="on"
              >
                <div class="text-truncate">{{ tokenData.website_url[0] }}</div>
                <v-icon class="ml-2" small>mdi-chevron-down</v-icon>
              </v-chip>
            </template>

            <v-list dense max-width="360">
              <v-list-item
                v-for="(url, index) in tokenData.website_url"
                :key="index"
                class="text-highlight"
                :href="url"
                target="_blank"
              >
                <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-chip
            v-for="link in tokenData.website_url"
            v-else
            :key="link"
            :href="link"
            target="_blank"
            style="height: 24px"
            label
            :color="ui[theme].jsonLogs"
            class="text-lowercase font-weight-medium text-highlight rounded-0 text-truncate"
            >{{ link }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row justify="center" no-gutters align="center" class="mt-1">
        <v-col cols="2" class="ma-1">
          <div class="subtitle-2 text-no-wrap grey--text">Source:</div>
        </v-col>
        <v-col cols="9" class="ma-1">
          <v-menu
            v-if="[...tokenData.github_repos, ...tokenData.bitbucket_repos].length > 1"
            nudge-top="15"
            nudge-left="5"
          >
            <template #activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                target="_blank"
                style="height: 24px"
                label
                :color="ui[theme].jsonLogs"
                class="text-lowercase font-weight-medium text-highlight rounded-0"
                v-on="on"
              >
                <div class="text-truncate">
                  {{ [...tokenData.github_repos, ...tokenData.bitbucket_repos][0] }}
                </div>
                <v-icon class="ml-2" small>mdi-chevron-down</v-icon>
              </v-chip>
            </template>

            <v-list dense max-width="360">
              <v-list-item
                v-for="(url, index) in [...tokenData.github_repos, ...tokenData.bitbucket_repos]"
                :key="index"
                :href="url"
                target="_blank"
                class="text-highlight"
              >
                <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-chip
            v-for="link in [...tokenData.github_repos, ...tokenData.bitbucket_repos]"
            v-else
            :key="link"
            :href="link"
            target="_blank"
            style="height: 24px"
            label
            :color="ui[theme].jsonLogs"
            class="text-lowercase font-weight-medium text-highlight"
            >{{ link }}
          </v-chip>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row justify="center" no-gutters align="center" class="mt-1">
        <v-col cols="2" class="ma-1">
          <div class="subtitle-2 text-no-wrap grey--text mt-n2">Explorer:</div>
        </v-col>
        <v-col cols="9" class="ma-1">
          <v-menu v-if="tokenData.explorer_urls.length > 1" nudge-top="15" nudge-left="5">
            <template #activator="{ on, attrs }">
              <v-chip
                v-bind="attrs"
                target="_blank"
                style="height: 24px"
                label
                :color="ui[theme].jsonLogs"
                class="text-lowercase font-weight-medium text-highlight rounded-0"
                v-on="on"
              >
                <div class="text-truncate">{{ tokenData.explorer_urls[0] }}</div>
                <v-icon class="ml-2" small>mdi-chevron-down</v-icon>
              </v-chip>
            </template>

            <v-list dense max-width="360">
              <v-list-item
                v-for="(url, index) in tokenData.explorer_urls"
                :key="index"
                :href="url"
                target="_blank"
                class="text-highlight"
              >
                <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-chip
            v-for="link in tokenData.explorer_urls"
            v-else
            :key="link"
            :href="link"
            target="_blank"
            style="height: 24px"
            :color="ui[theme].jsonLogs"
            class="text-lowercase font-weight-medium text-highlight rounded-0"
            >{{ link }}
          </v-chip>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row justify="center" no-gutters align="center" class="mt-1 text-no-wrap">
        <v-col cols="2" class="ma-1"><span class="subtitle-2 text-no-wrap grey--text">Socials:</span></v-col>
        <v-col cols="9" class="ma-1">
          <v-btn
            v-if="tokenData.telegram_channel_id"
            elevation="1"
            class="mx-1 text-highlight"
            fab
            x-small
            target="_blank"
            :href="`https://t.me/${tokenData.telegram_channel_id}`"
          >
            <v-icon style="transform: rotate(-45deg)">mdi-send</v-icon>
          </v-btn>

          <v-btn
            v-if="tokenData.twitter_url"
            :href="tokenData.twitter_url"
            target="_blank"
            elevation="1"
            class="mx-1 text-highlight"
            fab
            x-small
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            v-if="tokenData.subreddit_url"
            :href="tokenData.subreddit_url"
            target="_blank"
            elevation="1"
            class="mx-1 text-highlight"
            fab
            x-small
          >
            <v-icon>mdi-reddit</v-icon>
          </v-btn>
          <v-btn
            v-if="tokenData.facebook_url"
            :href="tokenData.facebook_url"
            target="_blank"
            elevation="1"
            class="mx-1 text-highlight"
            fab
            x-small
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            v-if="tokenData.discord_channel_id"
            elevation="1"
            class="mx-1 text-highlight"
            fab
            x-small
            :href="tokenData.discord_channel_id"
            target="_blank"
          >
            <v-icon>mdi-discord</v-icon>
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>

      <v-row justify="center" no-gutters align="center" class="mt-1">
        <v-col class="ma-2">
          <v-card elevation="0" :max-height="200" class="pa-0 ma-0">
            <h2 class="subtitle-1 font-weight-medium grey--text">About {{ tokenData.symbol_name }}</h2>
            <pre
              style="font-family: 'Roboto'; white-space: pre-line; max-height: 180px"
              class="overflow-y-auto subtitle-2 font-weight-regular"
            >
              {{ tokenData.coin_description }}
            </pre>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, useStore, computed, toRef } from '@nuxtjs/composition-api'

import { CoinProfileDataInterface } from '~/types/token'
import { State, UiState, ThemeOptions } from '~/types/state'

export default defineComponent({
  name: 'CoinProfile',
  props: {
    height: {
      type: Number,
      default: 505,
    },
    coinProfileData: {
      type: Object as PropType<CoinProfileDataInterface>,
      required: true,
      default: () => ({}),
    },
  },
  setup(props) {
    /** COMPOSABLES **/
    const store = useStore<State>()

    /** COMPUTED **/
    const tokenData = toRef(props, 'coinProfileData')

    /** COMPUTED **/
    const ui = computed<UiState>(() => store.state.ui)
    const theme = computed<ThemeOptions>(() => store.state.ui.theme as ThemeOptions)

    const isLoading = computed<boolean>(() => {
      return Object.values(props.coinProfileData).length === 0
    })

    return { isLoading, ui, theme, tokenData }
  },
})
</script>

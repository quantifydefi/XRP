<!--<template>-->
<!--  <v-card tile outlined :height="height" width="100%" elevation="0" class="pa-4">-->
<!--    <template v-if="loading">-->
<!--      <v-skeleton-loader type="article,list-item-three-line@4"></v-skeleton-loader>-->
<!--    </template>-->

<!--    <template v-else>-->
<!--      <client-only>-->
<!--        <v-row no-gutters>-->
<!--          <v-col cols="12">-->
<!--            <v-row>-->
<!--              <v-col cols="12" class="flex-no-wrap d-flex">-->
<!--                <v-avatar size="30px" class="mt-1">-->
<!--                  <v-img-->
<!--                    alt="Avatar"-->
<!--                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${tokenData.qcKey-->
<!--                      .toString()-->
<!--                      .toLowerCase()}.png`"-->
<!--                  />-->
<!--                </v-avatar>-->

<!--                <h2 class="text-h4 text-no-wrap text-truncate d-flex">-->
<!--                  <span class="text-truncate ml-2">{{ tokenData.symbolName }}</span>-->
<!--                  <v-btn text small color="pink" tile class="mt-2">-->
<!--                    <span class="text-h6">{{ tokenData.qcKey }}</span>-->
<!--                  </v-btn>-->
<!--                </h2>-->

<!--                <v-spacer />-->
<!--                <v-chip-->
<!--                  small-->
<!--                  style="height: 24px"-->
<!--                  :color="ui[theme].jsonLogs"-->
<!--                  class="mt-4 text-highlight rounded-0"-->
<!--                  @click="$router.push('/coin-screener')"-->
<!--                >-->
<!--                  Rank {{ tokenData.rank }}-->
<!--                </v-chip>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--            <v-row justify="center" no-gutters align="center" class="mt-4">-->
<!--              <v-col cols="2" class="ma-1"><span class="subtitle-2 text-no-wrap grey&#45;&#45;text">Website:</span></v-col>-->
<!--              <v-col class="ma-1">-->
<!--                <v-menu v-if="tokenData.websiteUrl.links.length > 1" nudge-top="15" nudge-left="5">-->
<!--                  <template #activator="{ on, attrs }">-->
<!--                    <v-chip-->
<!--                      v-bind="attrs"-->
<!--                      target="_blank"-->
<!--                      style="height: 24px"-->
<!--                      label-->
<!--                      :color="ui[theme].jsonLogs"-->
<!--                      class="text-lowercase font-weight-medium text-highlight rounded-0"-->
<!--                      v-on="on"-->
<!--                    >-->
<!--                      <div class="text-truncate">{{ tokenData.websiteUrl.links[0] }}</div>-->
<!--                      <v-icon class="ml-2" small>mdi-chevron-down</v-icon>-->
<!--                    </v-chip>-->
<!--                  </template>-->

<!--                  <v-list dense max-width="360">-->
<!--                    <v-list-item-->
<!--                      v-for="(url, index) in tokenData.websiteUrl.links"-->
<!--                      :key="index"-->
<!--                      class="text-highlight"-->
<!--                      :href="url"-->
<!--                      target="_blank"-->
<!--                    >-->
<!--                      <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                  </v-list>-->
<!--                </v-menu>-->

<!--                <v-chip-->
<!--                  v-for="link in tokenData.websiteUrl.links"-->
<!--                  v-else-->
<!--                  :key="link"-->
<!--                  :href="link"-->
<!--                  target="_blank"-->
<!--                  style="height: 24px"-->
<!--                  label-->
<!--                  :color="ui[theme].jsonLogs"-->
<!--                  class="text-lowercase font-weight-medium text-highlight rounded-0 text-truncate"-->
<!--                  >{{ link }}-->
<!--                </v-chip>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--            <v-row justify="center" no-gutters align="center" class="mt-1">-->
<!--              <v-col cols="2" class="ma-1">-->
<!--                <div class="subtitle-2 text-no-wrap grey&#45;&#45;text">Source:</div>-->
<!--              </v-col>-->
<!--              <v-col cols="9" class="ma-1">-->
<!--                <v-menu-->
<!--                  v-if="[...tokenData.githubRepos.links, ...tokenData.bitbucketRepos.links].length > 1"-->
<!--                  nudge-top="15"-->
<!--                  nudge-left="5"-->
<!--                >-->
<!--                  <template #activator="{ on, attrs }">-->
<!--                    <v-chip-->
<!--                      v-bind="attrs"-->
<!--                      target="_blank"-->
<!--                      style="height: 24px"-->
<!--                      label-->
<!--                      :color="ui[theme].jsonLogs"-->
<!--                      class="text-lowercase font-weight-medium text-highlight rounded-0"-->
<!--                      v-on="on"-->
<!--                    >-->
<!--                      <div class="text-truncate">-->
<!--                        {{ [...tokenData.githubRepos.links, ...tokenData.bitbucketRepos.links][0] }}-->
<!--                      </div>-->
<!--                      <v-icon class="ml-2" small>mdi-chevron-down</v-icon>-->
<!--                    </v-chip>-->
<!--                  </template>-->

<!--                  <v-list dense max-width="360">-->
<!--                    <v-list-item-->
<!--                      v-for="(url, index) in [...tokenData.githubRepos.links, ...tokenData.bitbucketRepos.links]"-->
<!--                      :key="index"-->
<!--                      :href="url"-->
<!--                      target="_blank"-->
<!--                      class="text-highlight"-->
<!--                    >-->
<!--                      <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                  </v-list>-->
<!--                </v-menu>-->

<!--                <v-chip-->
<!--                  v-for="link in [...tokenData.githubRepos.links, ...tokenData.bitbucketRepos.links]"-->
<!--                  v-else-->
<!--                  :key="link"-->
<!--                  :href="link"-->
<!--                  target="_blank"-->
<!--                  style="height: 24px"-->
<!--                  label-->
<!--                  :color="ui[theme].jsonLogs"-->
<!--                  class="text-lowercase font-weight-medium text-highlight"-->
<!--                  >{{ link }}-->
<!--                </v-chip>-->
<!--              </v-col>-->
<!--              <v-spacer />-->
<!--            </v-row>-->
<!--            <v-row justify="center" no-gutters align="center" class="mt-1">-->
<!--              <v-col cols="2" class="ma-1">-->
<!--                <div class="subtitle-2 text-no-wrap grey&#45;&#45;text mt-n2">Explorer:</div>-->
<!--              </v-col>-->
<!--              <v-col cols="9" class="ma-1">-->
<!--                <v-menu v-if="tokenData.explorerUrls.links.length > 1" nudge-top="15" nudge-left="5">-->
<!--                  <template #activator="{ on, attrs }">-->
<!--                    <v-chip-->
<!--                      v-bind="attrs"-->
<!--                      target="_blank"-->
<!--                      style="height: 24px"-->
<!--                      label-->
<!--                      :color="ui[theme].jsonLogs"-->
<!--                      class="text-lowercase font-weight-medium text-highlight rounded-0"-->
<!--                      v-on="on"-->
<!--                    >-->
<!--                      <div class="text-truncate">{{ tokenData.explorerUrls.links[0] }}</div>-->
<!--                      <v-icon class="ml-2" small>mdi-chevron-down</v-icon>-->
<!--                    </v-chip>-->
<!--                  </template>-->

<!--                  <v-list dense max-width="360">-->
<!--                    <v-list-item-->
<!--                      v-for="(url, index) in tokenData.explorerUrls.links"-->
<!--                      :key="index"-->
<!--                      :href="url"-->
<!--                      target="_blank"-->
<!--                      class="text-highlight"-->
<!--                    >-->
<!--                      <v-list-item-title class="font-weight-medium subtitle-2">{{ url }}</v-list-item-title>-->
<!--                    </v-list-item>-->
<!--                  </v-list>-->
<!--                </v-menu>-->

<!--                <v-chip-->
<!--                  v-for="link in tokenData.explorerUrls.links"-->
<!--                  v-else-->
<!--                  :key="link"-->
<!--                  :href="link"-->
<!--                  target="_blank"-->
<!--                  style="height: 24px"-->
<!--                  :color="ui[theme].jsonLogs"-->
<!--                  class="text-lowercase font-weight-medium text-highlight rounded-0"-->
<!--                  >{{ link }}-->
<!--                </v-chip>-->
<!--              </v-col>-->
<!--              <v-spacer />-->
<!--            </v-row>-->

<!--            <v-row justify="center" no-gutters align="center" class="mt-1 text-no-wrap">-->
<!--              <v-col cols="2" class="ma-1"><span class="subtitle-2 text-no-wrap grey&#45;&#45;text">Socials:</span></v-col>-->
<!--              <v-col cols="9" class="ma-1">-->
<!--                <v-btn-->
<!--                  v-if="tokenData.telegramChannelId"-->
<!--                  elevation="1"-->
<!--                  class="mx-1 text-highlight"-->
<!--                  fab-->
<!--                  x-small-->
<!--                  target="_blank"-->
<!--                  :href="`https://t.me/${tokenData.telegramChannelId}`"-->
<!--                >-->
<!--                  <v-icon style="transform: rotate(-45deg)">mdi-send</v-icon>-->
<!--                </v-btn>-->

<!--                <v-btn-->
<!--                  v-if="tokenData.twitterUrl"-->
<!--                  :href="tokenData.twitterUrl"-->
<!--                  target="_blank"-->
<!--                  elevation="1"-->
<!--                  class="mx-1 text-highlight"-->
<!--                  fab-->
<!--                  x-small-->
<!--                >-->
<!--                  <v-icon>mdi-twitter</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                  v-if="tokenData.subredditUrl"-->
<!--                  :href="tokenData.subredditUrl"-->
<!--                  target="_blank"-->
<!--                  elevation="1"-->
<!--                  class="mx-1 text-highlight"-->
<!--                  fab-->
<!--                  x-small-->
<!--                >-->
<!--                  <v-icon>mdi-reddit</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                  v-if="tokenData.facebookUrl"-->
<!--                  :href="tokenData.facebookUrl"-->
<!--                  target="_blank"-->
<!--                  elevation="1"-->
<!--                  class="mx-1 text-highlight"-->
<!--                  fab-->
<!--                  x-small-->
<!--                >-->
<!--                  <v-icon>mdi-facebook</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn-->
<!--                  v-if="tokenData.discordChannelId"-->
<!--                  elevation="1"-->
<!--                  class="mx-1 text-highlight"-->
<!--                  fab-->
<!--                  x-small-->
<!--                  :href="tokenData.discordChannelId"-->
<!--                  target="_blank"-->
<!--                >-->
<!--                  <v-icon>mdi-discord</v-icon>-->
<!--                </v-btn>-->
<!--              </v-col>-->
<!--              <v-spacer />-->
<!--            </v-row>-->

<!--            <v-row justify="center" no-gutters align="center" class="mt-1">-->
<!--              <v-col class="ma-2">-->
<!--                <v-card elevation="0" :max-height="220" class="pa-0 ma-0">-->
<!--                  <h2 class="subtitle-1 font-weight-medium grey&#45;&#45;text">About {{ tokenData.symbolName }}</h2>-->
<!--                  <pre-->
<!--                    style="font-family: 'Roboto'; white-space: pre-line; max-height: 210px"-->
<!--                    class="overflow-y-auto subtitle-2 font-weight-regular"-->
<!--                  >-->
<!--                            {{ tokenData.coinDescription }} </pre-->
<!--                  >-->
<!--                </v-card>-->
<!--              </v-col>-->
<!--            </v-row>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </client-only>-->
<!--    </template>-->
<!--  </v-card>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--import { defineComponent, PropType, useStore, computed, toRef } from '@nuxtjs/composition-api'-->

<!--import { State, UiState, ThemeOptions } from '~/types/state'-->
<!--import { QcProfile } from '~/types/apollo/main/types'-->

<!--export default defineComponent({-->
<!--  name: 'CoinProfile',-->
<!--  props: {-->
<!--    height: { type: Number, default: 505 },-->
<!--    loading: { type: Boolean, default: true },-->
<!--    coinProfileData: { type: Object as PropType<QcProfile>, default: () => ({}), required: true },-->
<!--  },-->
<!--  setup(props) {-->
<!--    /** COMPOSABLES **/-->
<!--    const store = useStore<State>()-->

<!--    /** STATE **/-->
<!--    const dataLoading = toRef(props, 'loading')-->

<!--    /** COMPUTED **/-->
<!--    const ui = computed<UiState>(() => store.state.ui)-->
<!--    const theme = computed<ThemeOptions>(() => store.state.ui.theme as ThemeOptions)-->

<!--    const tokenData = computed<QcProfile>(() => props.coinProfileData)-->

<!--    return { dataLoading, ui, theme, tokenData }-->
<!--  },-->
<!--})-->
<!--</script>-->

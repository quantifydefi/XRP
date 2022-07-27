<template>
  <v-card :height="height" tile outlined class="pa-4">
    <v-row no-gutters>
      <v-col cols="12">
        <v-row align="center">
          <v-col class="d-flex">
            <div class="mr-2 d-flex">
              <img
                :alt="qcKey + 'logo'"
                :src="$imageUrlBySymbol(qcKey)"
                width="36"
                height="36"
                @error="$setAltImageUrl"
              />
              <img
                v-if="isAaveToken"
                alt=""
                height="15"
                width="15"
                :src="$imageUrlBySymbol('aave')"
                @error="$setAltImageUrl"
              />
            </div>
            <h1 class="text-h4 d-inline-block text-truncate" style="max-width: 360px">
              {{ symbol }}
              <span class="text-h6 pink--text ml-2 mt-2" v-text="isAaveToken ? aaveSymbol : qcKey" />
            </h1>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col>
            <v-chip
              v-for="(item, i) in tags"
              v-show="item.active"
              :key="`tag_${i}`"
              label
              pill
              small
              class="mb-4 mr-1 px-2"
              :link="item.link"
              color="#272727"
              @click="item.action ? item.action() : null"
            >
              <v-avatar v-if="item.img" left class="mr-0 pr-0">
                <v-img max-height="20" max-width="20" :src="item.img" :lazy-src="item.img" />
              </v-avatar>
              {{ item.text }}
            </v-chip>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col v-if="contractAddress.length > 0" class="d-flex text-no-wrap">
            <div
              class="caption font-weight-medium grey--text mr-3 pb-2"
              style="min-width: 70px"
              v-text="`Contract Address`"
            ></div>
            <v-chip class="mb-2 mr-1 px-3 font-weight-medium cursor-text" color="#272727" label pill small>
              <v-avatar left class="mr-0 pr-0"> <v-icon size="18" color="grey">mdi-file</v-icon> </v-avatar>
              {{ $truncateAddress(contractAddress, 12, 12) }}
              <v-icon size="12" class="ml-2 text-hover-primary" @click="$copyAddressToClipboard(contractAddress)">
                mdi-content-copy
              </v-icon>
            </v-chip>
          </v-col>
        </v-row>

        <v-row v-for="(elem, i) in resourcesUrls" :key="`resource_${i}`" no-gutters>
          <v-col class="d-flex">
            <div class="caption font-weight-medium pb-3 grey--text pr-3" style="min-width: 70px" v-text="elem.title" />

            <v-menu v-if="elem.items.length > 1" nudge-top="15" nudge-left="5">
              <template #activator="{ on, attrs }">
                <v-chip
                  v-bind="attrs"
                  label
                  pill
                  small
                  color="#272727"
                  class="font-weight-medium mb-2 mr-1 px-3"
                  v-on="on"
                >
                  <v-avatar left class="mr-0 pr-0">
                    <v-icon size="18" color="grey">{{ elem.icon }}</v-icon>
                  </v-avatar>
                  {{ cleanUrl(elem.items[0]) }}
                  <v-icon size="14" class="ml-2">mdi-chevron-down</v-icon>
                </v-chip>
              </template>

              <v-list dense max-width="360">
                <v-list-item
                  v-for="(url, j) in elem.items"
                  :key="`item_${j}`"
                  class="text-hover-primary"
                  :href="url"
                  target="_blank"
                >
                  <v-list-item-title class="font-weight-medium caption" v-text="cleanUrl(url)" />
                </v-list-item>
              </v-list>
            </v-menu>

            <v-chip
              v-else-if="elem.items.length === 1"
              target="_blank"
              :href="elem.items[0]"
              label
              pill
              small
              class="font-weight-medium mb-2 mr-1 px-3"
              color="#272727"
            >
              <v-avatar left class="mr-0 pr-0">
                <v-icon size="18" color="grey">{{ elem.icon }}</v-icon>
              </v-avatar>
              {{ cleanUrl(elem.items[0]) }}
              <v-icon size="10" class="ml-2">mdi-open-in-new</v-icon>
            </v-chip>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col class="d-flex">
            <div
              class="caption font-weight-medium pb-2 grey--text pr-3"
              style="min-width: 70px"
              v-text="`Source Code`"
            />

            <div v-for="(elem, i) in sourceCodes" :key="`source_${i}`">
              <v-menu v-if="elem.items.length > 1" nudge-top="15" nudge-left="5">
                <template #activator="{ on, attrs }">
                  <v-chip
                    v-bind="attrs"
                    target="_blank"
                    label
                    pill
                    small
                    color="#272727"
                    class="font-weight-medium mb-2 mr-1 px-3"
                    v-on="on"
                  >
                    <v-avatar left class="mr-0 pr-0">
                      <v-icon size="18" color="grey">{{ elem.icon }}</v-icon>
                    </v-avatar>
                    {{ cleanUrl(elem.items[0]) }}
                    <v-icon size="14" class="ml-2">mdi-chevron-down</v-icon>
                  </v-chip>
                </template>

                <v-list dense max-width="360">
                  <v-list-item
                    v-for="(url, j) in elem.items"
                    :key="`source2_${j}`"
                    class="text-hover-primary"
                    :href="url"
                    target="_blank"
                  >
                    <v-list-item-title class="font-weight-medium caption" v-text="url" />
                  </v-list-item>
                </v-list>
              </v-menu>

              <v-chip
                v-else-if="elem.items.length > 0"
                target="_blank"
                :href="elem.items[0]"
                label
                pill
                small
                class="font-weight-medium mb-2 mr-1 px-3"
                color="#272727"
              >
                <v-avatar left class="mr-0 pr-0">
                  <v-icon size="18" color="grey">{{ elem.icon }}</v-icon>
                </v-avatar>
                {{ cleanUrl(elem.items[0]) }}
                <v-icon size="10" class="ml-2">mdi-open-in-new</v-icon>
              </v-chip>
            </div>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col class="d-flex">
            <div class="caption font-weight-medium pb-2 grey--text pr-3 pt-1">Community Links</div>
            <div v-for="(elem, i) in socials" :key="`social_${i}`">
              <v-btn
                v-if="elem.link"
                :key="i"
                class="mr-2"
                x-small
                height="28"
                width="28"
                fab
                :href="elem.link"
                target="_blank"
              >
                <v-icon v-if="elem.icon.startsWith('mdi')" size="18" color="grey">{{ elem.icon }}</v-icon>

                <v-avatar v-else size="18">
                  <v-img class="color-icon-primary" :src="elem.icon" :lazy-src="elem.link" />
                </v-avatar>
              </v-btn>
            </div>
          </v-col>
        </v-row>

        <v-row justify="center" no-gutters align="center">
          <v-col>
            <h1 class="subtitle-2 pb-1" v-text="`About ${symbol}`" />
            <v-card elevation="0" class="overflow-auto" :height="contractAddress.length > 0 ? 60 : 90">
              <pre
                style="white-space: pre-line"
                class="overflow-y-auto pr-2 subtitle-2 font-weight-regular grey--text"
                v-text="coinDescription"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@nuxtjs/composition-api'

type Props = {
  height: string

  qcKey: string
  symbol: string
  isAaveToken: boolean
  isQCToken: boolean
  aaveSymbol: string
  coinDescription: string

  websiteLinks: { links?: string[] } | null
  bitBucketRepos: { links?: string[] } | null
  gitHubRepos: { links?: string[] } | null
  explorerUrls: { links?: string[] } | null

  telegramChannelId: string
  twitterUrl: string
  subredditUrl: string
  facebookUrl: string
  discordChannelId: string
  contract: string
}
export default defineComponent<Props>({
  props: {
    height: { type: String, default: '272' },

    qcKey: { type: String, required: true },
    symbol: { type: String, required: true },
    isAaveToken: { type: Boolean, default: false },
    isQCToken: { type: Boolean, default: false },
    aaveSymbol: { type: String, default: '' },
    coinDescription: { type: String, default: '' },

    // links
    websiteLinks: { type: Object as PropType<{ links: string[] } | null>, default: () => {} },
    bitBucketRepos: { type: Object as PropType<{ links: string[] } | null>, default: () => {} },
    gitHubRepos: { type: Object as PropType<{ links: string[] } | null>, default: () => {} },
    explorerUrls: { type: Object as PropType<{ links: string[] } | null>, default: () => {} },

    // socials
    telegramChannelId: { type: String, default: '' },
    twitterUrl: { type: String, default: '' },
    subredditUrl: { type: String, default: '' },
    facebookUrl: { type: String, default: '' },
    discordChannelId: { type: String, default: '' },

    // contract
    contractAddress: { type: String, default: '' },
  },
  setup(props) {
    // COMPUTED
    const resourcesUrls = computed<{ title: string; icon: string; items: string[] }[]>(() => [
      { title: 'Website', icon: 'mdi-link-variant', items: props.websiteLinks?.links ?? [] },
      { title: 'Explorer', icon: 'mdi-magnify', items: props.explorerUrls?.links ?? [] },
    ])

    const sourceCodes = computed<{ icon: string; items: string[] }[]>(() => [
      {
        icon: 'mdi-github',
        items: [...(props.gitHubRepos?.links ?? [])],
      },
      {
        icon: 'mdi-bitbucket',
        items: [...(props.bitBucketRepos?.links ?? [])],
      },
    ])

    const socials = computed<{ link: string; icon: string; style?: Object }[]>(() => [
      {
        link: props.telegramChannelId ? `https://t.me/${props.telegramChannelId}` : '',
        icon: '/img/telegram.svg',
        style: { filter: 'invert(99%) sepia(76%) saturate(53%) hue-rotate(178deg) brightness(114%) contrast(96%)' },
      },
      { link: props.subredditUrl, icon: 'mdi-reddit' },
      { link: props.facebookUrl, icon: 'mdi-facebook' },
      { link: props.twitterUrl, icon: 'mdi-twitter' },
      {
        link: props.discordChannelId,
        icon: '/img/telegram.svg',
        style: { filter: 'invert(99%) sepia(76%) saturate(53%) hue-rotate(178deg) brightness(114%) contrast(96%)' },
      },
    ])

    const tags = computed<{ text: string; active: boolean; link?: boolean; img?: string; action?: () => void }[]>(
      () => [
        { text: 'DeFi', active: true },
        { text: 'Token', active: true },
        {
          text: 'QC-500',
          active: props.isQCToken,
          img: 'https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/logo/logo-100.png',
          link: true,
          action: () => window.open(`https://quantifycrypto.com/coin-screener`, '_blank'),
        },
      ]
    )

    function cleanUrl(url: string): string {
      return url?.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0] ?? ''
    }
    return { resourcesUrls, sourceCodes, socials, tags, cleanUrl }
  },
})
</script>

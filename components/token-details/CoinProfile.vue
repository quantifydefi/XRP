<template>
  <v-card tile outlined height="500" class="pa-4">
    <v-row no-gutters>
      <v-col cols="12">
        <v-row align="center">
          <v-col class="d-flex">
            <div class="mr-2 d-flex">
              <img alt="" :src="$imageUrlBySymbol(qcKey)" width="36" height="36" @error="$setAltImageUrl" />
              <img
                v-if="isAaveToken"
                alt=""
                height="15"
                width="15"
                :src="$imageUrlBySymbol('aave')"
                @error="$setAltImageUrl"
              />
            </div>
            <h2 class="text-h4 d-inline-block text-truncate" style="max-width: 360px">
              {{ symbol }}
              <span class="text-h6 pink--text ml-2 mt-2" v-text="isAaveToken ? aaveSymbol : qcKey" />
            </h2>
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-2">
          <v-col>
            <v-chip
              v-for="(item, i) in tags"
              v-show="item.active"
              :key="i"
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

        <div class="d-flex text-no-wrap subtitle-2 text-truncate">
          <div class="grey--text pb-1" style="min-width: 70px" v-text="`Contract:`"></div>
          <div class="pl-3" style="width: 320px" v-text="$truncateAddress(contractAddress, 12, 12)"></div>
          <v-btn color="primary" x-small class="mb-1 ml-1" icon @click="$copyAddressToClipboard(contractAddress)">
            <v-icon size="18">mdi-content-copy</v-icon>
          </v-btn>
        </div>

        <div v-for="(elem, i) in resourcesUrls" :key="i" class="d-flex subtitle-2 text-no-wrap text-truncate">
          <div class="grey--text py-1" style="min-width: 70px" v-text="elem.title"></div>
          <div style="width: 320px">
            <v-menu v-if="elem.items.length > 1" nudge-top="15" nudge-left="5">
              <template #activator="{ on, attrs }">
                <v-chip
                  v-bind="attrs"
                  target="_blank"
                  label
                  class="text-lowercase text-truncate font-weight-medium text-highlight rounded-0"
                  color="transparent"
                  v-on="on"
                >
                  <div class="text-truncate" v-text="elem.items[0]" />
                  <v-icon class="ml-2" small>mdi-chevron-down</v-icon>
                </v-chip>
              </template>

              <v-list dense max-width="360">
                <v-list-item
                  v-for="(url, index) in elem.items"
                  :key="index"
                  class="text-highlight"
                  :href="url"
                  target="_blank"
                >
                  <v-list-item-title class="font-weight-medium subtitle-2" v-text="url" />
                </v-list-item>
              </v-list>
            </v-menu>
            <v-chip
              v-for="link in elem.items"
              v-else
              :key="link"
              :href="link"
              target="_blank"
              color="transparent"
              label
              class="text-lowercase font-weight-medium text-highlight rounded-0 text-truncate"
              v-text="link"
            >
            </v-chip>
          </div>
        </div>

        <div class="d-flex text-no-wrap subtitle-2">
          <div class="grey--text pt-2" style="min-width: 70px" v-text="`Socials:`"></div>
          <div class="pt-1 d-flex" style="width: 320px">
            <div v-for="(elem, i) in socials" :key="i">
              <v-btn
                v-if="elem.link"
                class="mx-2 text-hover-primary grey--text"
                target="_blank"
                fab
                x-small
                elevation="1"
                :href="elem.link"
                color="grey darken-4"
              >
                <v-icon v-if="elem.icon.startsWith('mdi')" size="20">{{ elem.icon }}</v-icon>

                <v-avatar v-else size="20">
                  <v-img class="color-icon-primary" :src="elem.icon" :lazy-src="elem.link" />
                </v-avatar>
              </v-btn>
            </div>
          </div>
        </div>

        <v-row justify="center" no-gutters align="center" class="mt-1">
          <v-col>
            <v-card elevation="0" :max-height="130" class="pa-0 mt-4">
              <h1 class="subtitle-1 font-weight-medium" v-text="`About ${symbol}`" />
              <pre
                style="white-space: pre-line; max-height: 170px"
                class="pr-2 overflow-y-auto subtitle-2 font-weight-regular grey--text"
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
  qcKey: string
  symbol: string
  isAaveToken: boolean
  isQCToken: boolean
  aaveSymbol: string

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
    const resourcesUrls = computed<{ title: string; items: string[] }[]>(() => [
      { title: 'Website:', items: props.websiteLinks?.links ?? [] },
      { title: 'Explorer:', items: props.explorerUrls?.links ?? [] },
      {
        title: 'Source:',
        items: [...(props.bitBucketRepos?.links ?? []), ...(props.gitHubRepos?.links ?? [])],
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
      { link: props.discordChannelId, icon: 'mdi-discord' },
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
    return { resourcesUrls, socials, tags }
  },
})
</script>

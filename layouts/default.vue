<template>
  <v-app>
    <!--    <v-app-bar app elevation="0" outlined height="60" class="hidden-xs-and-down">-->
    <!--      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = true"></v-app-bar-nav-icon>-->

    <!--      <v-avatar size="32" class="rounded-0">-->
    <!--        <v-img :src="imageUrl" :lazy-src="imageUrl" />-->
    <!--      </v-avatar>-->

    <!--      <nuxt-link to="/" class="text-decoration-none mr-10" style="color: inherit">-->
    <!--        <v-toolbar-title class="ml-2 d-flex">-->
    <!--          <div>-->
    <!--            <div class="subtitle-1 mb-n2">EVM</div>-->
    <!--            <div class="caption grey&#45;&#45;text">finance</div>-->
    <!--          </div>-->
    <!--        </v-toolbar-title>-->
    <!--      </nuxt-link>-->

    <!--      <client-only>-->
    <!--        <div v-if="$vuetify.breakpoint.smAndUp" class="text-no-wrap">-->
    <!--          <nuxt-link-->
    <!--            v-for="(link, i) in links"-->
    <!--            :key="i"-->
    <!--            active-class="underline-glow-active"-->
    <!--            class="underline-glow-hover white&#45;&#45;text mr-4 pb-2 px-1"-->
    <!--            tile-->
    <!--            text-->
    <!--            :to="link.to"-->
    <!--            v-text="link.name"-->
    <!--          />-->
    <!--        </div>-->
    <!--      </client-only>-->
    <!--    </v-app-bar>-->

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <!--    <v-navigation-drawer v-model="drawer" fixed temporary>-->
    <!--      <v-list elevation="0">-->
    <!--        <v-list-item-group color="primary">-->
    <!--          <v-list-item v-for="(item, index) in links" :key="index" :to="item.to">-->
    <!--            <v-list-item-title v-text="item.name" />-->
    <!--          </v-list-item>-->
    <!--        </v-list-item-group>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  components: {},
  setup() {
    // STATE
    const searchOverlay = ref(true)
    const globalSearchComponentRef = ref<any>(null)
    const drawer = ref(false)
    const links = ref([
      { name: 'Aave', to: '/markets/aave' },
      { name: 'Trade', to: '/swap' },
      { name: 'Verse', to: '/verse' },
      { name: 'Balances', to: '/portfolio/balances' },
      { name: 'Transactions', to: '/portfolio/transactions' },
      { name: 'Screener', to: '/screener' },
      { name: 'XRP-Explorer', to: '/xrp-explorer' },
      { name: 'About', to: '/about' },
    ])

    // COMPUTED
    const imageUrl = computed(() => `/img/logo/evmfinance-logo.svg`)

    return {
      links,
      imageUrl,
      drawer,
      searchOverlay,
      globalSearchComponentRef,
    }
  },
})
</script>

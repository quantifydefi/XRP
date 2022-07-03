<template>
  <v-app>
    <v-app-bar app elevation="0" outlined height="60" class="hidden-xs-and-down">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = true"></v-app-bar-nav-icon>

      <v-avatar size="32" class="rounded-0">
        <v-img :src="imageUrl" :lazy-src="imageUrl" />
      </v-avatar>

      <nuxt-link to="/" class="text-decoration-none mr-10" style="color: inherit">
        <v-toolbar-title class="ml-2 d-flex">
          <div>
            <div class="subtitle-1 mb-n2">EVM</div>
            <div class="caption grey--text">finance</div>
          </div>
        </v-toolbar-title>
      </nuxt-link>

      <client-only>
        <div v-if="$vuetify.breakpoint.smAndUp" class="text-no-wrap">
          <nuxt-link
            v-for="(link, i) in links"
            :key="i"
            active-class="underline-glow-active"
            class="underline-glow-hover white--text mr-4 pb-2 px-1"
            tile
            text
            :to="link.to"
            v-text="link.name"
          />
        </div>
      </client-only>

      <v-spacer />
      <client-only>
        <gas-info class="hidden-xs-and-down" />
      </client-only>
      <wallet-connector class="hidden-sm-and-down" />
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <wallet-select-dialog />

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list elevation="0">
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in links" :key="index" :to="item.to">
            <v-list-item-title v-text="item.name" />
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <client-only>
      <main-footer></main-footer>
    </client-only>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useStore } from '@nuxtjs/composition-api'
import GasInfo from '~/components/common/GasInfo.vue'
import WalletConnector from '~/components/common/WalletConnector.vue'
import useInitTheme from '~/composables/useInitTheme'
import WalletSelectDialog from '~/components/common/WalletSelectDialog.vue'
import { State } from '~/types/state'
import MainFooter from '~/components/common/ui/footers/MainFooter.vue'

export default defineComponent({
  components: {
    MainFooter,
    WalletSelectDialog,
    WalletConnector,
    GasInfo,
  },
  setup() {
    // STATE
    const notificationComponent = ref<Notification>()
    const drawer = ref(false)
    const links = ref([
      { name: 'Aave Markets', to: '/markets/aave' },
      { name: 'Balances', to: '/portfolio/balances' },
      { name: 'Transactions', to: '/portfolio/transactions' },
      { name: 'About', to: '/about' },
    ])

    // COMPOSABLE
    const { state } = useStore<State>()
    useInitTheme()

    // COMPUTED
    const imageUrl = computed(() => `/img/logo/evmfinance-logo.svg`)

    return { title: state.configs.title, links, notificationComponent, imageUrl, drawer }
  },
})
</script>

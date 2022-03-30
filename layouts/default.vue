<template>
  <v-app>
    <v-app-bar app elevation="0">
      <v-btn v-if="$vuetify.breakpoint.mdAndDown" class="mr-1 mt-1" icon><v-icon>mdi-menu</v-icon></v-btn>

      <!--      Change it to separate component-->
      <v-toolbar-title v-if="$vuetify.breakpoint.mdAndUp">{{ title }}</v-toolbar-title>
      <v-spacer />

      <!--  Network Menu    -->
      <gas-info />
      <network-selection />
      <wallet-connector />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <main-navigation-menu />
    <notification ref="notificationComponent" />
    <wallet-select-dialog />
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useRoute } from '@nuxtjs/composition-api'
import Notification from '../components/common/Notification.vue'
import NetworkSelection from '~/components/common/NetworkSelection.vue'
import GasInfo from '~/components/common/GasInfo.vue'
import WalletConnector from '~/components/common/WalletConnector.vue'
import useInitTheme from '~/composables/useInitTheme'
import MainNavigationMenu from '~/components/common/ui/menu/MainNavigationMenu.vue'
import WalletSelectDialog from '~/components/common/WalletSelectDialog.vue'
// import useConfig from '~/composables/useConfig'
export default defineComponent({
  components: {
    WalletSelectDialog,
    WalletConnector,
    GasInfo,
    NetworkSelection,
    Notification,
    MainNavigationMenu,
  },
  setup() {
    // STATE
    const notificationComponent = ref<Notification>()

    // COMPOSABLE
    const route = useRoute()
    const context = useContext()
    useInitTheme(context)

    // COMPUTED
    const title = computed(() => {
      const pageTitle: Record<string, string> = {
        index: 'Dashboard',
        terminal: 'Terminal',
        protocols: 'Protocols',
        'portfolio-balances': 'Balances',
        'portfolio-transactions': 'Transactions',
        heatmap: 'Heatmap',
        'trading-101': 'Trading 101',
        team: 'Our Team',
        'wallet-id': 'Portfolio',
        'app-id-aave': 'Aave v2',
        'app-id-curve': 'Curve',
      }

      if (route.value.name) {
        return pageTitle[route.value.name]
      } else return ''
    })

    return { title, notificationComponent }
  },
})
</script>

<template>
  <v-navigation-drawer
    v-model="navigationDrawer"
    left
    temporary
    fixed
    :color="$vuetify.theme.dark ? 'grey darken-4' : ''"
  >
    <template #prepend>
      <nuxt-link to="/" style="color: inherit; text-decoration: none">
        <v-list-item two-line>
          <v-list-item-avatar size="46">
            <img :src="'/img/logo/logo.svg'" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-h6">DeFi Heatmap</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </template>

    <v-divider></v-divider>

    <client-only>
      <v-list dense>
        <v-list-item
          v-for="item in navigationMenu"
          :key="item.title"
          :to="item.to"
          :href="item.href"
        >
          <v-list-item-icon>
            <v-icon> {{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </client-only>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { EmitEvents } from '~/types/events'

@Component({ name: 'MainNavigationMenu' })
export default class MainNavigationMenu extends Vue {
  navigationDrawer: boolean = false

  navigationMenu: {
    icon: string
    title: string
    to?: string
    href?: string
  }[] = [
    {
      icon: 'mdi-tablet-dashboard',
      title: 'Terminal',
      to: '/terminal',
    },
    {
      icon: 'mdi-briefcase',
      title: 'Portfolio',
      to: '/portfolio',
    },
    {
      icon: 'mdi-view-dashboard-variant',
      title: 'Heatmap',
      to: '/heatmap',
    },
    {
      icon: 'mdi-chart-line-stacked',
      title: 'Trading 101',
      to: '/trading-101',
    },
    {
      icon: 'mdi-ethereum',
      title: 'Crypto',
      href: 'https://quantifycrypto.com/terminal',
    },
    {
      icon: 'mdi-account-group',
      title: 'Our Team',
      to: '/team',
    },
  ]

  mounted() {
    this.$root.$on(EmitEvents.toggleNavigationMenu, () => {
      this.navigationDrawer = !this.navigationDrawer
    })
  }
}
</script>

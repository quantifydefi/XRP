<template>
  <v-navigation-drawer v-model="navigationDrawer" app left fixed width="220">
    <template #prepend>
      <nuxt-link to="/" style="color: inherit; text-decoration: none">
        <v-list-item two-line class="ml-n2" style="margin-top: -1px">
          <v-avatar size="38"> <v-img :src="`/img/logo/evmx-${theme}.svg`" /> </v-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-regular pl-2">
              EVMX
              <small class="grey--text text--lighten-1 ml-1 text-caption"> Beta </small>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </nuxt-link>
    </template>

    <v-divider></v-divider>

    <client-only>
      <v-list dense>
        <v-list-item-group color="primary" style="width: 255px">
          <v-list-item exact to="/">
            <v-list-item-icon>
              <v-icon>mdi-apps</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" no-action color="primary">
            <template #prependIcon>
              <v-list-item-icon class="mt-0">
                <v-icon>mdi-lan </v-icon>
              </v-list-item-icon>
            </template>
            <template #appendIcon>
              <v-list-item-icon class="mt-0 mr-0">
                <v-icon>mdi-chevron-down </v-icon>
              </v-list-item-icon>
            </template>
            <template #activator>
              <v-list-item-title>Protocols </v-list-item-title>
            </template>

            <v-list-item
              v-for="item in protocols"
              :key="item.id"
              exact
              class="ml-n6"
              :to="`/protocols?protocol=${item.id}`"
            >
              <v-list-item-icon>
                <v-avatar size="24">
                  <v-img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.symbol.toLowerCase()}.png`"
                  />
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item exact disabled>
            <v-list-item-icon>
              <v-icon>mdi-bridge</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Bridge <small class="pl-2">coming soon...</small></v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/portfolio/balances">
            <v-list-item-icon>
              <v-icon>mdi-history</v-icon>
            </v-list-item-icon>

            <v-list-item-title>Balances</v-list-item-title>
          </v-list-item>

          <v-list-item exact to="/portfolio/transactions">
            <v-list-item-icon>
              <v-icon>mdi-transcribe</v-icon>
            </v-list-item-icon>

            <v-list-item-title> Transactions</v-list-item-title>
          </v-list-item>

          <v-list-group :value="true" no-action color="primary">
            <template #prependIcon>
              <v-list-item-icon class="mt-0">
                <v-icon>mdi-lan </v-icon>
              </v-list-item-icon>
            </template>
            <template #appendIcon>
              <v-list-item-icon class="mt-0 mr-0">
                <v-icon>mdi-chevron-down </v-icon>
              </v-list-item-icon>
            </template>
            <template #activator>
              <v-list-item-title>Research </v-list-item-title>
            </template>

            <v-list-item v-for="item in navigationMenu" :key="item.title" class="ml-n6" :to="item.to" :href="item.href">
              <v-list-item-icon>
                <v-icon> {{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list-group>
        </v-list-item-group>

        <div class="pa-2" style="position: fixed; bottom: 0px; width: 100%">
          <div class="caption d-flex my-4 justify-center">
            <v-btn x-small icon @click="changeTheme">
              <v-icon>{{ $vuetify.theme.dark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }} </v-icon>
            </v-btn>
            <div class="caption ml-2">change to {{ $vuetify.theme.dark ? 'light' : 'dark' }} theme</div>
          </div>

          <v-divider />

          <div class="caption text-center mt-2">EVMX &copy; {{ new Date().getFullYear() }}</div>
        </div>
      </v-list>
    </client-only>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { EmitEvents } from '~/types/events'
import { ThemeOptions } from '~/types/ui'

@Component({
  name: 'MainNavigationMenu',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      protocols: (state: any) => state.configs.protocols,
    }),
  },
})
export default class MainNavigationMenu extends Vue {
  navigationDrawer: boolean = true
  $cookies!: Record<string, any>
  $vuetify!: any
  protocols!: { name: string; symbol: string; id: string }[]
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
      icon: 'mdi-account-group',
      title: 'Our Team',
      to: '/team',
    },
    {
      icon: 'mdi-ethereum',
      title: 'Crypto',
      href: 'https://quantifycrypto.com/terminal',
    },
  ]

  changeTheme() {
    const theme: ThemeOptions = this.$cookies.get('theme')
    if (theme === 'dark') {
      this.$vuetify.theme.dark = false
      this.$cookies.set('theme', 'light')
      this.$store.dispatch('ui/changeTheme', 'light')
    } else {
      this.$vuetify.theme.dark = true
      this.$cookies.set('theme', 'dark')
      this.$store.dispatch('ui/changeTheme', 'dark')
    }
  }

  mounted() {
    this.$root.$on(EmitEvents.toggleNavigationMenu, () => {
      this.navigationDrawer = !this.navigationDrawer
    })
  }
}
</script>

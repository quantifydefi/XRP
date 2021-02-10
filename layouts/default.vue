<template>
  <v-app
    :dark="true"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <v-app-bar app elevation="1" tile>
      <img :src="'/img/logo/logo.svg'" height="55" width="55" />
      <nuxt-link to="/" style="color: inherit; text-decoration: none">
        <v-toolbar-title class="ml-1"
          >DeFi Heatmap
          <small class="grey--text text--lighten-1 ml-1 text-caption"
            >Beta</small
          ></v-toolbar-title
        >
      </nuxt-link>
      <v-spacer />
      <div v-if="$vuetify.breakpoint.lgAndUp">
        <v-btn text tile to="/">Home</v-btn>
        <v-btn text tile @click="initMetamask">Portfolio</v-btn>
        <v-btn text tile to="/heatmap">Heatmap</v-btn>
        <v-btn text tile to="/trading-101">Trading 101</v-btn>
        <v-btn
          text
          tile
          target="_blank"
          href="https://quantifycrypto.com/terminal"
          >Crypto</v-btn
        >
        <api-menu-header v-if="allowApiBar" />
      </div>
      <v-btn text tile to="/team">Team</v-btn>
      <v-btn icon @click="changeTheme">
        <v-icon>mdi-white-balance-sunny</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container style="max-width: 3000px">
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>Defi Heatmap &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <notification ref="notificationComponent" />
  </v-app>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'
import { Events } from '~/types/global'
import { ThemeOptions } from '~/types/ui'
import LayoutMixin from '~/mixins/LayoutMixin.vue'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'

@Component({
  name: 'Default',
  components: { ApiMenuHeader, Notification },
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Wallet extends mixins(LayoutMixin, MetamaskMixin) {
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  rightDrawer = false
  $refs!: { notificationComponent: any }
  $cookies!: Record<string, any>
  $vuetify!: any

  allowApiBar =
    process.env.runEnv === 'development' || process.env.runEnv === 'staging'

  mounted() {
    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })
  }

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
}
</script>

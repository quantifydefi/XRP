<template>
  <v-app :dark="true">
    <v-app-bar app color="white" elevation="1" tile>
      <img :src="'/img/logo/logo.svg'" height="55" width="55" alt="logo" />
      <nuxt-link to="/" style="color: inherit; text-decoration: none">
        <v-toolbar-title class="ml-1">DeFi Heatmap</v-toolbar-title>
      </nuxt-link>
      <v-spacer />

      <v-btn text tile to="/">Home</v-btn>
      <v-btn text tile to="/roadmap">Roadmap</v-btn>
      <v-btn text tile to="/trading-101">Trading 101</v-btn>
      <v-btn
        text
        tile
        target="_blank"
        href="https://quantifycrypto.com/terminal"
        >Crypto</v-btn
      >
      <api-menu-header />
    </v-app-bar>
    <v-main class="grey lighten-5">
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
import { Vue, Component } from 'vue-property-decorator'
import { Events } from '../types/global'
import Notification from '../components/common/Notification.vue'
import ApiMenuHeader from '../components/common/ApiMenuHeader.vue'

@Component({
  name: 'Default',
  components: { ApiMenuHeader, Notification },
})
export default class Default extends Vue {
  clipped = false
  drawer = false
  fixed = false
  miniVariant = false
  right = true
  rightDrawer = false
  $refs!: { notificationComponent: any }

  mounted() {
    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })
  }
}
</script>

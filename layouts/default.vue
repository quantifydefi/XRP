<template>
  <v-app :dark="true">
    <v-app-bar
      outlined
      :clipped-left="clipped"
      fixed
      app
      color="white"
      elevation="1"
      tile
    >
      <img :src="'/img/logo/logo.svg'" height="55" width="55" alt="logo" />
      <nuxt-link to="/" style="color: inherit; text-decoration: none">
        <v-toolbar-title class="ml-1">Defi Heatmap</v-toolbar-title>
      </nuxt-link>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
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
      <span>Quantify Crypto &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <notification ref="notificationComponent" />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Events } from '~/types/global'
import Notification from '~/components/common/Notification.vue'

@Component({
  name: 'Default',
  components: { Notification },
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
    // this.$vuetify.theme.dark = true

    this.$root.$on(Events.GLOBAL_NOTIFICATION, (data: any) => {
      try {
        this.$refs.notificationComponent.openNotification(data.text)
      } catch {}
    })
  }
}
</script>

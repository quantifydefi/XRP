<template>
  <v-app>
    <v-app-bar app elevation="0" outlined height="60" class="hidden-xs-and-down">
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click="drawer = true"></v-app-bar-nav-icon>

      <v-avatar size="32" class="rounded-0">
        <v-img src="/img/logo/evmfinance-logo.svg" lazy-src="/img/logo/evmfinance-logo.svg"/>
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
          >{{link.name}}</nuxt-link>
        </div>
      </client-only>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-main>

    <v-navigation-drawer v-model="drawer" fixed temporary>
      <v-list elevation="0">
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, index) in links" :key="index" :to="item.to">
            <v-list-item-title >{{item.name}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

       <client-only>
      <main-footer/>
    </client-only>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref} from '@nuxtjs/composition-api'
import MainFooter from "~/composables/ui/MainFooter.vue";
export default defineComponent({
  components: {MainFooter},
  setup() {

    const drawer = ref(false)
    const links = ref([{name: 'XRP-Explorer', to: '/xrp-explorer'}])
    return {links, drawer}
  },
})
</script>

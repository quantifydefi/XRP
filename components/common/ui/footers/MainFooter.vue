<template>
  <v-footer padless class="mt-10">
    <v-row no-gutters>
      <v-col class="pa-0">
        <v-card flat tile outlined class="text-center">
          <v-card-text>
            <v-row>
              <v-col class="pb-0 text-left d-sm-flex">
                <div v-for="link in footerLinks" :key="link.title">
                  <v-btn tile text small :to="link.url" color="#121212">
                    <span class="grey--text text--lighten-1">{{ link.title }}</span>
                  </v-btn>
                </div>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" sm="5" class="text-left pa-0">
                <div class="font-weight-medium grey--text py-2 pl-6 text-no-wrap">
                  &copy;
                  {{ new Date().getFullYear() }} - EVMX
                  <span class="caption pl-2"
                    >contact us at
                    <a
                      href="mailto:admin@quantifycrypto.net"
                      class="text-decoration-none grey--text font-weight-medium"
                    >
                      admin@quantifycrypto.net</a
                    ></span
                  >
                </div>
              </v-col>

              <v-col class="py-0 text-sm-right text-left order-first order-sm-last mt-sm-n5" cols="12" sm="7">
                <v-btn
                  v-for="icon in communityLinks"
                  :key="icon.title"
                  :href="icon.url"
                  target="_blank"
                  class="mx-1 grey--text text--lighten-1"
                  icon
                >
                  <v-icon size="24" :style="icon.title === 'Telegram' ? { transform: 'rotate(-36deg)' } : {}">
                    {{ icon.icon }}
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'
import { State } from '~/types/state'

export default defineComponent({
  name: 'MainFooter',
  setup() {
    const { state } = useStore<State>()
    const headerTextClass = computed(() => state.ui[state.ui.theme].headerTextClass)

    const footerLinks = [
      { title: 'Terms and Conditions', url: '/terms-and-conditions' },
      { title: 'Meet Our Team', url: '/team' },
    ]

    const communityLinks = [
      {
        title: 'Twitter',
        icon: 'mdi-twitter',
        url: 'https://twitter.com/EVMX_IO',
      },
      {
        title: 'Linkedin',
        icon: 'mdi-linkedin',
        url: 'https://www.linkedin.com/company/quantifycrypto',
      },
      {
        title: 'Telegram',
        icon: 'mdi-send',
        url: 'https://t.me/Quantify_Crypto',
      },
    ]

    return { footerLinks, communityLinks, headerTextClass }
  },
})
</script>

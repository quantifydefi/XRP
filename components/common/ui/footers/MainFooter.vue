<template>
  <v-footer padless class="mt-10 overflow-hidden">
    <v-row no-gutters>
      <v-col class="pa-0">
        <v-card flat tile outlined class="text-center">
          <v-card-text>
            <v-row>
              <v-col cols="8" class="text-left">
                <v-row>
                  <v-col class="pl-6 b-0 text-left d-sm-flex">
                    <div v-for="link in footerLinks" :key="link.title">
                      <v-btn tile text small :to="link.url" color="transparent">
                        <span class="white--text text-hover-primary">{{ link.title }}</span>
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>

                <div class="font-weight-medium grey--text py-2 pl-6">
                  &copy;
                  {{ new Date().getFullYear() }} - EVM Finance
                  <span class="caption pl-2">
                    contact us at
                    <a
                      href="mailto:admin@quantifycrypto.net"
                      class="text-decoration-none grey--text token-link font-weight-medium"
                    >
                      admin@quantifycrypto.net
                    </a>
                  </span>
                </div>
              </v-col>
              <v-col class="text-right" cols="4" align-self="end">
                <div class="mt-n13">
                  <v-btn
                    v-for="icon in communityLinks"
                    :key="icon.title"
                    :href="icon.url"
                    target="_blank"
                    class="mx-1 text-hover-primary"
                    icon
                    color="grey"
                  >
                    <v-icon size="24" :style="icon.title === 'Telegram' ? { transform: 'rotate(-36deg)' } : {}">
                      {{ icon.icon }}
                    </v-icon>
                  </v-btn>
                </div>
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

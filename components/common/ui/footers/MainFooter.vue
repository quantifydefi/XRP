<template>
  <v-footer absolute padless app>
    <v-row no-gutters>
      <v-col cols="12" class="pa-0">
        <v-card flat tile outlined class="text-center">
          <v-card-text class="white--text">
            <v-row>
              <v-col v-if="$vuetify.breakpoint.smAndUp" cols="2" sm="6" class="text-left pa-1">
                <v-btn tile text small to="/terms-and-conditions" color="#121212">
                  <span class="grey--text lighten-1">Terms And Conditions</span>
                </v-btn>

                <v-btn
                  v-for="icon in socialIcons"
                  :key="icon.title"
                  :href="icon.to"
                  target="_blank"
                  class="mx-3 grey--text text--lighten-1"
                  icon
                >
                  <v-icon size="20px" :style="icon.title === 'Telegram' ? { transform: 'rotate(-45deg)' } : {}">
                    {{ icon.icon }}
                  </v-icon>
                </v-btn>
              </v-col>

              <v-col class="text-sm-right pa-1" cols="12" sm="6">
                <div class="font-weight-medium grey--text lighten-1 mt-sm-2 mt-1 pr-2">&copy; 2022 - EVMX</div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MainFooter',
  setup() {
    const socialIcons = [
      {
        title: 'Facebook',
        icon: 'mdi-facebook',
        to: 'https://www.facebook.com/crypto.researcher/',
      },
      {
        title: 'Twitter',
        icon: 'mdi-twitter',
        to: 'https://twitter.com/EVMX_IO',
      },
      {
        title: 'Linkedin',
        icon: 'mdi-linkedin',
        to: 'https://www.linkedin.com/company/quantifycrypto',
      },
      {
        title: 'Telegram',
        icon: 'mdi-send',
        to: 'https://t.me/Quantify_Crypto',
      },
    ]

    return { socialIcons }
  },
})
</script>

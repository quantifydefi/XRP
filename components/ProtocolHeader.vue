<template>
  <v-row>
    <v-col lg="4" md="12" cols="12">
      <v-card tile outlined elevation="0" class="pa-4" height="100%">
        <v-row no-gutters align="center">
          <v-col cols="4" sm="2" md="1">
            <v-avatar size="30px"><v-img alt="Avatar" :src="protocolImage" :lazy-src="protocolImage" /></v-avatar>
          </v-col>
          <v-col>
            <h2 class="text-h4 font-weight-medium ml-3">
              {{ protocolName }}
              <span>
                <v-btn text small color="pink" tile>
                  <span class="text-h6 font-weight-medium" v-text="protocolSymbol" />
                </v-btn>
              </span>
            </h2>
          </v-col>
        </v-row>

        <v-row no-gutters class="mb-2">
          <client-only>
            <v-col cols="12" class="mt-2">
              <v-chip label small v-text="`Protocol`" />
              <v-chip label small v-text="'DeFi'" />
            </v-col>
          </client-only>
        </v-row>
      </v-card>
    </v-col>
    <v-col lg="8" md="12">
      <v-card tile outlined elevation="0" class="pa-4" height="100%">
        <v-row>
          <v-col>
            <v-row no-gutters>
              <v-col cols="10">
                <h1 class="headline" v-text="protocolPageTitle" />
              </v-col>
              <v-col class="text-right">
                <v-btn
                  width="20"
                  height="20"
                  class="mx-1 pa-0"
                  color="primary"
                  icon
                  target="_blank"
                  :href="`https://twitter.com/${protocolTwitter}`"
                >
                  <v-icon size="20">mdi-twitter</v-icon>
                </v-btn>

                <v-btn width="20" height="20" class="pa-0" color="primary" icon target="_blank" :href="protocolUrl">
                  <v-icon size="20">mdi-web</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col>
                <span class="grey--text text--lighten-1" v-text="protocolDescription" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

type Props = {
  name: string
  address: string
  symbol: string
  url: string
  twitter: string
  title: string
  description: string
}
export default defineComponent<Props>({
  props: {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    twitter: { type: String, required: true },
  },

  setup(props) {
    const protocolImage = computed(
      () =>
        `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${props.symbol.toLowerCase()}.png`
    )
    return {
      protocolName: props.name,
      protocolSymbol: props.symbol,
      protocolUrl: props.url,
      protocolPageTitle: props.title,
      protocolDescription: props.description,
      protocolTwitter: props.twitter,
      protocolImage,
    }
  },
})
</script>

<style scoped></style>

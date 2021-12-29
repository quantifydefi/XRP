<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col cols="11">
        <v-row>
          <!--          1st Column General Details-->
          <v-col>
            <v-card tile outlined elevation="0" class="pa-4" height="100%">
              <v-row no-gutters align="center">
                <v-col cols="4" sm="2" md="1">
                  <v-avatar size="30px">
                    <v-img
                      alt="Avatar"
                      src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/eth.png"
                    />
                  </v-avatar>
                </v-col>
                <v-col>
                  <h2 class="text-h4 font-weight-medium ml-1">
                    Ethereum
                    <span>
                      <v-btn text small color="pink" tile>
                        <span class="text-h6 font-weight-medium">ETH</span>
                      </v-btn>
                    </span>
                  </h2>
                </v-col>
              </v-row>

              <v-row no-gutters>
                <v-col cols="12" class="mt-2">
                  <v-chip label small style="height: 24px" color="grey darken-4" v-text="`Rank 2`" />
                  <v-chip label small class="mx-2" color="grey darken-4" style="height: 24px" v-text="`Token`" />
                  <v-chip label small color="grey darken-4" style="height: 24px" v-text="`2021-12-06T23:18:21.408Z`" />
                </v-col>
              </v-row>

              <v-row justify="center" no-gutters align="center" class="mt-4">
                <v-col cols="3"> <span :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Website:</span></v-col>
                <v-col>
                  <v-chip
                    v-for="item in homepage"
                    :key="item"
                    label
                    color="grey darken-4"
                    class="mr-1 mb-1"
                    v-text="item"
                  />
                </v-col>
              </v-row>

              <v-row justify="center" no-gutters align="center" class="mt-1">
                <v-col cols="3"> <span :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Source:</span></v-col>
                <v-col>
                  <v-chip label color="grey darken-4" class="mr-1 mb-1">
                    <v-icon size="20" left> mdi-github </v-icon>
                    GitHub
                  </v-chip>
                </v-col>
              </v-row>

              <v-row justify="center" no-gutters align="center" class="mt-1">
                <v-col cols="3">
                  <span :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Community:</span></v-col
                >
                <v-col>
                  <v-chip v-for="item in homepage" :key="item" label color="grey darken-4" class="mr-1 mb-1">
                    <v-icon size="20" left> mdi-facebook </v-icon>
                    {{ item }}
                  </v-chip>
                </v-col>
              </v-row>

              <v-row justify="center" no-gutters align="center" class="mt-1">
                <v-col cols="3"> <span :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Explorer:</span></v-col>
                <v-col>
                  <v-chip v-for="(i, item) in platforms" :key="i" label color="grey darken-4" class="mr-1 mb-1">
                    {{ item }}
                  </v-chip>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="8">
            <v-card tile outlined elevation="0" class="pa-4" height="100%">
              <v-row>
                <v-col>
                  <v-row no-gutters align="center">
                    <v-col>
                      <h2 class="text-h4 font-weight-medium ml-1">
                        $4,216.04
                        <span>
                          <v-btn small depressed color="green" tile class="px-2">
                            <v-icon>mdi-chevron-up</v-icon>
                            <span class="text-subtitle-1">2.35%</span>
                          </v-btn>
                        </span>
                      </h2>
                    </v-col>
                  </v-row>

                  <v-row no-gutters class="mt-2">
                    <v-col cols="12">
                      <span :class="[ui[theme].innerCardLighten, 'font-weight-medium']">
                        0.08581 <span class="">BTC</span>
                        <span class="green--text ml-4">
                          <v-icon color="green" class="mb-1" size="20">mdi-chevron-up</v-icon>
                          <span class="text-subtitle-1">50.35%</span>
                        </span>
                      </span>
                    </v-col>
                  </v-row>

                  <v-row no-gutters class="mt-2">
                    <v-col cols="3" class="text-truncate">
                      <span :class="ui[theme].innerCardLighten">Low:</span>
                      <span class="ml-1 font-weight-bold">$3,930.81</span>
                    </v-col>
                    <v-col>
                      <v-progress-linear
                        class="mt-2"
                        color="orange"
                        buffer-value="0"
                        height="5"
                        value="20"
                        stream
                      ></v-progress-linear>
                    </v-col>
                    <v-col cols="5" class="text-truncate">
                      <span :class="[ui[theme].innerCardLighten, 'ml-1']">High:</span>
                      <span class="ml-1 font-weight-bold"
                        >$3,930.81
                        <v-btn depressed x-small label class="mb-1 ml-1">24h</v-btn>
                      </span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">some buttons here</v-col>
              </v-row>

              <v-divider class="mt-6" />

              <v-row no-gutters class="mt-6">
                <v-col cols="3" class="px-1">
                  <v-row no-gutters>
                    <v-col :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Market Cap</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="text-h5">$518,032,214,528</v-col>
                  </v-row>
                </v-col>

                <v-col cols="3" class="px-1">
                  <v-row no-gutters>
                    <v-col :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Vol 24h</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="text-h5">$518,032,214,528</v-col>
                  </v-row>
                </v-col>

                <v-col cols="3" class="px-1">
                  <v-row no-gutters>
                    <v-col :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Circulating Supply</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="text-h5">$518,032,214,528</v-col>
                  </v-row>
                </v-col>

                <v-col cols="3" class="px-1">
                  <v-row no-gutters>
                    <v-col :class="[ui[theme].innerCardLighten, 'text-subtitle-1']">Max Supply</v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col class="text-h5">$518,032,214,528</v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
@Component({
  name: 'New',
  computed: {
    ...mapState({
      // TODO: Add models for UI types
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class New extends Vue {
  homepage = ['ethereum.org', 'ethereum2.org']
  community = ['ethereum.org', 'ethereum2.org']

  platforms = {
    '': '',
    avalanche: '0xf20d962a6c8f70c731bd838a3a388d7d48fa6e15',
    'binance-smart-chain': '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
    'huobi-token': '0x64ff637fb478863b7468bc97d30a5bf3a428a1fd',
    kardiachain: '0x1540020a94aa8bc189aa97639da213a4ca49d9a7',
    moonriver: '0x639a647fbe20b6c8ac19e48e2de44ea792c62c5c',
    sora: '0x0200070000000000000000000000000000000000000000000000000000000000 ',
    tomochain: '0x2eaa73bd0db20c64f53febea7b5f5e5bccc7fb8b',
  }
}
</script>

<style scoped></style>

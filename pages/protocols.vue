<template>
  <div>
    <v-row v-if="protocol" no-gutters justify="center">
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
                      :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${protocol.symbol.toLowerCase()}.png`"
                    />
                  </v-avatar>
                </v-col>
                <v-col>
                  <h2 class="text-h4 font-weight-medium ml-3">
                    {{ protocol.name }}
                    <span>
                      <v-btn text small color="pink" tile>
                        <span class="text-h6 font-weight-medium">{{ protocol.symbol }}</span>
                      </v-btn>
                    </span>
                  </h2>
                </v-col>
              </v-row>

              <v-row no-gutters class="mb-2">
                <v-col cols="12" class="mt-2">
                  <v-chip label small v-text="`Protocol`" />
                  <v-chip label small v-text="'DeFi'" />
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col lg="8" md="12">
            <v-card tile outlined elevation="0" class="pa-4" height="100%">
              <v-row>
                <v-col>
                  <v-row no-gutters>
                    <v-col><p class="font-weight-medium ml-1">Description:</p></v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col>
                      <p class="font-weight-medium ml-1 grey--text text--lighten-1">{{ protocol.description }}</p>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="3" class="text-right">
                  <v-btn
                    width="20"
                    height="20"
                    class="mx-1 pa-0"
                    color="primary"
                    icon
                    target="_blank"
                    :href="`https://twitter.com/${protocol.twitter}`"
                  >
                    <v-icon size="20">mdi-twitter</v-icon>
                  </v-btn>

                  <v-btn width="20" height="20" class="pa-0" color="primary" icon target="_blank" :href="protocol.url">
                    <v-icon size="20">mdi-web</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row v-if="protocol" justify="center">
      <v-col cols="11">
        <v-row justify="center">
          <v-col cols="12">
            <curve-pools v-if="currentProtocolId === '3'" />
            <aave-pool v-if="currentProtocolId === '111'" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { mapState } from 'vuex'
import { Protocols } from '~/models/protocols'
import BalancesGrid from '~/components/portfolio/grids/BalancesGrid.vue'
import CurvePools from '~/components/pools/curve.vue'
import AavePool from '~/components/pools/aave.vue'

@Component({
  name: 'Protocol',
  components: { AavePool, CurvePools, BalancesGrid },
  computed: {
    ...mapState({
      ui: (state: any) => state.ui,
      theme: (state: any) => state.ui.theme,
    }),
  },
  head(): object {
    const aaveMetaTags = () => {
      return {
        title: 'Aave Portal for Deposits, Staking and Loans| EVM Ethereum Virtual Machine',
        meta: [
          {
            name: 'description',
            hid: 'description',
            content: 'Easily Deposit, Borrow, Repay and Withdraw your DeFi assets with clarity and ease',
          },

          // Open Graph
          {
            name: 'og:title',
            content: 'Aave Portal for Deposits, Staking and Loans| EVM Ethereum Virtual Machine',
          },
          {
            name: 'og:description',
            content: 'Easily Deposit, Borrow, Repay and Withdraw your DeFi assets with clarity and ease',
          },
          { name: 'og:type', content: 'website' },
          { name: 'og:url', content: process.env.baseURL },
          {
            name: 'og:image',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXAaveProtocolPage.jpg',
          },

          // Twitter Card
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:site', content: '@Quantify_Crypto' },
          {
            name: 'twitter:title',
            content: 'Aave Portal for Deposits, Staking and Loans| EVM Ethereum Virtual Machine',
          },
          {
            name: 'twitter:description',
            content: 'Easily Deposit, Borrow, Repay and Withdraw your DeFi assets with clarity and ease',
          },
          {
            name: 'twitter:image',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXAaveProtocolPage.jpg',
          },
          {
            name: 'twitter:image:alt',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXAaveProtocolPage.jpg',
          },
        ],
      }
    }

    const curveMetaTags = () => {
      return {
        title: 'Curve Portal for Staking | EVM Ethereum Virtual Machine',
        meta: [
          {
            name: 'description',
            hid: 'description',
            content: 'Manage your Liquidity Pools with clarity and ease',
          },

          // Open Graph
          {
            name: 'og:title',
            content: 'Curve Portal for Staking | EVM Ethereum Virtual Machine',
          },
          {
            name: 'og:description',
            content: 'Manage your Liquidity Pools with clarity and ease',
          },
          { name: 'og:type', content: 'website' },
          { name: 'og:url', content: process.env.baseURL },
          {
            name: 'og:image',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXCurveProtocolPage.jpg',
          },

          // Twitter Card
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:site', content: '@Quantify_Crypto' },
          {
            name: 'twitter:title',
            content: 'Curve Portal for Staking | EVM Ethereum Virtual Machine',
          },
          {
            name: 'twitter:description',
            content: 'Manage your Liquidity Pools with clarity and ease',
          },
          {
            name: 'twitter:image',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXCurveProtocolPage.jpg',
          },
          {
            name: 'twitter:image:alt',
            content: 'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/website-img/EVMXCurveProtocolPage.jpg',
          },
        ],
      }
    }
    // Curve Protocol
    if (this.$route.query.protocol === '3') {
      return curveMetaTags()
      // Aave Protocol
    } else if (this.$route.query.protocol === '111') {
      return aaveMetaTags()
    } else {
      return []
    }
  },
})
export default class Protocol extends mixins(Protocols) {}
</script>

<template>
  <v-navigation-drawer
    app
    left
    permanent
    :color="$vuetify.theme.themes[theme].appBg"
    :mini-variant.sync="mini"
  >
    <v-list-item class="px-2 pt-1 pb-2">
      <div style="cursor: pointer" class="d-flex" @click="$router.push('/app')">
        <v-list-item-avatar>
          <v-img :src="'/img/logo/logo.svg'"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="text-h6 font-weight-regular ml-n1"
          >Defi App
          <small class="grey--text text--lighten-1 text-caption"
            >Beta</small
          ></v-list-item-title
        >
      </div>
      <v-spacer />
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-double-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-row v-if="defiApp" no-gutters>
      <client-only>
        <v-list dense>
          <v-list-item-group color="primary" style="width: 255px">
            <v-list-item exact to="/app">
              <v-list-item-icon>
                <v-icon>mdi-apps</v-icon>
              </v-list-item-icon>

              <v-list-item-title class="subtitle-1 font-weight-regular">
                Dashboard</v-list-item-title
              >
            </v-list-item>

            <v-list-item
              exact
              :to="`/app/${defiApp.configs.networks.defaultNetwork.chainId}/transactions`"
            >
              <v-list-item-icon>
                <v-icon>mdi-table-clock</v-icon>
              </v-list-item-icon>

              <v-list-item-title class="subtitle-1 font-weight-regular"
                >Transactions</v-list-item-title
              >
            </v-list-item>
          </v-list-item-group>

          <v-list-group
            v-if="
              defiApp.configs.networks.defaultNetwork.chainId === 1 ||
              defiApp.configs.networks.defaultNetwork.chainId === 137
            "
            :value="true"
            no-action
            color="primary"
            style="width: 255px"
          >
            <template #prependIcon>
              <v-list-item-icon class="mt-0">
                <v-icon :color="$vuetify.theme.themes[theme].baseText"
                  >mdi-lan</v-icon
                >
              </v-list-item-icon>
            </template>
            <template #appendIcon>
              <v-list-item-icon class="mt-0 mr-0">
                <v-icon :color="$vuetify.theme.themes[theme].baseText"
                  >mdi-chevron-down</v-icon
                >
              </v-list-item-icon>
            </template>
            <template #activator>
              <v-list-item-title
                :style="{ color: $vuetify.theme.themes[theme].baseText }"
                class="subtitle-1 font-weight-regular"
                >Protocols</v-list-item-title
              >
            </template>

            <v-list-item
              exact
              :to="`/app/${defiApp.configs.networks.defaultNetwork.chainId}/aave`"
              class="ml-n6"
            >
              <v-list-item-icon>
                <v-avatar size="24">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png`"
                  />
                </v-avatar>
              </v-list-item-icon>
              <v-list-item-title class="subtitle-1 font-weight-regular"
                >Aave</v-list-item-title
              >
            </v-list-item>
          </v-list-group>

          <!--          <v-list-group-->
          <!--            no-action-->
          <!--            prepend-icon="mdi-notebook-edit"-->
          <!--            color="primary"-->
          <!--          >-->
          <!--            <template #activator>-->
          <!--              <v-list-item-content>-->
          <!--                <v-list-item-title>Balance</v-list-item-title>-->
          <!--              </v-list-item-content>-->
          <!--            </template>-->
          <!--            <v-list-item exact to="/balances/aave" class="ml-n8">-->
          <!--              <v-list-item-icon>-->
          <!--                <v-avatar size="24">-->
          <!--                  <img-->
          <!--                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/aave.png`"-->
          <!--                  />-->
          <!--                </v-avatar>-->
          <!--              </v-list-item-icon>-->
          <!--              <v-list-item-title>Aave</v-list-item-title>-->
          <!--            </v-list-item>-->
          <!--          </v-list-group>-->
        </v-list>
      </client-only>
      <div style="position: fixed; bottom: 5px; width: 100%">
        <v-divider></v-divider>
        <v-menu offset-y top tile nudge-right="57px">
          <template #activator="{ on, attrs }">
            <v-btn
              class="subtitle-1 text-capitalize justify-start elevation-0"
              style="border: 0"
              outlined
              color="primary"
              tile
              block
              dark
              v-bind="attrs"
              large
              v-on="on"
            >
              <v-row
                no-gutters
                :style="{ color: $vuetify.theme.themes[theme].baseText }"
              >
                <v-avatar size="26" class="mr-4 ml-n1">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${defiApp.configs.networks.defaultNetwork.icon}.png`"
                /></v-avatar>

                <span class="mt-1 d-flex">
                  {{ defiApp.configs.networks.defaultNetwork.networkName }}
                  <v-spacer />
                  <v-icon class="mt-n1 ml-8">mdi-chevron-right</v-icon>
                </span>
              </v-row>
            </v-btn>
          </template>
          <v-list
            outlined
            :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
          >
            <v-list-item
              v-for="item in defiApp.configs.networks.networkOptions"
              :key="item.chainId"
              :style="{ backgroundColor: $vuetify.theme.themes[theme].appBg }"
              @click="changeNetwork(item)"
            >
              <v-list-item-title>
                <v-avatar size="22" class="mr-2">
                  <img
                    :src="`https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${item.icon}.png`"
                /></v-avatar>
                {{ item.networkName }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { mixins } from 'vue-class-component'
import MetamaskMixin from '~/mixins/MetamaskMixin.vue'
import { DefiApp } from '~/models/app'
import { ChainOptions } from '~/types/balance'

@Component({
  name: 'LeftSideBar',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class LeftSideBar extends mixins(MetamaskMixin) {
  mini = false

  defiApp: DefiApp | null = null

  mounted() {
    this.defiApp = new DefiApp()
  }

  /** On network change, redirect page to selected network. **/
  changeNetwork(network: {
    networkName: string
    chainId: ChainOptions
    icon: string
  }) {
    if (this.defiApp) {
      this.defiApp.configs.networks.defaultNetwork = network

      if (this.$route.name !== 'app') {
        const path = this.$route.path.split('/')
        path[2] = network.chainId.toString()

        this.$router.push(path.join('/'))
      }
    }
  }
}
</script>

<style lang="scss">
#dashboard-expansion {
  .v-expansion-panel-content__wrap {
    padding-left: 12px !important;
  }
}
</style>

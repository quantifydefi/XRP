<template>
  <v-row no-gutters justify="center">

    <v-col cols="12" style="z-index: 1">
      <v-row justify="center" class="text-center">
        <v-col cols="12" class="mt-6">
          <h1 class="text-h2 font-weight-regular">
            EVM Finance <br />
            <span class="text-h4 font-weight-light mt-3 grey--text"> Unified Interface for Decentralized Finance </span>
          </h1>
        </v-col>

        <v-col cols="12">
          <client-only>
            <vue-typer
              class="v-heading text-h4 font-weight-light"
              :text="animatedFeatures"
              :repeat="Infinity"
              :shuffle="false"
              initial-action="typing"
              :pre-type-delay="70"
              :type-delay="100"
              :pre-erase-delay="2000"
              :erase-delay="250"
              erase-style="clear"
              :erase-on-complete="false"
              caret-animation="smooth"
            ></vue-typer>
          </client-only>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="11" xl="7" lg="10" class="text-center mt-16 pt-16" style="z-index: 1">
      <v-row>
        <v-col cols="12" class="justify-center">
          <v-row justify="center">
            <v-col v-for="item in items" :key="item.header" cols="12" sm="6" md="4">
              <outline-glow>
                <v-avatar size="40" class="mt-5">
                  <v-icon size="30" color="primary">{{ item.icon }}</v-icon>
                </v-avatar>

                <p class="text-h5 pt-5 px-5" v-text="item.header" />
                <p class="pt-5 px-5 grey--text" v-text="item.desc" />
              </outline-glow>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {  defineComponent, ref } from '@nuxtjs/composition-api'

import OutlineGlow from "~/components/ui/OutlineGlow.vue";
// import DefiNodeTree from '~/components/common/DefiNodeTree.vue'

export default defineComponent({
  components: {OutlineGlow },

  setup() {
    // STATE
    const items = ref([
      {
        color: 'primary lighten-2',
        icon: 'mdi-tablet-dashboard',
        header: 'XRP Ledger Explorer',
        desc: '',
      },
      {
        color: 'red lighten-2',
        icon: 'mdi-wallet-outline',
        header: 'XRP Ledger Details',
        desc: '',
      },

    ])
    const animatedFeatures = ref([
      'Token Pages',
      'Multi Chain Balances Advanced Analytics',
      'Self-Custody',
      'Portfolio Management',
      'Strategic Investments',
    ])


    return { items, animatedFeatures }
  },
  head: {},
})
</script>

<style lang="scss">
.vue-typer .custom.char.typed {
  color: #e91e63ff;
  align-items: center;
}

.vue-typer .custom.caret {
  animation: rocking 1s ease-in-out 0s infinite;
}

.vue-typer .custom.caret {
  width: 5px;
  background-color: #e91e63ff;
  margin-right: 50px;
}
</style>

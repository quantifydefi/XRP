<template>
  <v-row>
    <v-col>
      <v-form ref="form">
        <v-text-field hide-details outlined color="pink" style="background: #121212" dense class="rounded-0 text-right">
          <template #append>
            <v-row class="ml-0 my-0 mr-1">
              <v-divider class="mx-3" vertical></v-divider>
              <div class="text-no-wrap">
                <v-avatar size="22" class="mt-n1">
                  <v-img
                    alt="USDC"
                    src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/usdc.png"
                  />
                </v-avatar>
                <span class="ml-2 mr-1 subtitle-1 font-weight-medium grey--text text--lighten-1" v-text="`USDC`" />
                <v-btn icon x-small class="mt-n1" @click="$emit('toggle-token-menu-dialog')">
                  <v-icon size="22" color="grey lighten-1">mdi-chevron-down</v-icon>
                </v-btn>
              </div>
            </v-row>
          </template>
        </v-text-field>

        <v-row class="pt-2 px-1 grey--text text--lighten-1 caption">
          <v-col v-text="`Balance: 1000`" />
          <v-col class="text-right">
            <span class="font-weight-medium" v-text="`$ 191.095 (~0.816% )`" />
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {},
})
</script>

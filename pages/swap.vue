<template>
  <v-row no-gutters style="margin-top: 60px" justify="center">
    <v-card outlined tile width="440">
      <v-card-title class="subtitle-1 font-weight-medium py-3">
        Swap <v-spacer />
        <v-btn height="24" width="24" fab><v-icon size="20">mdi-cog</v-icon> </v-btn>
      </v-card-title>

      <v-row no-gutters justify="center" class="pa-2">
        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="px-3">
              <token-input-field @toggle-token-menu-dialog="onToggleTokenMenu"></token-input-field>
            </v-col>
          </v-row>
        </v-col>

        <token-menu-dialog :is-visible="dialog" @close-dialog="onToggleTokenMenu" />

        <v-btn class="mt-n4 mb-3" fab small><v-icon size="28"> mdi-swap-horizontal-variant</v-icon></v-btn>

        <v-col cols="12">
          <v-row no-gutters>
            <v-col class="px-3">
              <token-input-field @toggle-token-menu-dialog="onToggleTokenMenu"></token-input-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12">
          <v-row class="pa-3 caption font-weight-medium">
            <v-col cols="12">
              <v-card tile outlined class="mt-2">
                <div class="d-flex pa-2">
                  1 USDC = 0.000811 ETH <span class="grey--text text--lighten-1 ml-2">($ 1.0000)</span> <v-spacer />
                  <div v-if="!expand" class="pr-2">
                    <v-icon color="grey lighten-1" size="17">mdi-gas-station</v-icon>
                    <span class="grey--text text--lighten-1">$2.16</span>
                  </div>
                  <v-btn color="grey lighten-1" height="22" width="22" icon @click="expand = !expand">
                    <v-icon size="22">mdi-chevron-{{ expand ? 'up' : 'down' }}</v-icon>
                  </v-btn>
                </div>

                <v-simple-table v-if="expand" dense>
                  <template #default>
                    <tbody>
                      <tr>
                        <td class="caption grey--text text--lighten-1">Expected Output</td>
                        <td class="caption text-right">191.095 USDC</td>
                      </tr>
                      <tr>
                        <td class="caption grey--text text--lighten-1">Price Impact</td>
                        <td class="caption text-right">~ 0.01%</td>
                      </tr>
                      <tr>
                        <td class="caption grey--text text--lighten-1">Min received after slippage (0.50%)</td>
                        <td class="caption text-right">190.145 UNI</td>
                      </tr>
                      <tr>
                        <td class="caption grey--text text--lighten-1">Network Fee</td>
                        <td class="caption text-right">~ $ 2.16</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="12" class="pa-3 pt-2">
          <v-btn tile block color="primary">Swap</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import TokenInputField from '~/components/trading/TokenInputField.vue'
import TokenMenuDialog from '~/components/trading/TokenMenuDialog.vue'

export default defineComponent({
  name: 'Swap',
  components: { TokenMenuDialog, TokenInputField },
  layout: 'trade',
  setup() {
    const dialog = ref(false)
    const expand = ref(false)

    function onToggleTokenMenu() {
      dialog.value = !dialog.value
    }

    return { dialog, expand, onToggleTokenMenu }
  },
})
</script>

<template>
  <div id="deposit-modal" class="text-center">
    <v-dialog v-model="dialog" width="460" persistent>
      <v-card
        elevation="16"
        tile
        min-height="220"
        :style="{
          backgroundColor: $vuetify.theme.themes[theme].overlay,
        }"
      >
        <v-card-title class="subtitle-1 font-weight-medium mb-3">
          Lend
          <v-spacer />
          <v-btn icon x-small @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-row v-if="data" justify="center">
          <v-card
            shaped
            height="90"
            width="88%"
            outlined
            :color="$vuetify.theme.themes[theme].innerCard"
          >
            <v-row class="ma-0">
              <v-col cols="4">
                <v-chip
                  rounded
                  :outlined="$vuetify.theme.dark"
                  :color="$vuetify.theme.dark ? 'grey darken-2 ' : 'white'"
                >
                  <v-avatar class="mx-n2">
                    <img
                      alt="aave logo"
                      :src="data.logo_url"
                      @error="balances.altImage($event)"
                    />
                  </v-avatar>
                  <span
                    class="ml-4"
                    :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
                    >{{ data.asset_contract_ticker_symbol }}</span
                  >
                </v-chip>
              </v-col>

              <v-col cols="8" class="mt-n3 text-right">
                <input
                  v-model="lendInput"
                  style="
                    font-family: Consolas, Monaco, monospace !important;
                    width: 200px;
                    text-align: right;
                  "
                  class="text-h5 ma-4 trade-font"
                  :class="$vuetify.theme.dark ? 'white--text ' : ''"
                  placeholder="0.0"
                  autocomplete="off"
                  maxlength="14"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                />
              </v-col>

              <v-col
                class="d-flex"
                cols="12"
                style="z-index: 2; margin-top: -35px"
              >
                <span
                  :style="{ color: $vuetify.theme.themes[theme].baseText }"
                  class="ml-2 subtitle-2 font-weight-regular"
                  >Available Balance:
                  <span
                    style="font-family: Consolas, Monaco, monospace !important"
                  >
                    {{
                      data.available_balance > 0
                        ? data.available_balance.toFixed(4)
                        : data.available_balance
                    }}
                  </span>
                </span>
                <v-spacer />
                <span
                  v-if="
                    data.available_balance > 0 &&
                    data.available_balance > lendInput
                  "
                  style="cursor: pointer"
                  class="
                    mr-4
                    subtitle-2
                    font-weight-regular
                    primary--text
                    text--lighten-1
                  "
                  @click="lendInput = data.available_balance"
                  >set max</span
                >
                <span
                  v-if="lendInput * data.quote_rate > 0"
                  class="mr-3 subtitle-2 font-weight-regular"
                  :style="{
                    fontFamily: 'Consolas, Monaco, monospace !important',
                    color: $vuetify.theme.themes[theme].baseText,
                  }"
                >
                  ~{{ (lendInput * data.quote_rate).toFixed(4) }}
                  <small>USD</small></span
                >
              </v-col>
            </v-row>
          </v-card>

          <v-btn
            width="88%"
            elevation="0"
            outlined
            color="grey darken-2"
            class="
              mt-2
              text-capitalize
              title
              font-weight-regular
              rounded-tl-xl rounded-br-xl
            "
            x-large
            @click="lend"
          >
            <span
              :style="{
                color: $vuetify.theme.themes[theme].baseText,
              }"
            >
              Lend
            </span>
          </v-btn>
        </v-row>

        <!--        <v-card-text v-if="data" class="mt-3">-->
        <!--          {{ data }}-->
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { BalanceData, Balance } from '~/models/balance'
import { DefiEvents } from '~/types/events'

@Component({
  name: 'LendModal',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class LendModal extends Vue {
  dialog = false
  data: BalanceData | null = null
  balances: Balance | null = null

  lendInput: number | null = null

  /** on modal close, clear lend input field **/
  closeDialog() {
    this.dialog = false
    this.lendInput = null
  }

  lend() {
    console.log(this.lendInput)
  }

  mounted() {
    this.balances = Balance.getInstance(this.$store)

    this.$root.$on(DefiEvents.toggleLendModal, (data: any) => {
      console.log('received lend event', data)
      this.dialog = !this.dialog
      this.data = data
    })
  }
}
</script>

<template>
  <div id="deposit-modal" class="text-center">
    <v-dialog v-model="dialog" width="460" persistent>
      <v-card
        outlined
        height="400"
        :style="{
          backgroundColor: $vuetify.theme.themes[theme].overlay,
        }"
      >
        <v-card-title class="font-weight-medium mb-3">
          Borrow
          <v-spacer />
          <v-btn icon x-small @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-row v-if="data" justify="center">
          <v-card
            width="88%"
            height="74"
            :style="{
              border: `1px solid ${$vuetify.theme.themes[theme].outline}`,
            }"
            :color="$vuetify.theme.themes[theme].innerCard"
          >
            <v-row class="ma-0">
              <v-col cols="4">
                <v-chip
                  class="rounded"
                  :outlined="$vuetify.theme.dark"
                  :color="$vuetify.theme.dark ? 'grey darken-2 ' : 'white'"
                >
                  <v-avatar class="mx-n1">
                    <img
                      alt="aave logo"
                      :src="data.logo_url || data.underlying.logo_url"
                      @error="balances.altImage($event)"
                    />
                  </v-avatar>
                  <span
                    class="ml-3"
                    :class="$vuetify.theme.dark ? 'white--text' : 'black--text'"
                    >{{ data.underlying.contract_symbol }}</span
                  >
                </v-chip>
              </v-col>

              <v-col cols="8" class="mt-n3 text-right">
                <input
                  v-model="borrowInput"
                  style="
                    font-family: Consolas, Monaco, monospace !important;
                    width: 200px;
                    text-align: right;
                  "
                  class="text-h5 mt-3 mr-1 trade-font"
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
                <div class="caption ml-1 mt-4 mb-1">
                  Available:
                  {{ data.supply_position.balance }}
                </div>
                <v-spacer />

                <span
                  v-if="borrowInput * data.underlying.quote_rate > 0"
                  class="mr-1 mt-4 caption"
                  :style="{
                    fontFamily: 'Consolas, Monaco, monospace !important',
                    color: $vuetify.theme.themes[theme].baseText,
                  }"
                >
                  ~{{ (borrowInput * data.underlying.quote_rate).toFixed(4) }}
                  <small>USD</small></span
                >
                <span
                  v-if="
                    data.supply_position.balance > 0 &&
                    data.supply_position.balance > borrowInput
                  "
                  style="cursor: pointer"
                  class="
                    mr-1
                    caption
                    font-weight-regular
                    primary--text
                    text--lighten-1
                    mt-4
                  "
                  @click="borrowInput = data.supply_position.balance"
                  >set max</span
                >
              </v-col>
            </v-row>
          </v-card>

          <v-col cols="10" class="text-center pt-4">
            <!--            <v-row justify="center">-->
            <!--              <v-col cols="10">-->
            <!--                <v-slider-->
            <!--                  v-if="data.available_balance > 0"-->
            <!--                  v-model="borrowInput"-->
            <!--                  class="mt-2"-->
            <!--                  dense-->
            <!--                  :max="data.available_balance"-->
            <!--                  min="0"-->
            <!--                ></v-slider>-->
            <!--              </v-col>-->
            <!--            </v-row>-->

            <v-btn class="mx-1" small outlined color="grey lighten-1" width="80"
              >25%
            </v-btn>
            <v-btn class="mx-1" small outlined color="grey lighten-1" width="80"
              >50%
            </v-btn>
            <v-btn class="mx-1" small outlined color="grey lighten-1" width="80"
              >75%
            </v-btn>
            <v-btn class="mx-1" small outlined color="grey lighten-1" width="80"
              >100%
            </v-btn>
          </v-col>
        </v-row>
        <v-card-actions class="justify-center">
          <v-btn
            elevation="0"
            outlined
            width="50%"
            color="grey darken-3"
            class="my-4 subtitle-1 text-capitalize title"
            @click="borrow"
          >
            <span
              :style="{
                color: $vuetify.theme.themes[theme].baseText,
              }"
            >
              Borrow
            </span>
          </v-btn>
        </v-card-actions>
        <!--        <v-card-text v-if="data" class="mt-3">-->
        <!--          {{ data }}-->
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Balance } from '~/models/balance'
import { DefiEvents } from '~/types/events'

@Component({
  name: 'BorrowModal',
  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
      address: (state: any) => state.wallet.address,
    }),
  },
})
export default class BorrowModal extends Vue {
  dialog = false
  data: any = null
  balances: Balance | null = null

  borrowInput: number | null = null

  /** on modal close, clear borrow input field **/
  closeDialog() {
    this.dialog = false
    this.borrowInput = null
  }

  borrow() {
    console.log(this.borrowInput)
  }

  DoubleToIEEE(f: any) {
    const buf = new ArrayBuffer(8)
    const float = new Float64Array(buf)
    const uint = new Uint32Array(buf)
    float[0] = f
    return uint
  }

  mounted() {
    this.balances = Balance.getInstance(this.$store)

    this.$root.$on(DefiEvents.toggleBorrowModal, (data: any) => {
      console.log('received borrow event', data)
      this.dialog = !this.dialog
      this.data = data
    })
  }
}
</script>

<template>
  <v-row no-gutters>
    <v-col>
      <v-card elevation="16" width="400" height="600" class="rounded-lg" :color="$vuetify.theme.themes[theme].bgAccent">
        <v-card-title class="ma-2 pa-2">
          Trade
          <v-spacer />
          <v-btn icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-row justify="center">
          <v-card
            elevation="16"
            class="rounded-xl"
            height="530"
            width="88%"
            :color="$vuetify.theme.themes[theme].background"
          >
            <v-row justify="center">
              <v-card class="rounded-xl mt-7" height="100" width="88%" :color="$vuetify.theme.themes[theme].bgAccent">
                <v-row>
                  <v-col cols="4" class="pl-6 pt-6">
                    <v-btn
                      class="rounded-xl"
                      :outlined="$vuetify.theme.dark"
                      :color="$vuetify.theme.dark ? 'grey darken-2 ' : 'white'"
                    >
                      <v-avatar class="mx-n1" size="20">
                        <img
                          alt="aave logo"
                          src="https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/eth.png"
                        />
                      </v-avatar>
                      <span class="ml-3" :class="$vuetify.theme.dark ? 'white--text' : 'black--text'">ETH</span>
                      <v-icon class="ml-2 mr-n2" :color="$vuetify.theme.themes[theme].baseText"
                        >mdi-chevron-down
                      </v-icon>
                    </v-btn>
                  </v-col>

                  <v-col cols="8" class="ml-n3 text-right">
                    <input
                      v-model="tradeInput"
                      style="font-family: Consolas, Monaco, monospace !important; width: 200px; text-align: right"
                      class="text-h5 mt-3 mr-1 trade-font"
                      :class="$vuetify.theme.dark ? 'white--text ' : ''"
                      placeholder="0.0"
                      autocomplete="off"
                      maxlength="14"
                      oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
            <v-row justify="center" class="mt-6">
              <v-card
                outlined
                elevation="16"
                class="rounded-xl"
                height="390"
                width="88%"
                :color="$vuetify.theme.themes[theme].bgAccent"
              >
                <div>
                  Test
                  <v-divider />
                </div>
              </v-card>
            </v-row>
          </v-card>
        </v-row>
      </v-card>
    </v-col>

    <v-col>
      <div class="text-center">
        <v-card width="360">
          <v-card-title class="subtitle-1 pa-3">
            Select Token
            <v-spacer />
            <v-icon>mdi-close</v-icon>
          </v-card-title>

          <v-row justify="center" no-gutters>
            <v-col cols="11">
              <v-text-field
                v-model="tokenAddressSearch"
                rounded
                dense
                outlined
                solo
                clearable
                label="Search or paste token address"
              >
                <template #append>
                  <v-fade-transition leave-absolute>
                    <v-progress-circular v-if="loading" size="24" indeterminate></v-progress-circular>
                    <v-icon v-else-if="!loading && isValidAddress" color="success">mdi-check-circle-outline </v-icon>
                    <v-icon v-else-if="!loading && isValidAddress === false" color="red accent"
                      >mdi-close-circle-outline
                    </v-icon>
                  </v-fade-transition>
                </template>
              </v-text-field>
            </v-col>
          </v-row>

          <v-divider />
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color=" primary
          "
              text
              @click="dialog = false"
            >
              I accept
            </v-btn>
          </v-card-actions>
        </v-card>
        <!--        </v-dialog>-->
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { mapState } from 'vuex'
import web3 from 'web3'

@Component({
  name: 'TradingWidget',

  computed: {
    ...mapState({
      theme: (state: any) => state.ui.theme,
    }),
  },
})
export default class Terminal extends Vue {
  loading = false
  dialog = true
  tokenAddressSearch = ''
  searchTimeout: any = null
  isValidAddress: any = null
  tradeInput: number | null = null

  closeDialog() {
    this.dialog = false
  }

  /** Checks if address is a valid ethereum or smart contract address **/
  @Watch('tokenAddressSearch')
  tokenTokenAddressSearchChange(newValue: string) {
    if (!newValue || newValue.length < 2) {
      this.isValidAddress = null
      return
    }

    clearTimeout(this.searchTimeout)
    this.loading = true

    this.searchTimeout = setTimeout(() => {
      this.isValidAddress = web3.utils.isAddress(this.tokenAddressSearch)
      this.loading = false
    }, 1500)
  }
}
</script>

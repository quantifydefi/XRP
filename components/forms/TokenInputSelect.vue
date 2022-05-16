<template>
  <client-only>
    <div id="input-select">
      <!-- Input Field -->
      <v-text-field
        v-if="Object.values(selectedToken).length > 0"
        v-model="amount"
        hide-details
        color="pink"
        clearable
        outlined
        class="rounded-0"
        dense
        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');"
      >
        <template #prepend-inner>
          <v-row class="ml-0 my-0 mr-1">
            <div class="d-flex text-no-wrap">
              <v-avatar size="22">
                <v-img :alt="`${selectedToken.symbol} logo`" :src="selectedToken.logoURI"> </v-img>
              </v-avatar>

              <div class="my-1 ml-2 mr-1" :class="ui[theme].headerTextClass">{{ selectedToken.symbol }}</div>
              <!-- <v-btn icon x-small><v-icon @click="toggleTokenMenu">mdi-chevron-down</v-icon></v-btn> -->

              <!-- Token Menu Select -->
              <v-dialog v-model="dialog" hide-overlay width="360">
                <template #activator="{ on, attrs }">
                  <v-btn icon x-small v-bind="attrs" elevation="0" v-on="on">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-btn>
                </template>

                <v-card tile outlined elevation="0">
                  <v-card-title class="subtitle-1 pa-3">
                    Select Token
                    <v-spacer />
                    <v-btn icon @click="dialog = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
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
                            <v-icon
                              v-else-if="!loading && tokenAddressSearch.length > 2 && isValidAddress"
                              color="success"
                              >mdi-check-circle-outline</v-icon
                            >
                            <v-icon
                              v-else-if="!loading && tokenAddressSearch.length > 2 && isValidAddress === false"
                              color="red accent"
                              >mdi-close-circle-outline
                            </v-icon>
                          </v-fade-transition>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>

                  <v-divider />
                  <v-list class="text-left overflow-y-auto" max-height="340">
                    <v-list-item v-for="(item, i) in list" :key="i" @click="onTokenSelect(item)">
                      <v-row no-gutters class="py-1">
                        <v-col cols="2">
                          <v-list-item-title class="subtitle-2 font-weight-regular">
                            <v-avatar size="28" class="mt-2">
                              <img :src="item.logoURI" />
                            </v-avatar>
                          </v-list-item-title>
                        </v-col>
                        <v-col cols="7" class="ml-n3">
                          <div class="subtitle-1 font-weight-medium">
                            {{ item.name }}
                          </div>
                          <div class="mt-n1 subtitle-2 font-weight-regular">
                            {{ item.symbol.toUpperCase() }}
                          </div>
                        </v-col>
                        <v-col class="text-right">
                          <div class="mt-2 number-font">—</div>
                        </v-col>
                      </v-row>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-dialog>

              <v-divider class="mx-2" vertical />
            </div>
          </v-row>
        </template>
      </v-text-field>
    </div>
  </client-only>
</template>

<script lang="ts">
import { defineComponent, useStore, ref, computed, watch, PropType, toRef, toRefs } from '@nuxtjs/composition-api'
import { ethers } from 'ethers'
import { EmitEvents } from '~/types/events'
import { TokenSelectInterface, TokenListInterface } from '~/types/token'
import { State, ThemeOptions, UiState } from '~/types/state'

export default defineComponent({
  name: 'TokenInputSelect',
  props: {
    tokenList: {
      type: Array as PropType<TokenListInterface[]>,
      default: () => [] as TokenListInterface[],
    },
    tokenSelected: {
      type: Object as PropType<TokenSelectInterface>,
      default: () => ({
        chainId: 1,
        address: '',
        name: '',
        symbol: '',
        decimals: 0,
        logoURI: '',
      }),
    },
  },
  setup(props, { emit }) {
    // COMPOSABLES
    const { state } = useStore<State>()

    // STATE
    const loading = ref(false)
    const dialog = ref(false)
    const amount = ref<string>('')
    const tokenAddressSearch = ref<string>('')

    const selectedToken = toRefs(props).tokenSelected

    const list = toRef(props, 'tokenList')

    // COMPUTED
    const ui = computed<UiState>(() => state.ui)
    const theme = computed<ThemeOptions>(() => state.ui.theme)
    const isValidAddress = computed<boolean>(() => {
      loading.value = true
      const valid = ethers.utils.isAddress(tokenAddressSearch.value)
      loading.value = false
      if (tokenAddressSearch.value.length > 2 && valid) {
        return true
      }

      return false
    })

    // WATCH
    watch(amount, (newVal) => {
      emit(EmitEvents.onValueChanged, newVal)
    })

    // METHODS
    function onTokenSelect(token: TokenSelectInterface) {
      emit(EmitEvents.onTokenSelectChange, token)
      dialog.value = false
    }

    return {
      ui,
      theme,
      loading,
      dialog,
      amount,
      list,
      tokenAddressSearch,
      isValidAddress,
      selectedToken,

      // Methods
      onTokenSelect,
    }
  },
})
</script>

<style lang="scss" scoped>
#input-select .v-text-field.v-text-field--enclosed .v-text-field__details,
.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
  margin: 0;
  max-height: 34px;
  font-size: 13px !important;
  min-height: 32px !important;
  display: flex !important;
  align-items: center !important;
}
</style>

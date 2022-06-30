<template>
  <v-row justify="center" class="overflow-auto my-0 mx-n4" style="max-height: 625px">
    <v-col cols="11">
      <div v-for="log in logEventsData" :key="log.txHash + '_' + log.logOffset" class="pb-3">
        <!--    function signature name -->
        <div class="subtitle-2 pink--text" v-text="log.decoded.name.replace(/([A-Z])/g, ' $1').trim()" />

        <v-row no-gutters class="grey--text text--lighten-1">
          <div v-for="(param, i) in Object.values(log.decoded.params)" :key="i">
            <div class="pr-5">
              <!--      LABEL        -->
              <label class="white--text text-capitalize text-caption" v-text="`${param.name.replace('_', '')}:`" />

              <!--     VALUES         -->
              <div v-if="log.decoded.name === 'Approval'" class="pr-10 caption">
                <div
                  v-if="param.type === 'address'"
                  class="cursor-pointer"
                  @click="navigateToExplorer(param.value)"
                  v-text="$truncateAddress(param.value, 8, 10)"
                />
                <div v-else v-text="approvalRenderer(param.value)"></div>
              </div>

              <!--      format value       -->
              <div
                v-else-if="(param.type.startsWith('uint') && param.name === 'value') || param.name === 'wad'"
                class="pr-10"
                v-text="$f(+param.value / 10 ** log.senderContractDecimals, { minDigits: 0, maxDigits: 6 })"
              />

              <!--      address format        -->
              <div
                v-else-if="param.type === 'address' || param.name === 'functionSignature' || param.name === 'owner'"
                class="pr-10 cursor-pointer"
                @click="navigateToExplorer(param.value)"
                v-text="$truncateAddress(param.value, 8, 10)"
              />

              <div v-else class="pr-10" v-text="param.value.substring(0, 300)" />
            </div>
          </div>

          <!--    Token      -->
          <v-row v-if="log.senderName && log.decoded.params.length > 0" no-gutters class="ml-n12 mt-5">
            <v-avatar size="16" style="margin-top: 2px">
              <img
                :src="$imageUrlBySymbol(log.senderContractTickerSymbol)"
                :alt="`${log.senderName} logo`"
                @error="$setAltImageUrl"
              />
            </v-avatar>
            <div class="pl-2">
              {{ log.senderName }}
              <span class="caption">({{ log.senderContractTickerSymbol }})</span>
            </div>
          </v-row>
        </v-row>
      </div>

      <v-row v-if="numOfLogEventsToLoad < logEvents.length" no-gutters>
        <v-btn height="24" block small class="text-capitalize" outlined color="primary" tile @click="loadMoreLogEvents">
          <span class="white--text" v-text="`Load more...`" />
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, useStore } from '@nuxtjs/composition-api'
import { LogEvent } from '~/types/apollo/main/types'
import { EmitEvents } from '~/types/events'
import { State } from '~/types/state'

export default defineComponent({
  name: 'LogEvents',
  props: {
    logEvents: {
      type: Array as PropType<LogEvent[]>,
      default: () => [] as LogEvent[],
    },
    walletAddress: { type: String, default: '' },
  },
  setup(props, { emit }) {
    // COMPOSABLES
    const store = useStore<State>()

    // STATE
    const MAX_UINT256 = 2 ** 256 - 1
    const transactionLogEvents = toRefs(props).logEvents
    const numOfLogEventsToLoad = ref(5)

    // COMPUTED
    const logEventsData = computed<LogEvent[]>(() => {
      return transactionLogEvents.value.slice(0, numOfLogEventsToLoad.value)
    })

    // METHODS
    function approvalRenderer(value: string): string {
      if (+value >= MAX_UINT256) {
        return 'max approval'
      }

      return value
    }

    function loadMoreLogEvents() {
      if (numOfLogEventsToLoad.value > transactionLogEvents.value.length) return
      numOfLogEventsToLoad.value = numOfLogEventsToLoad.value + 3
    }

    function navigateToExplorer(address: string) {
      emit(EmitEvents.navigateToExplorer, address)
    }

    return {
      ui: computed(() => store.state.ui),
      theme: computed(() => store.state.ui.theme),

      // STATE
      logEventsData,
      numOfLogEventsToLoad,

      // METHODS
      loadMoreLogEvents,
      approvalRenderer,
      navigateToExplorer,
    }
  },
})
</script>

<template>
  <v-row justify="center" class="overflow-auto my-0 mx-n4" style="max-height: 625px">
    <v-col cols="11">
      <div v-for="log in logEventsData" :key="log.txHash + '_' + log.logOffset" class="pb-3">
        <!--    decoded function signature name -->
        <div class="subtitle-2 pink--text">
          {{ log.decoded['name'].replace(/([A-Z])/g, ' $1').trim() }}
        </div>

        <v-row no-gutters :class="[ui[theme].innerCardLighten]">
          <div v-for="(param, i) in log.decoded['params']" :key="i">
            <div class="pr-5">
              <div :class="[ui[ui.theme].headerTextClass, 'text-capitalize text-caption']">
                {{ param['name'].replace('_', '') }}:
              </div>

              <div v-if="log.decoded['name'] === 'Approval'" class="pr-10">
                <div v-if="param['type'] === 'address'">
                  <v-tooltip top color="black">
                    <template #activator="{ on, attrs }">
                      <div
                        :class="[ui[theme].innerCardLighten, 'cursor-copy']"
                        v-bind="attrs"
                        v-on="on"
                        @click="$copyAddressToClipboard(param['value'])"
                      >
                        {{ $truncateAddress(param['value'], 8, 10) }}
                      </div>
                    </template>
                    <span class="caption">{{ param['value'] }}</span>
                  </v-tooltip>
                </div>
                <div v-else>
                  {{ approvalRenderer(param['value']) }}
                </div>
              </div>

              <div v-else-if="param['type'].startsWith('uint') && param['name'] === 'value'" class="pr-10">
                {{ $nf(+param['value'] / 10 ** log.senderContractDecimals, 0, 6) }}
              </div>

              <div
                v-else-if="
                  param['type'] === 'address' || param['name'] === 'functionSignature' || param['name'] === 'owner'
                "
                class="pr-10"
              >
                <v-tooltip top color="black">
                  <template #activator="{ on, attrs }">
                    <div
                      :class="[ui[theme].innerCardLighten, 'cursor-copy']"
                      v-bind="attrs"
                      v-on="on"
                      @click="$copyAddressToClipboard(param['value'])"
                    >
                      {{ $truncateAddress(param['value'], 8, 10) }}
                    </div>
                  </template>
                  <span class="caption">{{ param['value'] }}</span>
                </v-tooltip>
              </div>

              <div v-else class="pr-10">
                {{ param['value'].substring(0, 300) }}
              </div>
            </div>
          </div>
          <v-row v-if="log.senderName && log.decoded['params'].length > 0" no-gutters class="ml-n12 mt-5">
            <v-avatar size="16" style="margin-top: 2px">
              <img :src="log.senderLogoUrl" :alt="`${log.senderName} logo`" @error="$setAltImageUrl" />
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
          <span :class="ui[theme].headerTextClass">Load more...</span>
        </v-btn>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, useStore } from '@nuxtjs/composition-api'
import { LogEvent } from '~/types/apollo/main/types'
import { State } from '~/types/state'

export default defineComponent({
  name: 'LogEvents',
  props: {
    logEvents: {
      type: Array as PropType<LogEvent[]>,
      default: () => [] as LogEvent[],
    },
  },
  setup(props) {
    // STATE
    const MAX_UINT256 = 2 ** 256 - 1
    const transactionLogEvents = toRefs(props).logEvents
    const numOfLogEventsToLoad = ref(5)

    // COMPOSABLES
    const store = useStore<State>()

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

    return {
      ui: computed(() => store.state.ui),
      theme: computed(() => store.state.ui.theme),

      // STATE
      logEventsData,
      numOfLogEventsToLoad,

      // METHODS
      loadMoreLogEvents,
      approvalRenderer,
    }
  },
})
</script>

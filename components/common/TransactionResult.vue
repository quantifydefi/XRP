<template>
  <div class="text-center">
    <v-icon class="mt-12" size="48" :color="txData.color">{{ txData.icon }}</v-icon>
    <h5 class="text-h5 mt-4" v-text="txData.message" />
    <p v-if="isTxMined && message" class="grey--text" v-text="message" />

    <v-row style="margin-top: 90px">
      <v-col class="text-left mb-1">
        <small><a class="grey--text" href="#" @click="showLogs = !showLogs">Logs</a></small>
      </v-col>
      <v-col class="text-right grey--text mb-1">
        <small v-if="isTxMined">
          <a class="grey--text" target="_blank" :href="txHash">Transaction Details</a>
          <v-icon color="grey" size="14">mdi-open-in-new</v-icon>
        </small>
      </v-col>
    </v-row>
    <v-virtual-scroll
      v-if="showLogs"
      class="grey--text text-left my-4"
      height="300"
      item-height="0"
      v-text="txReceipt"
    />
    <v-btn tile class="text-capitalize" block color="primary" @click="onClose"> OK, Close it </v-btn>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, useStore } from '@nuxtjs/composition-api'
import { State } from '~/types/state'
import { EmitEvents } from '~/types/events'
type Props = {
  receipt: any
  isTxMined: boolean
  successMessage?: string | null
}

export default defineComponent<Props>({
  props: {
    receipt: { type: [Object, Error] as any, required: true },
    isTxMined: { type: Boolean, default: false, required: true },
    successMessage: { type: String as PropType<string | null>, default: null, required: false },
  },
  setup(props, { emit }) {
    const { state } = useStore<State>()
    const showLogs = ref(false)

    const txHash = computed(
      () => `${state.configs.currentAaveMarket.blockExplorerUrl}tx/${props.receipt.transactionHash}`
    )
    const txData = computed(() => {
      let data: { message: string; icon: string; color: string }
      props.isTxMined
        ? (data = { message: 'Transaction Successful', icon: 'mdi-check-circle-outline', color: 'green' })
        : (data = { message: 'Something Went Wrong', icon: 'mdi-alert-circle-outline', color: 'red' })
      return data
    })

    const onClose = () => emit(EmitEvents.onResultClosed)
    return {
      // COMPUTED
      txReceipt: props.receipt,
      message: props.successMessage,
      txMined: props.isTxMined,
      showLogs,
      txData,
      txHash,

      // METHODS
      onClose,
    }
  },
})
</script>

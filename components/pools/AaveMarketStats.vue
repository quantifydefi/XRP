<template>
  <v-row align="center" justify="center">
    <v-col v-for="(item, i) in stats" :key="i" lg="2" md="6" sm="12">
      <v-card tile outlined height="100%">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon size="30" color="primary">{{ item.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-subtitle>
              {{ item.text }}
              <info-tooltip v-if="item.tooltip" :text="item.tooltip" :header="item.text" />
            </v-list-item-subtitle>
            <v-list-item-title class="text-h6" v-text="item.value" />
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'
import InfoTooltip from '~/components/common/ui/InfoTooltip.vue'
import { messages } from '~/constants/messages'
type Props = {
  totalDepositUsd: number
  totalBorrowedUsd: number
  healthFactor: number
  maxLtv: number
  currentLtv: number
  liquidationThreshold: number
  borrowingPowerUsed: number
}
type Stats = {
  text: string
  value: string | number
  icon: string
  tooltip?: string
}
export default defineComponent<Props>({
  components: { InfoTooltip },
  props: {
    totalDepositUsd: { type: Number, default: 0 },
    totalBorrowedUsd: { type: Number, default: 0 },
    healthFactor: { type: Number, default: 0 },
    maxLtv: { type: Number, default: 0 },
    currentLtv: { type: Number, default: 0 },
    liquidationThreshold: { type: Number, default: 0 },
    borrowingPowerUsed: { type: Number, default: 0 },
  },
  setup(props) {
    const { $f } = useContext()

    const stats = computed<Stats[]>(() => [
      {
        text: 'Net Worth',
        value: isNaN(props.healthFactor)
          ? 0
          : $f(props.totalDepositUsd - props.totalBorrowedUsd, { minDigits: 2, pre: '$ ' }),
        icon: 'mdi-wallet-outline',
      },

      {
        text: 'Health Factor',
        value: isNaN(props.healthFactor) ? 0 : $f(props.healthFactor, { minDigits: 2 }),
        icon: 'mdi-heart-outline',
        tooltip: messages.tooltips.healthFactor,
      },
      {
        text: 'Max LTV',
        value: isNaN(props.maxLtv) ? 0 : $f(props.maxLtv, { minDigits: 2, after: '%' }),
        icon: 'mdi-chart-box-plus-outline',
        tooltip: messages.tooltips.loanToValueRatio,
      },
      {
        text: 'Current LTV',
        value: isNaN(props.currentLtv) ? 0 : $f(props.currentLtv, { minDigits: 2, after: '%' }),
        icon: 'mdi-chart-timeline-variant',
        tooltip: messages.tooltips.loanToValueRatio,
      },
      {
        text: 'Liquidation Threshold',
        value: isNaN(props.liquidationThreshold) ? 0 : $f(props.liquidationThreshold, { minDigits: 2, after: '%' }),
        icon: 'mdi-chart-timeline',
        tooltip: messages.tooltips.liquidationThreshold,
      },
      {
        text: 'Borrowing Power Used',
        value: isNaN(props.borrowingPowerUsed) ? 0 : $f(props.borrowingPowerUsed, { minDigits: 2, after: '%' }),
        icon: 'mdi-power-settings',
      },
    ])

    return { stats }
  },
})
</script>

<template>
  <v-data-table
    class="transparent"
    :headers="headers"
    :items="transactions"
    :sort-by="['timestamp']"
    :sort-desc="[true]"
    :items-per-page="10"
    item-class="px-1"
  >
    <template v-slot:item.timestamp="{ item }">
      {{ timeConverter(item.timestamp) }}
    </template>

    <template v-slot:item.total_sent="{ item }">
      {{ parseFloat(item.input_token_quantity.toFixed(4)) }}
      <span class="grey--text text--lighten-1 ml-1">
        {{ item.input_token_name }} ({{ item.input_token_symbol }})</span
      >
    </template>
    <template v-slot:item.total_received="{ item }">
      {{ parseFloat(item.output_token_quantity.toFixed(4)) }}
      <span class="grey--text text--lighten-1 ml-1"
        >{{ item.output_token_name }} ({{ item.output_token_symbol }})</span
      >
    </template>

    <template v-slot:item.trade_value_usd="{ item }">
      $ {{ item.trade_value_usd.toFixed(2) }}
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'

@Component({
  name: 'TransactionGrid',
  computed: {
    ...mapState({
      address: (state: any) => state.wallet.address,
      transactions: (state: any) => state.wallet.transactions,
    }),
  },
})
export default class TransactionGrid extends Vue {
  headers = [
    {
      text: 'Timestamp',
      align: 'start',
      value: 'timestamp',
      class: 'px-2',
      width: 50,
    },

    {
      text: 'Trx Type',
      align: 'start',
      value: 'transaction_type',
      class: 'px-2',
      width: 70,
    },
    {
      text: 'Total Sent',
      align: 'start',
      value: 'total_sent',
      class: 'px-2',
      width: 140,
    },
    {
      text: 'Total Received',
      align: 'start',
      value: 'total_received',
      class: 'px-2',
      width: 140,
    },

    {
      text: 'Transaction Value',
      align: 'start',
      value: 'trade_value_usd',
      class: 'px-2',
      width: 100,
    },
  ]

  async mounted() {
    const currentAddress = this.address
    await this.$store.dispatch('wallet/transactions', {
      address: currentAddress,
    })
  }

  timeConverter(timestamp: number): string {
    const a = new Date(timestamp * 1000)
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]
    const year = a.getFullYear()
    const month = months[a.getMonth()]
    const date = a.getDate()
    const hour = a.getHours()
    const min = a.getMinutes()
    const sec = a.getSeconds()
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec
  }
}
</script>

<template>
  <div>
    <div v-if="!adapters" class="text-center">
      <v-progress-circular indeterminate size="32" color="primary" width="5" />
    </div>
    <v-data-table
      v-if="adapters"
      class="transparent"
      :headers="headers"
      :items="filtered"
      :sort-by="['timestamp']"
      :sort-desc="[true]"
      :items-per-page="10"
      item-class="px-1"
    >
      <template v-slot:item.asset_balance="{ item }">
        {{ item.asset_balance.toFixed(4) }}
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState } from 'vuex'
import { Adapter } from '~/models/transaction'

@Component({
  name: 'AdaptersGrid',
  computed: {
    ...mapState({
      adapters: (state: any) => state.wallet.adapters,
    }),
  },
})
export default class AdaptersGrid extends Vue {
  @Prop({ default: () => 'Deposit' }) type!: string
  adapters!: Adapter[]
  headers = [
    {
      text: 'Symbol',
      align: 'start',
      value: 'asset_symbol',
      class: 'px-2',
      width: 50,
    },
    {
      text: 'Name',
      align: 'start',
      value: 'asset_name',
      class: 'px-2',
      width: 50,
    },
    {
      text: 'Protocol Name',
      align: 'start',
      value: 'protocol_name',
      class: 'px-2',
      width: 50,
    },
    {
      text: 'Balance',
      align: 'start',
      value: 'asset_balance',
      class: 'px-2',
      width: 50,
    },
    {
      text: 'Type',
      align: 'start',
      value: 'balance_type',
      class: 'px-2',
      width: 50,
    },
  ]

  get filtered() {
    return this.adapters.filter(
      (item: Adapter) => item.balance_type === this.type
    )
  }
}
</script>

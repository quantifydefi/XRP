<template>
  <v-row no-gutters justify="center">
    <top-bar title="Dashboard"></top-bar>
  </v-row>
  <!--  <v-row no-gutters justify="center">-->
  <!--    <top-bar title="Portfolio Overview"></top-bar>-->
  <!--    <v-col cols="12" class="pa-1">-->
  <!--      <v-row class="justify-center">-->
  <!--        <v-col-->
  <!--          v-for="(item, i) in overview"-->
  <!--          :key="i"-->
  <!--          cols="12"-->
  <!--          md="6"-->
  <!--          lg="3"-->
  <!--          class="pa-1"-->
  <!--        >-->
  <!--          <v-card tile outlined>-->
  <!--            <v-card height="100" color="grey darken-4 pa-1" tile outlined>-->
  <!--              <v-card-title class="subtitle-2 font-weight-regular">{{-->
  <!--                item.title-->
  <!--              }}</v-card-title>-->
  <!--              <v-card-text class="mt-n3">-->
  <!--                <v-row no-gutters>-->
  <!--                  <v-col cols="9"-->
  <!--                    ><h2 class="title font-weight-regular">-->
  <!--                      {{ item.value }}-->
  <!--                    </h2></v-col-->
  <!--                  >-->
  <!--                  <v-col cols="3" align="right" class="mt-n5">-->
  <!--                    <v-avatar>-->
  <!--                      <v-icon size="28">{{ item.icon }}</v-icon>-->
  <!--                    </v-avatar>-->
  <!--                  </v-col>-->
  <!--                </v-row>-->
  <!--              </v-card-text>-->
  <!--            </v-card>-->
  <!--          </v-card>-->
  <!--        </v-col>-->

  <!--        <v-col cols="12" md="6" lg="3" class="pa-1">-->
  <!--          <v-card outlined tile>-->
  <!--            <v-card height="100" color="grey darken-4 pa-1" tile outlined>-->
  <!--              <v-card-title class="subtitle-2 font-weight-regular"-->
  <!--                >Current Gas Fees</v-card-title-->
  <!--              >-->
  <!--              <v-card-text class="mt-n3 d-flex">-->
  <!--                <v-row c>-->
  <!--                  <v-col cols="4">-->
  <!--                    <h2 class="caption font-weight-regular">Slow</h2>-->
  <!--                    <span class="ml-3">{{ gasPrice.slow }}</span>-->
  <!--                  </v-col>-->
  <!--                  <v-col cols="4">-->
  <!--                    <h2 class="caption font-weight-regular text-no-wrap">-->
  <!--                      Average-->
  <!--                    </h2>-->
  <!--                    <span class="ml-5">{{ gasPrice.average }}</span>-->
  <!--                  </v-col>-->
  <!--                  <v-col cols="4">-->
  <!--                    <h2 class="caption font-weight-regular">Fast</h2>-->
  <!--                    <span class="ml-2">{{ gasPrice.fast }}</span>-->
  <!--                  </v-col>-->
  <!--                </v-row>-->
  <!--              </v-card-text>-->
  <!--            </v-card>-->
  <!--          </v-card>-->
  <!--        </v-col>-->

  <!--        <v-col cols="12" class="pa-1">-->
  <!--          <v-card outlined tile>-->
  <!--            <v-card-title class="py-1 px-2 subtitle-1"-->
  <!--              >Recent Transactions</v-card-title-->
  <!--            >-->
  <!--            <v-divider></v-divider>-->
  <!--            <v-data-table-->
  <!--              id="recent-transactions"-->
  <!--              height="690"-->
  <!--              dense-->
  <!--              :headers="cols"-->
  <!--              :items="data"-->
  <!--              hide-default-footer-->
  <!--              :mobile-breakpoint="0"-->
  <!--              disable-pagination-->
  <!--            >-->
  <!--              <template #[`item.block_signed_at`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  {{ new Date(item.block_signed_at).toLocaleString('en-US') }}-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.tx_hash`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  {{ item.tx_hash.slice(0, 12) }}...{{-->
  <!--                    item.tx_hash.slice(54, item.tx_hash.length)-->
  <!--                  }}-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.successful`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  <v-icon :color="item.successful ? 'green' : 'red'">-->
  <!--                    {{ item.successful ? 'mdi-check' : 'mdi-close' }}</v-icon-->
  <!--                  >-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.from_address`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  {{ item.from_address.slice(0, 10) }}...{{-->
  <!--                    item.from_address.slice(31, item.from_address.length)-->
  <!--                  }}-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.to_address`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  {{ item.to_address.slice(0, 10) }}...{{-->
  <!--                    item.to_address.slice(31, item.to_address.length)-->
  <!--                  }}-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.value`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  {{ (item.value / 10 ** 18).toFixed(6) }} ETH-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.value_quote`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  ${{ item.value_quote.toFixed(4) }}-->
  <!--                </div>-->
  <!--              </template>-->

  <!--              <template #[`item.gas_quote`]="{ item }">-->
  <!--                <div class="text-no-wrap overflow-x-hidden">-->
  <!--                  ${{ item.gas_quote.toFixed(4) }}-->
  <!--                </div>-->
  <!--              </template>-->
  <!--            </v-data-table>-->
  <!--          </v-card>-->
  <!--        </v-col>-->
  <!--      </v-row>-->
  <!--    </v-col>-->
  <!--  </v-row>-->
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
// import { mapState } from 'vuex'
// import detectEthereumProvider from '@metamask/detect-provider'
import TopBar from '~/components/app/TopBar.vue'

@Component({
  name: 'App',
  components: { TopBar },
  layout: 'app',
  // computed: {
  //   ...mapState({
  //     address: (state: any) => state.wallet.address,
  //     gasPrice: (state: any) => state.wallet.gasPrice,
  //   }),
  // },
})
export default class App extends Vue {
  // overview = [
  //   { title: 'Net Worth', value: '$0.00', icon: 'mdi-wallet' },
  //   { title: 'Total Worth', value: '$0.00', icon: 'mdi-wallet-outline' },
  //   { title: 'Borrowed', value: '$25,000', icon: '' },
  // ]
  //
  // get cols() {
  //   return [
  //     {
  //       text: 'Block Signed At',
  //       align: 'start',
  //       value: 'block_signed_at',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'Status',
  //       align: 'start',
  //       value: 'successful',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'Txn Hash',
  //       align: 'start',
  //       value: 'tx_hash',
  //       class: 'px-2',
  //     },
  //
  //     // {
  //     //   text: 'Age',
  //     //   align: 'start',
  //     //   value: 'totalValue',
  //     //   class: 'px-2',
  //     //   width: 40,
  //     // },
  //     {
  //       text: 'From',
  //       align: 'start',
  //       value: 'from_address',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'To',
  //       align: 'start',
  //       value: 'to_address',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'Value',
  //       align: 'start',
  //       value: 'value',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'Amount',
  //       align: 'start',
  //       value: 'value_quote',
  //       class: 'px-2',
  //     },
  //     {
  //       text: 'Txn Fee',
  //       align: 'start',
  //       value: 'gas_quote',
  //       class: 'px-2',
  //     },
  //   ]
  // }
  //
  // data: any = []
  //
  // async mounted() {
  //   /**
  //    Listener for account change
  //    */
  //   const provider: any = await detectEthereumProvider()
  //
  //   if (provider) {
  //     await provider.request({ method: 'eth_accounts' })
  //     provider.on('accountsChanged', (accounts: string[]) => {
  //       if (!accounts.length) {
  //         this.$store.dispatch('wallet/metamaskLogout')
  //         this.$router.push('/')
  //       }
  //     })
  //   }
  //
  //   try {
  //     const {
  //       data: {
  //         data: { items },
  //       },
  //     } = await this.$axios.get(
  //       'https://api.covalenthq.com/v1/1/address/0xF705b9ba1908cA505537F309B08E6949C1b8f31F/transactions_v2/?no-logs=true&limit=20&key=ckey_8c009f2c57b24a2d8e8b0553b0d5'
  //     )
  //
  //     this.data = items
  //   } catch {
  //     console.log('error')
  //     this.data = []
  //   }
  // }
}
</script>

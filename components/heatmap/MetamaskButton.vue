<template>
  <v-row>
    <v-col cols="4" class="pt-2 pb-0 my-0">
      <v-text-field
        v-model="search"
        class="py-0 pl-4"
        label="Load Ethereum Address"
        clearable
        clear-icon="mdi-close"
        :loading="loading"
        :disabled="loading"
        @click:append="processHeatmap"
        @keyup="isFromSearch = true"
        @click="isFromSearch = true"
      >
      </v-text-field>
    </v-col>
    <v-col class="pt-2 pb-0 px-0">
      <v-btn
        tile
        depressed
        :disabled="loading"
        color="grey lighten-5"
        @click="processHeatmap"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
    <v-col class="pt-2 pb-0 my-0">
      <div class="d-flex justify-end align-right">
        <client-only>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
                color="grey lighten-5"
                class="text-capitalize text-subtitle-2"
                tile
                depressed
                :disabled="loading || isEthereumActive"
                v-bind="attrs"
                v-on="on"
              >
                Number Of Coins:
                <span class="primary--text mx-1">
                  {{ numberOfCoinsValues[numberOfCoinsModel] }}
                </span>
                <v-icon right> mdi-chevron-down </v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item-group
                v-model="numberOfCoinsModel"
                color="primary"
                @change="
                  (v) => $emit('number-of-coins-change', numberOfCoinsValues[v])
                "
              >
                <v-list-item
                  v-for="item in numberOfCoinsValues"
                  :key="item"
                  link
                >
                  <v-list-item-title v-text="item"></v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </client-only>
        <div>
          <v-btn
            id="ButtonToggle"
            tile
            class="text-capitalize text-subtitle-2"
            color="grey lighten-5"
            depressed
            :disabled="loading"
            @click="toggleDataValue = !toggleDataValue"
          >
            Block Size:
            <span class="primary--text mx-1"> {{ blockSizeModel.text }} </span>
            <v-icon right> mdi-chevron-down </v-icon>
          </v-btn>
          <v-select
            v-show="false"
            v-model="blockSizeModel"
            return-object
            attach="#ButtonToggle"
            dense
            :items="blockSizeOptions"
            item-text="text"
            item-value="value"
            :menu-props="{
              flat: true,
              tile: true,
              value: toggleDataValue,
              closeOnClick: true,
              bottom: true,
              'nudge-top': -40,
            }"
            @change="(v) => $emit('data-value-change', v.value)"
          />
        </div>

        <v-btn
          v-if="!isMetamaskActive"
          tile
          depressed
          :disabled="loading"
          color="grey lighten-5"
          class="mr-4 text-capitalize text-subtitle-2"
          @click="initMetamask"
          >Metamask
          <v-icon right> mdi-wallet-outline </v-icon>
        </v-btn>

        <v-tooltip v-else bottom color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :disabled="loading"
              tile
              depressed
              color="grey lighten-5"
              class="mr-4"
              v-on="on"
              @click="exitMetamask"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Exit from Metamask</span>
        </v-tooltip>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
// @ts-ignore
import detectEthereumProvider from '@metamask/detect-provider'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Events } from '~/types/global'
import { HeatmapData } from '~/models/heatmap'

@Component({ name: 'MetamaskButton' })
export default class MetamaskButton extends Vue {
  @Prop({ default: () => [] }) blockSizeOptions!: string[]
  @Prop({ default: () => [] }) readonly numberOfCoinsValues!: number[]

  private account: string | null = null
  private requestJobId: string | null = null
  private isHeatmapReedy: boolean = false
  private loading: boolean = false
  private numberOfCoinsModel: number = 3
  private search: string = ''
  private isFromSearch: boolean = false
  private isEthereumActive: boolean = false
  private isMetamaskActive: boolean = false
  private toggleDataValue: boolean = false
  blockSizeModel = { value: 'liquidity_index', text: 'Liquidity' }

  @Watch('isHeatmapReedy')
  private async onHeatmapReadyChanged(value: boolean) {
    if (value) {
      const heatmapData: HeatmapData[] | null = await this.ethereumHeatmap()
      if (heatmapData) {
        if (heatmapData.length) {
          /** Emitting Ethereum Heatmap Data */
          this.$emit('heatmap-data', heatmapData)

          /** changing Data Value to balance */
          this.blockSizeModel = { value: 'balance_usd', text: 'Balance USD' }

          /** Disable Number of coins Button */
          this.isEthereumActive = true
        } else
          this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
            text: 'Invalid Address',
          })
      }
    }
  }

  private async processHeatmap(): Promise<void> {
    /** Check if account coming from search bar */
    if (this.isFromSearch) this.account = this.search
    this.$emit('heatmap-loading')
    try {
      this.requestJobId = await this.$store.dispatch('heatmap/requestHeatmap', {
        address: this.account,
      })
    } catch (error) {
      if (error.response) {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: error.response.data.message,
        })
      } else {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: 'Something went wrong',
        })
      }
    }

    /** checking if Background job completed every sec if completed set isHeatmapReedy to True, then follow onHeatmapReadyChanged watcher */
    if (this.requestJobId) {
      const checkStatus = setInterval(async () => {
        try {
          this.loading = true
          this.isHeatmapReedy = await this.$store.dispatch(
            'heatmap/requestHeatmapStatus',
            { jobId: this.requestJobId }
          )
          if (this.isHeatmapReedy) {
            clearInterval(checkStatus)
            this.loading = false
          }
        } catch (error) {
          this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
            text: 'Something went wrong',
          })
          clearInterval(checkStatus)
        }
      }, 1000)
    }
  }

  private async ethereumHeatmap(): Promise<HeatmapData[] | null> {
    try {
      return await this.$store.dispatch('heatmap/ethereumHeatmap', {
        address: this.account,
      })
    } catch {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: 'Something went wrong',
      })
      return null
    }
  }

  private async initMetamask() {
    /** this returns the provider, or null if it wasn't detected */
    this.isFromSearch = false
    this.search = ''
    try {
      if (typeof window.ethereum === 'undefined') {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text: `Metamask Is not Installed. Please install Metamask extension for your browser`,
        })
        window.open('https://metamask.io/')
        return
      }
      const provider: any = await detectEthereumProvider()

      if (provider !== (window.ethereum as any)) {
        this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
          text:
            'Do you have multiple wallets installed? Currently supporting only Ethereum Wallets',
        })
        return
      }

      if (provider === (window.ethereum as any)) {
        // @ts-ignore
        // eslint-disable-next-line no-undef
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        this.account = accounts[0]
        await this.processHeatmap()
        this.isMetamaskActive = true
      }
    } catch (error) {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: error.message,
      })
    }
  }

  private exitMetamask() {
    this.$emit('exit-metamask')
    this.isMetamaskActive = false
    this.isEthereumActive = false
  }

  private resetBlockSize() {
    setTimeout(() => {
      this.blockSizeModel = { value: 'liquidity_index', text: 'Liquidity' }
    }, 100)
  }
}
</script>

<style scoped></style>

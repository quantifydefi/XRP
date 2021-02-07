<template>
  <v-row>
    <v-col cols="4" class="pt-2 pb-0 mt-4">
      <v-text-field
        v-model="search"
        class="py-0 pl-4"
        label="Load Ethereum Address"
        clearable
        clear-icon="mdi-close"
        :loading="loading"
        :disabled="loading"
        @click:append="getBalanceHeatmap"
        @keyup="isFromSearch = true"
        @click="isFromSearch = true"
      >
      </v-text-field>
    </v-col>
    <v-col class="pt-2 pb-0 px-0 mt-4">
      <v-btn
        tile
        depressed
        :disabled="loading || !isSearchButtonEnabled"
        @click="getBalanceHeatmap"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-col>
    <v-col class="pt-2 pb-0 mt-4">
      <div class="d-flex justify-end align-right">
        <div>
          <v-menu
            v-model="filterMenuModel"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn tile depressed v-bind="attrs" v-on="on">
                <v-icon>mdi-filter</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-content class="pb-0 mb-0">
                    <v-text-field
                      v-model="filterStringModel"
                      label="Type Symbol Name"
                      class="py-0 my-0"
                      clearable
                    />
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>

        <client-only>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn
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
                <v-icon right> mdi-chevron-down</v-icon>
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
            depressed
            :disabled="loading"
            @click="toggleDataValue = !toggleDataValue"
          >
            Block Size:
            <span class="primary--text mx-1"> {{ blockSizeModel.title }} </span>
            <v-icon right> mdi-chevron-down</v-icon>
          </v-btn>
          <v-select
            v-show="false"
            v-model="blockSizeModel"
            return-object
            attach="#ButtonToggle"
            dense
            :items="blockSizeOptions"
            item-text="title"
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
        <div>
          <v-btn
            id="timeFrameToggle"
            tile
            class="text-capitalize text-subtitle-2"
            depressed
            :disabled="loading"
            @click="toggleTimeFrame = !toggleTimeFrame"
          >
            Time Frame:
            <span class="primary--text mx-1"> {{ timeFrameModel.title }} </span>
            <v-icon right> mdi-chevron-down</v-icon>
          </v-btn>
          <v-select
            v-show="false"
            v-model="timeFrameModel"
            return-object
            attach="#timeFrameToggle"
            dense
            :items="timeFrameOptions"
            item-text="title"
            item-value="value"
            :menu-props="{
              flat: true,
              tile: true,
              value: toggleTimeFrame,
              closeOnClick: true,
              bottom: true,
              'nudge-top': -40,
            }"
            @change="(v) => $emit('time-frame-change', v.value)"
          />
        </div>

        <v-btn
          v-if="!isMetamaskActive"
          tile
          depressed
          :disabled="loading"
          class="mr-4 text-capitalize text-subtitle-2"
          @click="initMetamask"
          >Metamask
          <v-icon right> mdi-wallet-outline</v-icon>
        </v-btn>

        <v-tooltip v-else bottom color="black">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              :disabled="loading"
              tile
              depressed
              class="mr-4"
              v-on="on"
              @click="exitMetamask"
            >
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Exit to Default</span>
        </v-tooltip>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import detectEthereumProvider from '@metamask/detect-provider'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Events } from '~/types/global'
import { TimeFrameOption } from '~/models/heatmap'
import { HeatmapConfigMode, HeatmapEvents } from '~/types/heatmap'

@Component({ name: 'MetamaskButton' })
export default class MetamaskButton extends Vue {
  @Prop({ default: () => ({}) }) readonly defaultBlockSize!: {
    title: string
    value: string
  }

  @Prop({ default: 'default' }) configMode!: HeatmapConfigMode
  @Prop({ default: () => [] }) blockSizeOptions!: string[]
  @Prop({ default: () => [] }) readonly numberOfCoinsValues!: number[]
  @Prop({ default: () => [] }) readonly timeFrameOptions!: TimeFrameOption[]
  @Prop({ default: () => ({}) }) readonly defaultTimeFrame!: {
    title: string
    value: string
  }

  private $ga: any
  private account: string | null = null
  private loading: boolean = false
  private numberOfCoinsModel: number = 3
  private search: string = ''
  private isFromSearch: boolean = false
  private isEthereumActive: boolean = false
  private isMetamaskActive: boolean = false
  private toggleDataValue: boolean = false
  private blockSizeModel = this.defaultBlockSize
  private timeFrameModel = this.defaultTimeFrame
  private toggleTimeFrame: boolean = false
  private isHeatmapReedy: boolean = false
  private filterMenuModel = false
  private filterStringModel: string | null = ''
  private searchTimeout: any = null

  get isSearchButtonEnabled() {
    if (this.search) {
      return this.search.length > 1
    } else return false
  }

  @Watch('defaultBlockSize')
  private onDefaultBlockSizeChanged(value: { title: string; value: string }) {
    this.blockSizeModel = value
  }

  @Watch('timeFrameModel')
  private onTimeFrameModelChanged(value: { title: string; value: string }) {
    this.timeFrameModel = value
  }

  @Watch('filterStringModel')
  private onFilterChange(value: string) {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.$emit(HeatmapEvents.filterHeatmap, value)
    }, 1000)
  }

  private getBalanceHeatmap(): void {
    this.isHeatmapReedy = false
    /** Check if account coming from search bar */
    if (this.isFromSearch) this.account = this.search

    this.$emit(HeatmapEvents.balanceHeatmap, { address: this.account })
    this.isEthereumActive = true
    this.isMetamaskActive = true
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
        await this.getBalanceHeatmap()
        this.isMetamaskActive = true
        this.$ga.event({
          eventCategory: 'metamask-connect',
          eventAction: this.account,
          eventLabel: 'label',
          eventValue: 1,
        })
      }
    } catch (error) {
      this.$root.$emit(Events.GLOBAL_NOTIFICATION, {
        text: error.message,
      })
    }
  }

  private exitMetamask() {
    this.$emit(HeatmapEvents.exitMetamask)
    this.isMetamaskActive = false
    this.isEthereumActive = false
    this.blockSizeModel = { value: 'liquidity', title: 'Liquidity' }
    this.timeFrameModel = { title: '1 Day', value: '24h' }
  }

  private resetBlockSize() {
    setTimeout(() => {
      this.blockSizeModel = { value: 'liquidity', title: 'Liquidity' }
      this.isMetamaskActive = false
      this.isEthereumActive = false
    }, 100)
  }
}
</script>

<style scoped></style>

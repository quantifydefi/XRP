import { Vue, Component } from 'vue-property-decorator'
import { heatmapConfigInterface } from '~/types/heatmap'
import { userConfigInterface } from '~/types/userConfig'

@Component
export class configBarMixin extends Vue {
  dialog: boolean = false
  configOptions: object = {
    displays: [
      { text: 'Gainers and Losers', value: '24hour' },
      { text: 'Market Cap', value: 'marketcap' },
    ],
    numOfCoins: [
      { text: '10', value: 10 },
      { text: '20', value: 20 },
      { text: '36', value: 36 },
      { text: '50', value: 50 },
      { text: '100', value: 100 },
      { text: 'All Coins', value: 999 },
      { text: 'Favorite Coins', value: 'fav' },
      { text: 'Metamask Wallet', value: 'wallet' },
    ],

    timeFrame: [
      { text: 'Daily', value: 'daily' },
      { text: 'Weekly', value: 'weekly' },
      { text: 'Monthly', value: 'monthly' },
      { text: 'Yearly', value: 'yearly' },
      { text: 'Year To Date', value: 'ytd' },
    ],
    exchanges: [
      { text: 'Binance', value: 'Binance' },
      { text: 'All', value: 'All' },
    ],
  }

  currentConfigs: heatmapConfigInterface = {
    display: 'marketcap',
    timeFrame: 'daily',
    numOfCoins: 50,
    exchange: 'All',
    grouped: false,
  }

  deafoultNumOfCoisLanding: number = 20
  displayFavorites: boolean = false

  changeConfigs(type: string): void {
    if (this.currentConfigs.display === 'marketcap') {
      this.currentConfigs.grouped = false
    }
    this.$emit('change-configs', { type, configs: this.currentConfigs })
  }

  // method for landing page (favorite coins)
  async switchToFavorites(type): Promise<void> {
    this.displayFavorites = !this.displayFavorites
    const configs: userConfigInterface = await this.$store.dispatch(
      'coin/getUserConfigs'
    )
    if (this.displayFavorites) {
      this.currentConfigs.numOfCoins = 'fav'
      configs.landing.heatmap.showFavorites = true
    } else {
      this.currentConfigs.numOfCoins = this.deafoultNumOfCoisLanding
      configs.landing.heatmap.showFavorites = false
    }
    this.changeConfigs(type)
    await this.$store.dispatch('coin/saveUserConfigs', configs)
  }

  changeLandingDisplay(display: string) {
    this.currentConfigs.display = display
    this.currentConfigs.grouped = true
    this.changeConfigs('display')
  }

  updateConfigs(config: heatmapConfigInterface): void {
    this.currentConfigs = config
    if (this.currentConfigs.numOfCoins === 'fav') {
      this.displayFavorites = true
    }
  }
}

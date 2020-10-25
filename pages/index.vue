<template>
  <div>
    <button @click="metamask">Connect Wallet</button>
    <button @click="pairsCreated">Uniswap Listings 24h</button>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <v-card tile outlined height="800">
          <marketcap
            v-if="heatmapData"
            :data="formattedData"
            :tile-tooltip="toolTip"
            :tile-body="tile"
            :chart-height="800"
          />
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Web3 from 'web3'
import ERC20abi from '../ERC20abi.json'
import UniswapV2Factory from '../UniswapV2Factory.json'
import UniswapV2Pair from '../UniswapV2Pair.json'
import { heatmapDataInterface } from '~/types/heatmap'
import Marketcap from '~/components/heatmap/Marketcap.vue'

@Component({
  name: 'Index',
  components: { Marketcap },
  async asyncData({ store }): Promise<object | null> {
    const configs = {
      display: 'liquidity',
      timeFrame: 'daily',
      numOfCoins: 12,
      exchange: 'All',
      grouped: false,
    }

    try {
      const heatmapData = await store.dispatch(
        'heatmap/getHeatmapData',
        configs
      )

      return { heatmapData }
    } catch {
      return { heatmapData: [] }
    }
  },
  methods: {
    async getMetamaskData() {},
  },
})
export default class Index extends Vue {
  heatmapData: heatmapDataInterface | any = null
  toolTip: string = `[bold]{coin_name}[/]
              ---------------------
              1 Hour Change: {price1h}%
              Liquidity: $ {liquidity} Million [font-size: {fontSize}px font-weight: 400;]`
  tile: string = `[font-size: {fontSize}px font-weight: 600;]{symbol}[/]
                  [font-size: {fontSizeLev2}px; font-weight: 800;]$ {price_usd}
                  {price1h} %[/]`

  menuItems = null
  isActive = false
  coins = 100
  private get formattedData(): Array<Record<string, any>> {
    function setTimeFrame(timeFrame: string): string {
      const frames: { [key: string]: string } = {
        hourly: 'price1h',
      }
      return frames[timeFrame]
    }

    function setColor(x: number) {
      if (x * 100 > 0 && x * 100 <= 1) {
        return '#71c175'
      } else if (x * 100 > 1 && x * 100 <= 2.5) {
        return '#4eb153'
      } else if (x * 100 > 2.5 && x * 100 <= 5) {
        return '#3e8e42'
      } else if (x * 100 > 5) {
        return '#2f6a32'
      } else if (x * 100 <= 0 && x * 100 >= -1) {
        return '#ff8080'
      } else if (x * 100 < -1 && x * 100 >= -2.5) {
        return '#ff4d4d'
      } else if (x * 100 < -2.5 && x * 100 >= -5) {
        return '#ff1a1a'
      } else if (x * 100 < -5) {
        return '#e60000'
      }
    }

    function price24hAbsFormatter(params: number | null): number {
      if (params === -1) {
        return 0
      } else if (params == null) {
        return 0
      } else {
        return parseFloat(Math.abs(params * 100).toFixed(2))
      }
    }

    const data: heatmapDataInterface[] | any = JSON.parse(
      JSON.stringify(this.heatmapData)
    )

    for (let i = 0; i < data.length; i++) {
      data[i].color = setColor(data[i][setTimeFrame('hourly')])
      data[i].price1h = price24hAbsFormatter(data[i].price1h)
      data[i].price1hAbs = price24hAbsFormatter(data[i].price1h)
      data[i].price_usd = parseFloat(data[i].price_usd.toFixed(4))
      data[i].liquidity = (data[i].liquidity / 10 ** 3).toFixed(2)
    }
    console.log(this.heatmapData)
    return data
  }

  async metamask(): Promise<object | null> {
    const data: heatmapDataInterface[] | any = JSON.parse(
      JSON.stringify(this.heatmapData)
    )

    let web3
    let balances
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      await ethereum.enable()
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('no metamask found')
    }
    console.log('testing', web3)


    /**
     * call to metamask that gets address of account connected to the browser
     */
    let totalBalance = 0
    const account = await web3.eth.getAccounts()
    if (account) {
      // console.log(account)
      /**
     * Gets Ethereum balance from account
     */
      balances = await web3.eth.getBalance(account[0])

      //calculate ethereum price in usd
      let ethPrice = data[0].price_usd / data[0].price_eth

      //round ETH from wei to decimal (18 decimal place change)
      let ethBalance = balances / 10 ** 18

      //calculate value of Ethereum in USD
      let ethUsdValue = ethBalance * ethPrice
      console.log('symbol: ETH coin balance: ', ethBalance,' usd balance:',ethUsdValue)

      //Begin recording total balance of entire account
      totalBalance = totalBalance + ethUsdValue
      /**
         * This loop checks all the coins imported from the API and gets their addresses (stored in data[i].id
         */
      for (let i = 0; i < data.length; i++) {

        /**
         * Create contract object for web3, imports ERC20abi (Ethereum Solidity functions available to call)
         * There is one ERC20abi.json because every ERC20 token has the same standard functions
         * data[i].id Points to the individual address of the contract that has implemented ERC20 standard
         */
        const contract = new web3.eth.Contract(ERC20abi, data[i].id)
        console.log(ERC20abi)

        /**
         * Invokes ERC20 balanceOf function at specified contract address(data[i].id)
         * to lookup balance of tokens at specified address imported from metamask (account[0])
         */
        const balance = await contract.methods.balanceOf(account[0]).call()
        if (balance) {
          /**
           *
           */
          if (balance > 0) {
            let coinBalance = balance / 10 ** 18
            let usdBalance = coinBalance * data[i].price_usd
            totalBalance = totalBalance + usdBalance
            console.log(
              'symbol:',
              data[i].symbol,
              'coin balance:',
              coinBalance,
              'usd balance',
              usdBalance
            )
          }
        }
      }
      console.log('total account balance:',totalBalance)
    }
    return data
  }

  async pairsCreated(): Promise<object | null> {
    let web3
    if (window.ethereum) {
      web3 = new Web3(window.ethereum)
      await ethereum.enable()
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider)
    } else {
      console.log('no metamask found')
    }
    console.log('testing', web3)

    const latestBlock = await web3.eth.getBlock("latest")
    if(latestBlock)
    {
      //console.log(UniswapV2Factory)
      const startBlock = latestBlock['number'] - 5760
      const factoryContract = new web3.eth.Contract(UniswapV2Factory, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f")
    const pairs = await factoryContract.getPastEvents("PairCreated",{fromBlock : startBlock})
    if (pairs)
    {
      //console.log(pairs)
      //console.log(UniswapV2Factory)
      for (let ii = 0; ii < pairs.length; ii++)
      {
        let whereIsEth = 0
        const replace = '0x000000000000000000000000'
        const token0 = pairs[ii].raw.topics[1].replace(replace,'0x')
        const token1 = pairs[ii].raw.topics[2].replace(replace,'0x')
        if (token0 == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
        {
        }
    else if (token1 == "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2")
        {
            whereIsEth = 1
        }
    else
        {
          whereIsEth = 2
        }
        //console.log(token0,token1)
        const pairId = await factoryContract.methods.getPair(token0,token1).call()
        //console.log(UniswapV2Pair)
        if (pairId)
        {
          const pairContract = new web3.eth.Contract(UniswapV2Pair['abi'], pairId)
          const reserves = await pairContract.methods.getReserves().call()
          if (reserves)
          {
            let price
            let liquidity
            //console.log(reserves)
            if (whereIsEth == 0)
            {
              liquidity = reserves['reserve0'] / 10 ** 18
              price = await pairContract.methods.getReserves().call()
            }
            if (whereIsEth == 1)
            {
              liquidity = reserves['reserve1'] / 10 ** 18
              price = await pairContract.methods.getReserves().call()
            }
            if (liquidity >= 10)
            {
              console.log('pair id:', pairId, 'liquidity: ',liquidity,'price: ',price)

            }
          }


        }
      }
    }
    }





  }
}
</script>

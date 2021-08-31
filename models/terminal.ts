/* eslint-disable camelcase */
import 'reflect-metadata'
import Vue from 'vue'
import { Type } from 'class-transformer'
import { Store } from 'vuex'
import { TerminalGridDataInterface } from '~/types/terminal'
import { ThemeOptions } from '~/types/ui'

export class TerminalGridData implements TerminalGridDataInterface {
  readonly pool_id!: string
  readonly token0_id!: string
  readonly token1_id!: string
  readonly token0_symbol!: string
  readonly token1_symbol!: string
  readonly token1_price!: number
  readonly percent_change_liq_24h!: number
  readonly reserve_eth!: number
  readonly eth_price_usd!: number
}

export const terminalUI: { theme: ThemeOptions } = { theme: 'dark' }

export class TerminalGrid {
  /** Vue root Interface **/
  private _$root: Vue

  /** Vuex **/
  private _$store: Store<any>

  @Type(() => TerminalGridData)
  private _data: TerminalGridData[] = []

  constructor(store: Store<any>, root: Vue) {
    this._$store = store
    this._$root = root

    /** Update Global Theme **/
    terminalUI.theme = store.state.ui.theme
  }

  updateTheme() {
    terminalUI.theme = this._$store.state.ui.theme
  }

  get cols() {
    return [
      {
        headerName: 'SYMBOL',
        field: 'token0_symbol',
        cellStyle: { 'justify-content': 'flex-end' },
        width: 50,
        resizable: true,
        cellRenderer(params: any) {
          const iDiv: HTMLElement = document.createElement('div')

          const image = document.createElement('img')
          const tokenImage = TerminalGrid.getTokenImage(params.data.token0_id)
          image.setAttribute('src', tokenImage)
          image.setAttribute('class', 'qc-coin-icon')

          const image2 = document.createElement('img')
          image2.setAttribute(
            'src',
            TerminalGrid.getTokenImage(params.data.token1_id)
          )
          image2.setAttribute('class', 'qc-coin-icon')

          /** If an image URL is broken, add a generic image. **/
          const onImageError = (image: any) => {
            image.onerror = ''
            image.src =
              'https://quantifycrypto.s3.us-west-2.amazonaws.com/pictures/crypto-img/32/icon/undefined.png'
            return true
          }

          image.addEventListener('error', () => onImageError(image))
          image2.addEventListener('error', () => onImageError(image2))

          const link: HTMLElement | any = document.createElement('a')
          link.disabled = true
          link.href = `https://defiheatmap.com/token/${params.data.pool_id}`
          link.textContent = `${params.value} - ${params.data.token1_symbol}`
          link.setAttribute('style', 'text-decoration:none; color: inherit')
          link.setAttribute('class', 'coin-link')
          iDiv.appendChild(image)
          iDiv.appendChild(image2)
          iDiv.appendChild(link)

          return iDiv
        },
      },
      {
        headerName: 'LIQUIDITY',
        field: 'liquidity',
        cellStyle: { 'justify-content': 'flex-end' },
        width: 35,
        resizable: true,
        valueFormatter: (params: any) => {
          return TerminalGrid.calcReserveEthUsd(
            params.data.reserve_eth,
            params.data.eth_price_usd
          )
        },
      },
      {
        headerName: 'LIQ 1D%',
        field: 'percent_change_liq_24h',
        cellClass: 'grid-cell-centered ',
        width: 20,
        resizable: true,
        valueFormatter: (params: any) => `${params.value.toFixed(2)}%`,
        cellStyle: GridCellStyles.ptcCellStyle,
      },
    ]
  }

  get data() {
    return this._data
  }

  async getData() {
    try {
      this._data = await this._$store.dispatch('terminal/getTerminalData', {
        numOfCoins: 160,
      })
    } catch {
      this._data = []
    }
  }

  static getTokenImage(tokenId: string): string {
    return `https://tokens.dharma.io/assets/${tokenId}/icon.png`
  }

  static calcReserveEthUsd(reserveEth: number, ethPriceUsd: number) {
    return new Intl.NumberFormat('en', {
      currency: 'USD',
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(reserveEth * ethPriceUsd)
  }
}

class GridCellStyles {
  static ptcCellStyle(params: any) {
    const value: number = params.value
    switch (terminalUI.theme) {
      case 'light':
        if (value * 100 >= 0 && value * 100 <= 1) {
          return { 'background-color': '#ebf9f0', color: 'black' }
        } else if (value * 100 > 1 && value * 100 <= 2.5) {
          return { 'background-color': '#d8f3e1', color: 'black' }
        } else if (value * 100 > 2.5 && value * 100 <= 5) {
          return { 'background-color': '#c4edd2', color: 'black' }
        } else if (value * 100 > 5) {
          return { 'background-color': '#b1e7c3', color: 'black' }
        } else if (value * 100 < 0 && value * 100 >= -1) {
          return { 'background-color': '#fdeae8', color: 'black' }
        } else if (value * 100 < -1 && value * 100 >= -2.5) {
          return { 'background-color': '#fbd4d0', color: 'black' }
        } else if (value * 100 < -2.5 && value * 100 >= -5) {
          return { 'background-color': '#f9bfb9', color: 'black' }
        } else if (value * 100 < -5) {
          return { 'background-color': '#f7aaa1', color: 'black' }
        }
        break
      case 'dark':
        if (value * 100 >= 0) {
          return { color: '#4caf50', 'background-color': 'transparent' }
        } else if (value * 100 < 0) {
          return { color: '#f44336', 'background-color': 'transparent' }
        }
    }
  }
}

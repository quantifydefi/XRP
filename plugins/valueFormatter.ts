import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import Vue from 'vue'

interface Params {
  roundTo?: number
  pre?: string
  after?: string
  useSymbol?: boolean
}
const applyCommas = (val: string) => val.replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')

function applyNumber(val: number, roundTo: number, pre: string) {
  if (val < 10 ** 3) {
    return pre + applyCommas(val.toFixed(roundTo))
  } else if (10 ** 3 <= val && val < 10 ** 6) {
    return pre + applyCommas((val / 10 ** 3).toFixed(roundTo)) + ' K'
  } else if (10 ** 6 <= val && val < 10 ** 9) {
    return pre + applyCommas((val / 10 ** 6).toFixed(roundTo)) + ' M'
  } else return pre + applyCommas((val / 10 ** 9).toFixed(roundTo)) + ' B'
}

const valueFormatter = (val: number, { roundTo = 2, pre = '', after = '', useSymbol = false }): string => {
  if (useSymbol) {
    return applyNumber(val, roundTo, pre)
  } else {
    return val === 0 ? pre + val.toFixed(2) + after : pre + applyCommas(val.toFixed(roundTo)) + after
  }
}

const copyAddressToClipboard = async (value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (e) {}
}

const setAltImageUrl = (event: any) =>
  (event.target.src = `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/generic.png`)

const imageUrlBySymbol = (symbol: string) =>
  `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${symbol.toLowerCase()}.png`

declare module '@nuxt/types' {
  interface Context {
    $f(val: number, params: Params): string
    $copyAddressToClipboard(value: string): Promise<void>
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $f(val: number, params: Params): string
    $copyAddressToClipboard(value: string): Promise<void>
    $setAltImageUrl(event: any): string
    $imageUrlBySymbol(symbol: string): string
  }
}

export default defineNuxtPlugin((context: Context) => {
  context.$f = valueFormatter
  context.$copyAddressToClipboard = copyAddressToClipboard

  Vue.prototype.$f = valueFormatter
  Vue.prototype.$copyAddressToClipboard = copyAddressToClipboard
  Vue.prototype.$setAltImageUrl = setAltImageUrl
  Vue.prototype.$imageUrlBySymbol = imageUrlBySymbol
})

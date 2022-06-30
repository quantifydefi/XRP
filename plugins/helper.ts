import { defineNuxtPlugin } from '@nuxtjs/composition-api'
import { Context } from '@nuxt/types'
import Vue from 'vue'

// Returns a formatted string with specified minimum and maximum fractional digits
const numFormat = (val: number, minFracDigits = 2, maxFracDigits = 2): string =>
  new Intl.NumberFormat('en', {
    minimumFractionDigits: minFracDigits,
    maximumFractionDigits: maxFracDigits,
  }).format(val)

function applyNumber(val: number, pre: string) {
  return val < 10 ** 3
    ? pre + numFormat(val)
    : 10 ** 3 <= val && val < 10 ** 6
    ? pre + numFormat(val / 10 ** 3) + ' K'
    : 10 ** 6 <= val && val < 10 ** 9
    ? pre + numFormat(val / 10 ** 6) + ' M'
    : pre + numFormat(val / 10 ** 9) + ' B'
}

const helper = (val: number, { minDigits = 2, maxDigits = 2, pre = '', after = '', useSymbol = false }): string => {
  if (useSymbol) {
    return applyNumber(val, pre)
  } else {
    maxDigits = maxDigits <= minDigits ? (maxDigits = minDigits) : maxDigits
    const value = numFormat(val, minDigits, maxDigits)
    return pre + value + after
  }
}

const copyAddressToClipboard = async (value: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(value)
  } catch (e) {}
}

const setAltImageUrl = (event: any) =>
  (event.target.src = `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/generic.png`)

const imageUrlBySymbol = (symbol: string | null) =>
  symbol
    ? `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${symbol.toLowerCase()}.png`
    : `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/generic.png`

const truncateAddress = (address: string, zeroIndexTo: number, endIndexMinus: number): string =>
  address ? address.slice(0, zeroIndexTo) + '...' + address.slice(address.length - endIndexMinus, address.length) : ''

export default defineNuxtPlugin((context: Context) => {
  context.$f = helper
  context.$copyAddressToClipboard = copyAddressToClipboard

  Vue.prototype.$f = helper
  Vue.prototype.$copyAddressToClipboard = copyAddressToClipboard
  Vue.prototype.$setAltImageUrl = setAltImageUrl
  Vue.prototype.$imageUrlBySymbol = imageUrlBySymbol
  Vue.prototype.$truncateAddress = truncateAddress
})

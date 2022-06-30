import Vue from 'vue'

interface Params {
  minDigits?: number
  maxDigits?: number
  pre?: string
  after?: string
  useSymbol?: boolean
}
declare module '@nuxt/types' {
  interface Context {
    $f(val: number, params: Params): string
    $copyAddressToClipboard(value: string): Promise<void>
    $truncateAddress(address: string, zeroIndexTo: number, endIndexMinus: number): string
  }
}
declare module 'vue/types/vue' {
  interface Vue {
    $f(val: number, params: Params): string
    $copyAddressToClipboard(value: string): Promise<void>
    $setAltImageUrl(event: any): string
    $imageUrlBySymbol(symbol: string): string
    $truncateAddress(address: string, zeroIndexTo: number, endIndexMinus: number): string
  }
}

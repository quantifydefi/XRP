import Vue from 'vue'

interface Params {
  roundTo?: number
  pre?: string
  after?: string
  useSymbol?: boolean
}
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

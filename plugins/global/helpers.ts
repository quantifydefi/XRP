import { Context, Plugin } from '@nuxt/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalHelper: Plugin = (context: Context, inject) => {
  inject('numberWithCommas', (n: number) => {
    const num = parseFloat(n.toFixed(2))
    return Number(num).toLocaleString('en')
  })
}
export default globalHelper

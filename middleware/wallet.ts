import { Context, Middleware } from '@nuxt/types'

// TODO: Fix middleware for client only
const walletMiddleware: Middleware = (context: Context) => {
  if (!context.store.state.wallet.isWalletConnected) {
    if (process.env.baseURL) {
      // context.redirect(process.env.baseURL)
    }
  }
}

export default walletMiddleware

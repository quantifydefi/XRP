/**
 Check if Wallet is connected (Logged in With Metamask)
 if not Redirect to home Page
 */
export default async (context) => {
  if (context.route.name === 'wallet-id') {
    const { status } = await context.store.dispatch('wallet/isWalletConnected', context)
    if (!status) {
      context.redirect(process.env.baseURL)
    }
  }
}

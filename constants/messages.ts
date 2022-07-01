export const messages = {
  tooltips: {
    healthFactor:
      'The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation.',
    loanToValueRatio:
      'The Maximum Loan-to-Value ratio represents the maximum borrowing power of a specific collateral. For example, if a collateral has a LTV of 75%, the user can borrow up to 0.75 worth of ETH in the principal currency for every 1 ETH worth of collateral.',
    liquidationThreshold:
      'This represents the threshold at which a borrow position will be considered undercollateralized and subject to liquidation for each collateral. For example, if a collateral has a liquidation threshold of 80%, it means that the loan will be liquidated when the debt value is worth 80% of the collateral value.',
    support:
      'Support level identifies the bottom price point for a specific cryptocurrency based on its recent trading history.',
    resistance: 'Resistance price levels identities a price point when a positive price trend may slow down',
    balanceHeaderDesc: `Click on a coin symbol for more metrics and information. Tokens proceeded by the letter “A” represent your borrows from the Aave protocol, for example ALINK is your borrowed LINK amount`,
    txHeaderDesc: `For Ethereum Mainnet, Polygon, Binance Smart Chain and Fantom`,
  },
}

export function useHelpers() {
  //  METHODS

  /** Formats price and adds a currency symbol **/
  function currencyFormatter(value: number, currencyCode: string, locale: string): string {
    if (value) {
      if (value >= 10) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          style: 'currency',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value)
      } else if (value <= 0.0001) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          style: 'currency',
          maximumFractionDigits: 6,
          minimumFractionDigits: 6,
        }).format(value)
      } else {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          style: 'currency',
          maximumFractionDigits: 4,
          minimumFractionDigits: 4,
        }).format(value)
      }
    } else {
      return '-.--'
    }
  }

  function priceFormatter(value: number, currencyCode: string, locale: string): string {
    if (value) {
      if (value >= 10) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value)
      } else if (value <= 0.0001) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          maximumFractionDigits: 6,
          minimumFractionDigits: 6,
        }).format(value)
      } else {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,

          maximumFractionDigits: 4,
          minimumFractionDigits: 4,
        }).format(value)
      }
    } else {
      return '-.--'
    }
  }

  /** Formats btc price with comma or dot based on locale **/
  function btcPriceFormatter(value: number, currencyCode: string, locale: string): string {
    if (value) {
      if (value > 1) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).format(value)
      } else if (value === 1) {
        return value.toString()
      } else if (value > 0 && value < 0.0000001) {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          maximumFractionDigits: 10,
          minimumFractionDigits: 10,
        }).format(value)
      } else {
        return new Intl.NumberFormat(locale, {
          currency: currencyCode,
          maximumFractionDigits: 8,
          minimumFractionDigits: 8,
        }).format(value)
      }
    } else {
      return '-.--'
    }
  }

  function ptcFormatter(value: number): string {
    if (value) {
      if (value === 0) {
        return '0'
      }

      const sign = value < 0 ? '-' : '+'
      return `${sign}${Math.abs(value).toFixed(2)}%`
    } else {
      return '-.--'
    }
  }

  return { currencyFormatter, priceFormatter, btcPriceFormatter, ptcFormatter }
}

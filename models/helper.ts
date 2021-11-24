export class Helper {
  static getTokenImage(symbol: string): string {
    return `https://quantifycrypto.s3-us-west-2.amazonaws.com/pictures/crypto-img/32/icon/${symbol.toLowerCase()}.png`
  }

  static priceFormatter(value: number): string {
    if (value > 100) {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(value)
    } else {
      return new Intl.NumberFormat('en', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 4,
        minimumFractionDigits: 4,
      }).format(value)
    }
  }

  static setAltImg(event: any) {
    event.target.src = require(`~/assets/images/generic/aave-generic.png`)
  }
}

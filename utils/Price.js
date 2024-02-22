/**
 * ==================================================================================
 * Price/Currency helper
 * ==================================================================================
 **/

import SETTINGS from '@/utils/enums/Settings'

export default (() => {
  const obj = {
    SYMBOLS: ['', 'k', 'M', 'B', 'T', 'Q', 'S', 'O', 'N', 'D'],
    formatWithComma(n, currency = SETTINGS.currency.sign, decimal = 2) {
      if (!n) {
        return `${currency}0`
      }

      const price = n % 1 !== 0 ? parseFloat(n).toFixed(decimal) : n.toString()
      return `${currency}${price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
    },

    formatToShort(n) {
      if (!n || !parseInt(n)) {
        return 0
      }

      const shortenDecimal = (value) => {
        return value % 1 !== 0
          ? +parseFloat(value).toFixed(3).slice(0, -1)
          : value
      }
      const tier = (Math.log10(Math.abs(n)) / 3) | 0

      if (tier === 0) {
        return shortenDecimal(n)
      } else {
        const suffix = this.SYMBOLS[tier]
        const scale = Math.pow(10, tier * 3)
        const scaled = n / scale

        return shortenDecimal(scaled) + suffix
      }
    }
  }

  return obj
})()

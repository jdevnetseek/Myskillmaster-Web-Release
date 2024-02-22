import PRICE from '@/utils/Price'
import SETTINGS from '@/utils/enums/Settings'

/**
 * Mock component methods & API calls
 * ==================================================================================
 */

//

/**
 * Functions
 * ==================================================================================
 */

//

/**
 * Tests
 * ==================================================================================
 */

describe('formatWithComma()', () => {
  test('should display proper currency specified', (done) => {
    const currency = 'P'
    expect(PRICE.formatWithComma(0, currency)).toBe(`${currency}0`)
    done()
  })

  test('should separate by comma', (done) => {
    const test = (price) => {
      expect(PRICE.formatWithComma(price.replaceAll(',', ''))).toBe(
        `${SETTINGS.currency.sign}${price}`
      )
    }

    test('1,000')
    test('1,000,000.42')
    test('1,000,000,000.25')

    done()
  })
})

describe('formatToShort()', () => {
  test('should shorten to thousand', (done) => {
    const test = (price, expected, suffix) => {
      expect(PRICE.formatToShort(price)).toEqual(
        suffix ? `${expected}${suffix}` : +expected
      )
    }

    test(1, 1, '')
    test(1000, 1, 'k')
    test(10000, 10, 'k')
    test(1000000, 1, 'M')
    test(10000000, 10, 'M')

    done()
  })
})

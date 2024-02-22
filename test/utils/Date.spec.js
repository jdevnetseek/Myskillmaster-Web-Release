import DATE from '@/utils/Date'

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

describe('format()', () => {
  test('should display proper format specified', (done) => {
    const test = (date, format, result) => {
      expect(DATE.format(date, format)).toBe(result)
    }

    test(new Date(0), 'MMM DD, YYYY', 'Jan 01, 1970')
    test(new Date(0), 'MM-DD-YY', '01-01-70')

    done()
  })
})

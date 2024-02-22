import PHONE from '@/utils/Phone'

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

const phNumber = '+639271234578'
const auNumber = '+61412345678'
const usNumber = '+12345678912'

describe('isValidNumber()', () => {
  test('should check for valid numbers (PH, AU and US only)', (done) => {
    const test = (number, valid) => {
      expect(PHONE.isValidNumber(number)).toBe(valid)
    }

    // PH testing
    test(phNumber, true)
    test(phNumber.replace('+', ''), true)
    test(phNumber.replace('+63', '0'), true)
    test('+631234567891', false)

    // AU testing
    test(auNumber, true)
    test(auNumber.replace('+', ''), true)
    test(auNumber.replace('+61', '0'), true)
    test('+61512345678', false)

    // US testing
    test(usNumber, true)
    test(usNumber.replace('+', ''), true)
    test(usNumber.replace('+1', ''), true)
    test('+11234567891', false)

    done()
  })
})

describe('isE164()', () => {
  test('should check for E164 format ', (done) => {
    const test = (number, valid) => {
      expect(PHONE.isE164(number)).toBe(valid)
    }

    // PH testing
    test(phNumber, true)
    test(phNumber.replace('+63', '0'), false)

    // AU testing
    test(auNumber, true)
    test(auNumber.replace('+61', '0'), false)

    // US testing
    test(usNumber, true)
    test(usNumber.replace('+1', ''), false)

    done()
  })
})

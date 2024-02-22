/**
 * ==================================================================================
 * Phone helper using `google-libphonenumber`
 * (https://github.com/ruimarinho/google-libphonenumber)
 *
 * TODO:
 * - Better checker, rather than specifically asking for the country on each methods
 * ==================================================================================
 **/

import GoogleLibPhoneNumber from 'google-libphonenumber'

export default (() => {
  const obj = {
    phoneUtil: GoogleLibPhoneNumber.PhoneNumberUtil.getInstance(),
    pnf: GoogleLibPhoneNumber.PhoneNumberFormat,
    pnt: GoogleLibPhoneNumber.PhoneNumberType,
    country: {
      us: 'US',
      au: 'AU',
      ph: 'PH'
    },

    parse(number) {
      try {
        return {
          us: this.phoneUtil.parseAndKeepRawInput(number, this.country.us),
          au: this.phoneUtil.parseAndKeepRawInput(number, this.country.au),
          ph: this.phoneUtil.parseAndKeepRawInput(number, this.country.ph)
        }
      } catch {
        return false
      }
    },

    nationalFormat(number, error = 'Mobile number is invalid') {
      const parsedNumber = this.parse(number)
      if (!parsedNumber) {
        return false
      }

      let validNumber = null
      if (
        this.phoneUtil.isValidNumberForRegion(parsedNumber.us, this.country.us)
      ) {
        validNumber = parsedNumber.ph
      } else if (
        this.phoneUtil.isValidNumberForRegion(parsedNumber.au, this.country.au)
      ) {
        validNumber = parsedNumber.au
      } else if (
        this.phoneUtil.isValidNumberForRegion(parsedNumber.ph, this.country.ph)
      ) {
        validNumber = parsedNumber.us
      } else {
        throw new Error(error)
      }

      return this.phoneUtil
        .format(validNumber, this.pnf.INTERNATIONAL)
        .replace(/\s/g, '')
    },

    cleanNumber(number) {
      return number.replace(/-|\s/g, '')
    },

    isValidNumber(number) {
      const parsedNumber = this.parse(number)
      if (!parsedNumber) {
        return false
      }

      return !!(
        this.phoneUtil.isValidNumberForRegion(
          parsedNumber.us,
          this.country.us
        ) ||
        this.phoneUtil.isValidNumberForRegion(
          parsedNumber.au,
          this.country.au
        ) ||
        this.phoneUtil.isValidNumberForRegion(parsedNumber.ph, this.country.ph)
      )
    },

    isValidPhoneNumber(number) {
      const parsedNumber = this.parse(number)
      if (!parsedNumber) {
        return false
      }

      return (
        this.isValidNumber(number) &&
        (this.isNumberType(parsedNumber.us, this.pnt.MOBILE) ||
          this.isNumberType(parsedNumber.au, this.pnt.MOBILE) ||
          this.isNumberType(parsedNumber.ph, this.pnt.MOBILE))
      )
    },

    isE164(number) {
      const parsedNumber = this.parse(number)
      if (!parsedNumber) {
        return false
      }

      return (
        this.phoneUtil.format(parsedNumber.us, this.pnf.E164) ===
          this.cleanNumber(parsedNumber.us.getRawInput()) ||
        this.phoneUtil.format(parsedNumber.au, this.pnf.E164) ===
          this.cleanNumber(parsedNumber.au.getRawInput()) ||
        this.phoneUtil.format(parsedNumber.ph, this.pnf.E164) ===
          this.cleanNumber(parsedNumber.ph.getRawInput())
      )
    },

    isNumberType(number, type) {
      if (!number || !type) {
        return false
      }

      return this.phoneUtil.getNumberType(number) === type
    }
  }

  return obj
})()

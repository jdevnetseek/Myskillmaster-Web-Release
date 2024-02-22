/**
 * ==================================================================================
 * File helper
 * ==================================================================================
 **/

import { TIMEZONES } from '@/utils/enums/Country'

export default (() => {
  const obj = {
    getCountryCode() {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      if (timezone === '' || !timezone) {
        return null
      }

      return TIMEZONES[timezone] && TIMEZONES[timezone].c.length
        ? TIMEZONES[timezone].c[0]
        : null
    }
  }

  return obj
})()

/**
 * ==================================================================================
 * Date helper using dayjs
 * (https://day.js.org/docs/en/installation/installation)
 * ==================================================================================
 **/

import FORMAT from '@/utils/enums/Format'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(isBetween)

export default (() => {
  const obj = {
    convert(date) {
      return dayjs(date).local()
    },

    timezone() {
      return Intl.DateTimeFormat().resolvedOptions().timeZone
    },

    format(date, format = FORMAT.dateFormat) {
      return this.convert(date).format(format)
    },

    humanize(date) {
      return this.convert(date).fromNow()
    },

    isSame(dateA, dateB, unit = 'minute') {
      return this.convert(dateA).isSame(this.convert(dateB), unit)
    },

    isSameOrBefore(dateA, dateB, unit = 'minute') {
      return this.convert(dateA).isSameOrBefore(this.convert(dateB), unit)
    },

    isBefore(dateA, dateB, unit = 'minute') {
      return this.convert(dateA).isBefore(this.convert(dateB), unit)
    },

    isAfter(dateA, dateB, unit = 'minute') {
      return this.convert(dateA).isAfter(this.convert(dateB), unit)
    },

    isBetween(date, dateFrom, dateTo, inclusiveOrExclusive = '()') {
      return this.convert(date).isBetween(
        this.convert(dateFrom),
        this.convert(dateTo),
        'minute',
        inclusiveOrExclusive
      )
    },

    isBetweenRange(
      dateAFrom,
      dateATo,
      dateBFrom,
      dateBTo,
      inclusiveOrExclusive = '()'
    ) {
      if (
        this.format(dateAFrom, FORMAT.laravelFormat) ===
        this.format(dateBFrom, FORMAT.laravelFormat)
      ) {
        return true
      }

      return (
        this.isBetween(dateAFrom, dateBFrom, dateBTo, inclusiveOrExclusive) ||
        this.isBetween(dateATo, dateBFrom, dateBTo, inclusiveOrExclusive) ||
        this.isBetween(dateBFrom, dateAFrom, dateATo, inclusiveOrExclusive) ||
        this.isBetween(dateBTo, dateAFrom, dateATo, inclusiveOrExclusive)
      )
    }
  }

  return obj
})()

/**
 * NOTE: We match the time period value from `dayjs`s unit value as we use
 * it to generate the recurring lesson schedules
 */

const WEEKLY = 'week'
const MONTHLY = 'month'
const CUSTOM = 'custom'

const TIME_PERIOD = [
  {
    text: 'Weekly',
    value: WEEKLY,
    max: 52
  },
  {
    text: 'Monthly',
    value: MONTHLY,
    max: 12
  },
  {
    text: 'Custom',
    value: CUSTOM,
    max: 365
  }
]

export { WEEKLY, MONTHLY, CUSTOM, TIME_PERIOD }

import { deepValue } from '@/validations/index'

export default {
  required: ({ field, plural }) => {
    return `${field} ${plural ? 'are' : 'is'} required`
  },

  email: ({ field, plural }) => {
    return `${field} must be a valid email address`
  },

  integer: ({ field, plural }) => {
    return `${field} must be a whole number`
  },

  decimal: ({ field, plural }) => {
    return `${field} must be a number`
  },

  numeric: ({ field, plural }) => {
    return `${field} must be numeric`
  },

  minLength: ({ $v, key }) => {
    const value = deepValue($v, key).$params.minLength.min
    return `Must have ${value} characters or more.`
  },
  maxLength: ({ $v, key }) => {
    const value = deepValue($v, key).$params.maxLength.max
    return `Must have ${value} characters or less.`
  },
  minValue: ({ $v, key }) => {
    const value = deepValue($v, key).$params.minValue.min
    return `Must have ${value} value or more.`
  },
  maxValue: ({ $v, key }) => {
    const value = deepValue($v, key).$params.maxValue.max
    return `Must have ${value} value or less.`
  },

  /**
   * Custom
   */
  phone: ({ field }) => `${field} must be a valid phone number`,
  mobile: ({ field }) => `${field} must be a valid mobile number`,
  e164: ({ field }) => `${field} must be on E164 format`,
  lessonScheduleConflict: ({ field }) => "You've already scheduled this slot",
  lessonScheduleMaxFrequency: ({ field }) =>
    'Should only repeat up to equal a year'
}

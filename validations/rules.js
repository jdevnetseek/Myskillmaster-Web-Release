/**
 * ==================================================================================
 * Vuelidate rules
 * (https://vuelidate.js.org/#sub-builtin-validators)
 * (https://vuelidate.js.org/#sub-regex-based-validator)
 * (https://vuelidate.js.org/#sub-locator-based-validator)
 * ==================================================================================
 **/

export default [
  'email',
  'required',
  'integer',
  'decimal',
  'numeric',
  'minLength',
  'maxLength',
  'maxValue',
  'minValue',

  /**
   * Custom
   */
  'phone',
  'mobile',
  'e164',
  'lessonScheduleConflict',
  'lessonScheduleMaxFrequency'
]

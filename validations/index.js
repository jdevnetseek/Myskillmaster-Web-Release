/**
 * ==================================================================================
 * Vuelidate
 * (https://vuelidate.js.org/#getting-started)
 * ==================================================================================
 **/

import { validationMixin } from 'vuelidate'
import messages from '@/validations/messages'
import rules from '@/validations/rules'

const deepValue = (obj, key) => {
  return key.split('.').reduce((acc, curr) => acc[curr], obj)
}

const hasError = () =>
  function(key, field, plural = false) {
    const value = deepValue(this.$v, key)

    if (!value || !value.$dirty) {
      return []
    }

    return rules.reduce((prev, curr) => {
      if (Object.prototype.hasOwnProperty.call(value, curr) && !value[curr]) {
        prev.push(messages[curr]({ $v: this.$v, key, field, plural }))
      }
      return prev
    }, [])
  }

export { deepValue, hasError, validationMixin }

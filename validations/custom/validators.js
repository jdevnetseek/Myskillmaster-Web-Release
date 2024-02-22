/**
 * ==================================================================================
 * Custom Vuelidators
 *
 * NOTE: Must also add it in the rules list (@/validations/rules) and
 * messages (@/validations/messages)
 * ==================================================================================
 **/

import PHONE from '@/utils/Phone'

const phone = (value) => {
  if (!value) {
    return false
  }
  return PHONE.isValidNumber(value)
}

const mobile = (value) => {
  if (!value) {
    return false
  }
  return PHONE.isValidPhoneNumber(value)
}

const e164 = (value) => {
  if (!value) {
    return false
  }
  return PHONE.isE164(value)
}

export { phone, mobile, e164 }

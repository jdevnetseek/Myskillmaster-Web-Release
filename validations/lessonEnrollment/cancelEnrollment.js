import { required, maxLength } from 'vuelidate/lib/validators'

export const cancelEnrollmentForm = {
  cancellation_reason: {
    required
  },
  cancellation_remarks: {
    maxLength: maxLength(500)
  }
}

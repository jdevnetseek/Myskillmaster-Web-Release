import { required, maxLength } from 'vuelidate/lib/validators'

export const cancelScheduleForm = {
  cancellation_reason: {
    required
  },
  cancellation_remarks: {
    maxLength: maxLength(500)
  }
}

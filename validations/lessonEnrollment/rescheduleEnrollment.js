import { required, maxLength } from 'vuelidate/lib/validators'

export const rescheduleEnrollmentForm = {
  new_schedule_id: {
    required
  },
  reason: {
    required
  },
  remarks: {
    required,
    maxLength: maxLength(500)
  }
}

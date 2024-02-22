import { required, maxLength } from 'vuelidate/lib/validators'

export const rescheduleScheduleForm = {
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

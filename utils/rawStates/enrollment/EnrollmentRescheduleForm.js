import State from '@/utils/rawStates/State'

const rawEnrollmentRescheduleForm = () => {
  return State({
    new_schedule_id: '',
    reason: '',
    remarks: ''
  })
}

export default rawEnrollmentRescheduleForm

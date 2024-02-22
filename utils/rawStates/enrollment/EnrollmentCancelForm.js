import State from '@/utils/rawStates/State'

const rawEnrollmentCancelForm = () => {
  return State({
    cancellation_reason: '',
    cancellation_remarks: ''
  })
}

export default rawEnrollmentCancelForm

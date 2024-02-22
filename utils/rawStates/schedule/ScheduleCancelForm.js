import State from '@/utils/rawStates/State'

const rawScheduleCancelForm = () => {
  return State({
    cancellation_reason: '',
    cancellation_remarks: ''
  })
}

export default rawScheduleCancelForm

import State from '@/utils/rawStates/State'

const rawLessonEnrollForm = () => {
  return State({
    schedule_id: '',
    to_learn: '',
    payment_method_id: ''
  })
}

export default rawLessonEnrollForm

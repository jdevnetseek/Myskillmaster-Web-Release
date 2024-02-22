import State from '@/utils/rawStates/State'

const rawScheduleRescheduleForm = () => {
  return State({
    new_schedule_id: '',
    reason: '',
    remarks: ''
  })
}

export default rawScheduleRescheduleForm

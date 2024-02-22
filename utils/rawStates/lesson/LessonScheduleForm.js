import State from '@/utils/rawStates/State'

const rawLessonScheduleForm = () => {
  return State({
    date: '',
    time: '',
    schedule_start: '',
    duration_in_hours: '',
    days: '',
    timezone: '',
    frequency: 1
  })
}

export default rawLessonScheduleForm

import State from '@/utils/rawStates/State'
import { REMOTE_OPTION_AVAILABLE } from '@/utils/enums/RemoteOption'

const rawLessonForm = () => {
  return State({
    title: '',
    lesson_price: '',
    description: '',
    category_id: '',
    is_remote_supported: REMOTE_OPTION_AVAILABLE.value,
    cover_photo: [],
    tags: [],
    lesson_schedules: [],
    suburb: '',
    postcode: '',
    state: '',
    address_or_link: ''
  })
}

export default rawLessonForm

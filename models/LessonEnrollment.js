import Model from '@/models/Model'
import Master from '@/models/Master'
import Lesson from '@/models/Lesson'
import LessonSchedule from './LessonSchedule'

export default class LessonEnrollment extends Model {
  resource() {
    return 'enrollment'
  }

  relations() {
    return {
      master_profile: Master,
      lesson: Lesson,
      schedule: LessonSchedule
    }
  }
}

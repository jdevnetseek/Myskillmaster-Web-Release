import { get } from 'lodash'
import { DATETIME_FORMAT } from '@/utils/enums/LessonSchedule'
import Model from '@/models/Model'
import Master from '@/models/Master'
import Student from '@/models/Student'
import Lesson from '@/models/Lesson'
import DATE from '@/utils/Date'
import FORMAT from '@/utils/enums/Format'

export default class LessonSchedule extends Model {
  resource() {
    return 'lesson-schedules'
  }

  get scheduleLabel() {
    return `${DATE.format(this.schedule_start, DATETIME_FORMAT)}`
  }

  get scheduleHour() {
    return (
      DATE.format(this.schedule_start, FORMAT.timeFormat) +
      ' - ' +
      DATE.format(this.schedule_end, FORMAT.timeFormat)
    )
  }

  get scheduleDate() {
    return DATE.format(this.schedule_start)
  }

  get remoteLabel() {
    return get(this.lesson, 'is_remote_supported', false)
      ? 'Remote supported'
      : 'Remote not supported'
  }

  relations() {
    return {
      master: Master,
      lesson: Lesson,
      students_enrolled: Student
    }
  }
}

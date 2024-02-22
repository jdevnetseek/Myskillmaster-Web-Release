import Model from '@/models/Model'

export default class LessonPreference extends Model {
  resource() {
    return 'auth/lesson-preferences'
  }
}

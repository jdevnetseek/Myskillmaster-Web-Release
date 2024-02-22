import { required, maxLength } from 'vuelidate/lib/validators'

export const lessonEnrollToLearn = {
  to_learn: {
    required,
    maxLength: maxLength(500)
  }
}

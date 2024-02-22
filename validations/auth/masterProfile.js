import { required } from 'vuelidate/lib/validators'

export const masterProfileForm = {
  about: {
    required
  },
  work_experiences: {
    required
  }
}

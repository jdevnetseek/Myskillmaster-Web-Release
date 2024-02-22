import { required } from 'vuelidate/lib/validators'

export const accountProfileForm = {
  first_name: {
    required
  },
  last_name: {
    required
  },
  place_id: {
    required
  },
  birthdate: {
    required
  }
}

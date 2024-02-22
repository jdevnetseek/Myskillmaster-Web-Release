import { email, required } from 'vuelidate/lib/validators'

export const signupForm = {
  email: {
    email,
    required
  },
  avatar: {},
  username: {},
  first_name: {
    required
  },
  last_name: {
    required
  },
  place_id: {
    required
  },
  password: {
    required
  },
  password_confirmation: {
    required
  }
}

import { email, required } from 'vuelidate/lib/validators'

export const loginForm = {
  email: {
    email,
    required
  },
  password: {
    required
  }
}

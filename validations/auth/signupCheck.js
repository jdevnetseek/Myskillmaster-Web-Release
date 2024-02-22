import { email, required } from 'vuelidate/lib/validators'

export const signupCheckForm = {
  email: {
    email,
    required
  }
}

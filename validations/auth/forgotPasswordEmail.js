import { email, required } from 'vuelidate/lib/validators'

export const forgotPasswordEmail = {
  email: {
    email,
    required
  }
}

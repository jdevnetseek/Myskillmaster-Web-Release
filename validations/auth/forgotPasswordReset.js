import { required } from 'vuelidate/lib/validators'

export const forgotPasswordReset = {
  token: {
    required
  },
  password: {
    required
  },
  password_confirmation: {
    required
  }
}

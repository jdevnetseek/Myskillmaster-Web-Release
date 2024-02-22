import { required } from 'vuelidate/lib/validators'

export const changePasswordForm = {
  old_password: {
    required
  },
  new_password: {
    required
  },
  new_password_confirmation: {
    required
  }
}

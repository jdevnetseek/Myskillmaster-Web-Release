import { required } from 'vuelidate/lib/validators'

export const payoutAccountForm = {
  account_name: {
    required
  },
  account_number: {
    required
  },
  account_bsb: {
    required
  }
}

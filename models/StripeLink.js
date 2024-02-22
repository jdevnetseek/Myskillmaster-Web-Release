import Model from '@/models/Model'

export default class StripeLink extends Model {
  resource() {
    return 'auth/connect/account-links'
  }
}

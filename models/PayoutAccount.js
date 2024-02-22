import Model from '@/models/Model'

export default class PayoutAccount extends Model {
  resource() {
    return 'auth/connect/external-accounts'
  }

  get last4Label() {
    return `••••• ${this.last4}`
  }
}

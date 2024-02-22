import Model from '@/models/Model'

export default class PaymentMethod extends Model {
  resource() {
    return 'auth/payment-methods'
  }

  get cardLogo() {
    return this.card
      ? require(`@/assets/icons/cards/dark/${this.card.brand.toLowerCase()}.png`)
      : null
  }

  get cardBrand() {
    return this.card ? this.card.brand : 'NA'
  }

  get cardLast4() {
    return this.card ? this.card.last4 : 'NA'
  }
}

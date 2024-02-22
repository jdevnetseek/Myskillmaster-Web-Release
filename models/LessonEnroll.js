import PRICE from '@/utils/Price'
import Model from '@/models/Model'

export default class LessonEnroll extends Model {
  resource() {
    return 'enrollment'
  }

  get priceLabel() {
    return `${PRICE.formatWithComma(this.price)}`
  }

  get feeLabel() {
    return `${PRICE.formatWithComma(this.admin_fee)}`
  }

  get totalLabel() {
    return `${PRICE.formatWithComma(this.grand_total)}`
  }
}

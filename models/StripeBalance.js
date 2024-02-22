import { get } from 'lodash'
import PRICE from '@/utils/Price'
import Model from '@/models/Model'

export default class StripeBalance extends Model {
  resource() {
    return 'auth/connect/balance'
  }

  get availableBalance() {
    return PRICE.formatWithComma(get(this, 'available.amount', 0))
  }

  get currentWeekBalance() {
    return PRICE.formatWithComma(get(this, 'current_week.total_earnings', 0))
  }

  get currentLessonsCount() {
    return get(this, 'current_week.total_lessons', 0)
  }

  get currentLessonsCountLabel() {
    const count = this.currentLessonsCount
    return `${count === 0 ? 'No' : count} class${count > 1 ? 'es' : ''}`
  }
}

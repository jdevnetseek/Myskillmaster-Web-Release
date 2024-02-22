import Model from '@/models/Model'
import { isEmpty } from 'lodash'

export default class StripeAccount extends Model {
  resource() {
    return 'auth/connect/account'
  }

  get pendingRequirements() {
    if (isEmpty(this.requirements)) {
      return false
    }

    const requirements = []
    if (this.requirements.pending_verification.length > 0) {
      requirements.push(...this.requirements.pending_verification)
    }

    if (this.requirements.currently_due.length > 0) {
      requirements.push(...this.requirements.currently_due)
    }

    if (this.requirements.past_due.length > 0) {
      requirements.push(...this.requirements.past_due)
    }

    /* Remove duplicates and payout/external reason */
    return [...new Set(requirements)]
      .filter(a => !['external_account'].includes(a))
      .map(a => a.replace(/[._]/g, ' '))
  }

  get hasRequirementDue() {
    if (isEmpty(this.requirements) || this.payouts_enabled) {
      return false
    }

    return this.pendingRequirements.length > 0
  }

  get isEnabled() {
    return !!(this.payouts_enabled && this.charges_enabled)
  }
}

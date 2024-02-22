import Model from '@/models/Model'

export default class SubscriptionPlan extends Model {
  resource() {
    return 'user/plans'
  }

  get isFreeTrial() {
    return this.recommended_for_trial && !this.avail_free_trial_before
  }
}

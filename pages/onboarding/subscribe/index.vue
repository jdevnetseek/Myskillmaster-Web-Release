<template>
  <div class="onboarding-subcribe-page screen-border">
    <div class="onboarding-subcribe-page__section pt-5">
      <h4 class="onboarding-subcribe-page__section__header">
        Go PRO
      </h4>
      <p>Become a Master and access more perks by going PRO!</p>
    </div>
    <SubscriptionPlanList page-name="onboarding-subscribe" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Onboarding: Go PRO page
 * ==================================================================================
 **/

import SubscriptionPlanList from '@/components/subscription/fields/SubscriptionPlanList'

export default {
  components: {
    SubscriptionPlanList
  },

  head() {
    return {
      title: 'Onboarding: Subscribe | '
    }
  }
}
</script>
<style scoped lang="scss">
.onboarding-subcribe-page {
  &__section {
    &:not(:last-child) {
      margin-bottom: 30px;
    }

    h4,
    h6 {
      margin-bottom: 5px;
    }

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>

<template>
  <div class="subscription-tier-page screen-border">
    <div class="subscription-tier-page__header mb-5">
      <h4>Subscription Tier</h4>
    </div>
    <div class="subscription-tier-page__border">
      <h6 class="mb-5">
        Your Subscription Details:
      </h6>
      <SubscriptionTier class="subscription-tier-page__card" />
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscription Tier page
 * ==================================================================================
 **/
import SubscriptionTier from '@/components/subscription/cards/SubscriptionTier'

export default {
  components: {
    SubscriptionTier
  },

  head() {
    return {
      title: 'Subscription Tier | '
    }
  }
}
</script>
<style scoped lang="scss">
.subscription-tier-page {
  &__border {
    max-width: 350px;
    margin: 0 auto;
  }

  &__card {
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .subscription-tier-page {
    &__border,
    &__card {
      max-width: initial;
    }
  }
}
</style>

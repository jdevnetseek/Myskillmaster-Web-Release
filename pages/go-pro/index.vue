<template>
  <div class="go-pro-page screen-border">
    <div class="go-pro-page__section">
      <h4 class="go-pro-page__section__header">
        Go PRO
      </h4>
      <p>Become a Master and access more perks by going PRO!</p>
    </div>
    <SubscriptionPlanList />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Go PRO page
 * ==================================================================================
 **/

import SubscriptionPlanList from '@/components/subscription/fields/SubscriptionPlanList'

export default {
  name: 'GoPro',
  components: {
    SubscriptionPlanList
  },

  head() {
    return {
      title: 'Go Pro | '
    }
  }
}
</script>
<style scoped lang="scss">
.go-pro-page {
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

<template>
  <div class="subscription-plan-list">
    <v-row class="justify-center">
      <template v-if="!form.$busy">
        <v-col
          v-for="(plan, index) in list.filter(data => data.is_recommended === true)"
          :key="index"
          cols="12"
          lg="8"
        >
          <SubscriptionPlanCard
            class="subscription-plan-list__item"
            :plan="plan"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="n in 1" :key="n" cols="12" md="6" lg="4">
          <SubscriptionPlanCardSkeleton class="subscription-plan-list__item" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscription Plan list
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import SubscriptionPlanCard from '@/components/subscription/fields/SubscriptionPlanList/cards/SubscriptionPlanCard.vue'
import SubscriptionPlanCardSkeleton from '@/components/subscription/fields/SubscriptionPlanList/cards/SubscriptionPlanCardSkeleton'

export default {
  components: {
    SubscriptionPlanCard,
    SubscriptionPlanCardSkeleton
  },
  mixins: [SnackbarMixin],
  computed: {
    ...mapState({
      form: state => state.subscriptionPlan.listing,
      list: state => state.subscriptionPlan.list
    })
  },

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.form.$clearErrors()
      this.$store.commit('subscriptionPlan/clearSelected')

      if (this.form.$busy) {
        return
      }

      await this.$store.dispatch('subscriptionPlan/getList').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.subscription-plan-list {
  //
}
</style>

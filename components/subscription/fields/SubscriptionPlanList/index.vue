<template>
  <div class="subscription-plan-list">
    <v-row class="justify-center">
      <template v-if="!form.$busy">
        <v-col
          v-for="(plan, index) in list"
          :key="index"
          cols="12"
          md="6"
          lg="3"
        >
          <SubscriptionPlanCard
            class="subscription-plan-list__item"
            :plan="plan"
            :page-name="pageName"
          />
        </v-col>
      </template>
      <template v-else>
        <v-col v-for="n in 3" :key="n" cols="12" md="6" lg="4">
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
import SubscriptionPlanCard from './cards/SubscriptionPlanCard'
import SubscriptionPlanCardSkeleton from './cards/SubscriptionPlanCardSkeleton'

export default {
  components: {
    SubscriptionPlanCard,
    SubscriptionPlanCardSkeleton
  },
  mixins: [SnackbarMixin],
  props: {
    pageName: {
      type: String,
      default: 'go-pro'
    }
  },

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

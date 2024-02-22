<template>
  <div class="onboarding-subscribe-page screen-border pt-5">
    <template v-if="hasPlan">
      <SubscribeForm :plan="plan" redirect-on-success="add-a-lesson-create" />
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Onboarding: Go PRO Subscribe page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { convertToSlug } from '@/utils/Helpers'
import SubscribeForm from '@/components/subscription/forms/SubscribeForm'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    SubscribeForm
  },
  mixins: [SnackbarMixin],

  head() {
    return {
      title: 'Onboarding: Subscription | '
    }
  },

  computed: {
    ...mapState({
      form: state => state.subscriptionPlan.listing,
      list: state => state.subscriptionPlan.list,
      plan: state => state.subscriptionPlan.selected
    }),

    ...mapGetters({
      hasPlan: 'subscriptionPlan/hasSelected'
    })
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (!this.hasPlan) {
        this.fetchList()
      }
    },

    /**
     * Get the subscription plan base on slug (Title)
     * Return to previous page when subscription plan isn't found or
     * user is already subscribed to it
     */
    findPlan() {
      const title = convertToSlug(this.$route.params.slug, false)
      let currentPlan = null

      for (const plan of this.list) {
        if (convertToSlug(plan.name) === title) {
          currentPlan = plan
          break
        }
      }

      if (!currentPlan) {
        this.goBack(
          'Sorry, the subscription plan is invalid or is not available anymore'
        )
      } else if (currentPlan.is_subscribed) {
        this.goBack("Sorry, you're already subscribed to this plan")
      } else {
        this.$store.commit('subscriptionPlan/setSelected', currentPlan)
      }
    },

    async fetchList() {
      this.form.$clearErrors()

      if (this.form.$busy) {
        return
      }

      await this.$store.dispatch('subscriptionPlan/getList').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        } else {
          this.findPlan()
        }
      })
    },

    goBack(message) {
      this.$router.replace({
        name: 'go-pro'
      })

      this.showSnackbar(message, false)
    }
  }
}
</script>
<style scoped lang="scss">
.onboarding-subscribe-page {
  //
}
</style>

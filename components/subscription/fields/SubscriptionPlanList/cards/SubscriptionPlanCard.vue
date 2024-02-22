<template>
  <div
    class="subscription-plan-card"
    :class="{
      'subscription-plan-card--homepage': isHomePageRecommended,
      'subscription-plan-card--recommended': plan.is_recommended,
    }"
  >
    <ConfirmationModal
      v-model="showModal"
      title=""
      content="You will still have access to your account up until the end of the billing period. Would you like to unsubscribe?"
      confirm-label="Unsubscribe"
      @confirm="unsubscribe"
    />
    <div v-if="daysRemainingLabel" class="subscription-plan-card__free-trial">
      <p class="text-body-2">
        {{ daysRemainingLabel }}
      </p>
    </div>
    <div class="subscription-plan-card__header">
      <div class="mb-2 d-flex flex-row flex-row justify-space-between">
        <h5 class="mb-0">
          {{ plan.name }}
        </h5>
        <RecommendedLabel class="subscription-plan-card__header__recommended" />
      </div>
      <!-- <p>{{ plan.description }}</p> -->
    </div>
    <ul class="subscription-plan-card__list">
      <li
        v-for="(feature, index) in plan.plan_features"
        :key="index"
        class="d-flex flex-row align-center justify-space-between"
      >
        <p>{{ feature }}</p>
        <BenefitIcon :is-selected="plan.is_recommended" :is-benefit="true" />
      </li>
    </ul>
    <div class="subscription-plan-card__footer d-flex flex-column align-center">
      <div class="d-flex flex-row justify-center align-end">
        <h1>{{ totalPrice }}</h1>
        <h6>{{ currency }}</h6>
      </div>
      <v-btn
        :disabled="hasSubscribed"
        :text="hasSubscribed"
        color="primary"
        depressed
        @click="subscribe"
      >
        {{ buttonLabel }}
      </v-btn>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Subscription Plan Card
 * ==================================================================================
 **/

import { mapGetters, mapState } from 'vuex'
import { convertToSlug } from '@/utils/Helpers'
import SETTINGS from '@/utils/enums/Settings'
import PRICE from '@/utils/Price'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import RecommendedLabel from '../fields/RecommendedLabel'
import BenefitIcon from '../fields/BenefitIcon'

export default {
  components: {
    RecommendedLabel,
    BenefitIcon,
    ConfirmationModal
  },
  mixins: [SnackbarMixin],
  props: {
    plan: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      default: 'go-pro'
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    ...mapState({
      unsubscribeForm: state => state.subscription.unsubscribe
    }),
    ...mapGetters({
      user: 'user/getUser',
      isLoggedIn: 'user/isLoggedIn'
    }),

    subscriptionDetails() {
      return (this.hasSubscribed ? this.plan.subscription_details : null) || {}
    },

    totalPrice() {
      return this.hasPrice
        ? `${PRICE.formatWithComma(this.plan.price)}`
        : 'FREE'
    },

    currency() {
      return this.hasPrice ? SETTINGS.currency.label : ''
    },

    buttonLabel() {
      if (this.hasSubscribed) {
        return '(Current tier)'
      }

      if (this.plan.isFreeTrial) {
        return 'Free Trial'
      }

      if (!this.user.is_subscribed && !this.hasPrice) {
        return '(Current tier)'
      }

      return this.isLoggedIn && this.user.is_subscribed
        ? 'Choose tier'
        : 'Get Started'
    },

    daysRemainingLabel() {
      if (!this.hasSubscribed || !this.plan.isFreeTrial) {
        return false
      }

      return `Free trial (${this.subscriptionDetails.trial_remaining_days} day${
        this.subscriptionDetails.trial_remaining_days > 1 ? 's' : ''
      } remaining)`
    },

    hasPrice() {
      return parseFloat(this.plan.price) > 0
    },

    hasSubscribed() {
      if (!this.hasPrice && !this.user.is_subscribed) {
        return true
      }
      return this.plan.is_subscribed
    },

    isHomePageRecommended() {
      return (
        ['index', 'search'].includes(this.$route.name) &&
        this.plan.is_recommended
      )
    }
  },

  methods: {
    toggleConfirmation() {
      this.showModal = !this.showModal
    },
    async unsubscribe() {
      if (this.unsubscribeForm.$busy) {
        return
      }

      this.unsubscribeForm.$clearErrors()

      await this.$store.dispatch('subscription/unsubscribe').then(() => {
        if (!this.unsubscribeForm.$hasErrors()) {
          this.showSnackbar('Unsubscription was successful!')
          this.$router.push({ name: 'subscription-tier' })
        } else {
          this.showSnackbar(this.unsubscribeForm.$errorMessage, false)
        }
      })
    },
    subscribe() {
      if (!this.hasPrice) {
        return this.toggleConfirmation()
      }
      this.$store.commit('subscriptionPlan/setSelected', this.plan)
      this.$router.push({
        name: `${this.pageName}-slug`,
        params: {
          slug: convertToSlug(this.plan.name)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.subscription-plan-card {
  position: relative;
  background: #fafafa;
  border: 1px solid #ececec;
  border-radius: 16px;
  padding: 30px 20px;

  &__free-trial {
    $margin: 10px;
    position: absolute;
    top: $margin;
    right: $margin;
  }

  &__header {
    h5 {
      font-size: 20px;
    }

    &__recommended {
      display: none;
    }
  }

  &__list {
    display: flex;
    flex-direction: column;
    list-style: none;
    padding-left: 0;
    padding-top: 20px;
    margin: 20px auto;
    border-top: 1px solid rgba(10, 33, 39, 0.25);

    li {
      &:not(:last-child) {
        margin-bottom: 15px;
      }

      > * {
        margin-bottom: 0;
      }
    }
  }

  &__footer {
    h1 {
    }

    h6 {
      line-height: 30px;
    }

    .v-btn {
      min-width: 230px;
      margin-top: 30px;

      &--disabled {
        color: $regular-text !important;
      }
    }
  }
}

.subscription-plan-card--recommended {
  background: #ffeeb4;

  .subscription-plan-card__header {
    &__recommended {
      display: flex;
    }
  }
}

.subscription-plan-card--homepage {
  background: #fff;

  .subscription-plan-card__header {
    &__recommended {
      background: #ffeeb4;
      display: flex;
    }
  }
}
</style>

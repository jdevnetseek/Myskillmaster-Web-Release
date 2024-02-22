<template>
  <div v-if="hasLesson" class="enroll-lesson-form screen-border">
    <div class="enroll-lesson-form__border">
      <div class="enroll-lesson-form__header">
        <h5 v-if="header" class="mb-3">
          {{ header }}
        </h5>
      </div>
      <div class="enroll-lesson-form__fields">
        <template v-if="onSchedule">
          <LessonScheduleField ref="scheduleField" />
        </template>
        <template v-if="onReason">
          <ToLearnField ref="toLearnField" />
        </template>
        <template v-if="onPrice">
          <PriceField ref="priceField" />
        </template>
        <template v-if="onPayment">
          <PaymentField
            ref="paymentField"
            class="enroll-lesson-form__fields__payment"
            @in-form="togglePaymentForm"
          />
        </template>
      </div>
      <div class="enroll-lesson-form__actions">
        <v-btn
          class="enroll-lesson-form__actions__submit"
          :disabled="form.$busy || inPaymentForm"
          :loading="form.$busy"
          color="primary"
          depressed
          @click="submit()"
        >
          {{ buttonLabel }}
        </v-btn>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Enroll Lesson Form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import LessonScheduleField from './fields/LessonScheduleField'
import ToLearnField from './fields/ToLearnField'
import PriceField from './fields/PriceField'
import PaymentField from './fields/PaymentField'

const MAX_STEP = 4
const MIN_STEP = 1

export default {
  components: {
    LessonScheduleField,
    ToLearnField,
    PriceField,
    PaymentField
  },
  mixins: [validationMixin, SnackbarMixin],
  props: {
    currentStep: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      inPaymentForm: false
    }
  },

  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lessonEnroll,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    }),

    header() {
      if (this.onSchedule) {
        return 'Pick a time slot'
      } else if (this.onReason) {
        return 'What do you want to learn from this lesson?'
      } else if (this.onPrice) {
        return 'Enroll lesson: Confirmation'
      } else {
        return 'Payment method'
      }
    },

    buttonLabel() {
      if (this.onSchedule || this.onReason) {
        return 'Continue'
      } else if (this.onPrice) {
        return 'Continue to payment method'
      } else {
        return 'Pay'
      }
    },

    field() {
      if (this.onSchedule) {
        return this.$refs.scheduleField
      } else if (this.onReason) {
        return this.$refs.toLearnField
      } else if (this.onPrice) {
        return this.$refs.priceField
      } else {
        return this.$refs.paymentField
      }
    },

    onSchedule() {
      return this.currentStep === MIN_STEP
    },

    onReason() {
      return this.currentStep === 2
    },

    onPrice() {
      return this.currentStep === 3
    },

    onPayment() {
      return this.currentStep === MAX_STEP
    }
  },

  methods: {
    togglePaymentForm(value) {
      this.inPaymentForm = value
    },

    async submit() {
      this.field.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.field.$v.$invalid) {
        if (this.onSchedule) {
          this.goToStep('to-learn')
        } else if (this.onReason) {
          this.goToStep('price')
        } else if (this.onPrice) {
          this.goToStep('payment')
        } else {
          await this.$store
            .dispatch('lesson/enrollLesson', {
              id: this.lesson.id,
              ...this.form.$data()
            })
            .then((response) => {
              if (!this.form.$hasErrors()) {
                console.log(response)
                this.$gtm.push({ event: 'enrollment', ...response.data.analytics })
                this.goToStep('success')
              } else {
                this.showSnackbar(this.form.$errorMessage, false)
              }
            })
        }
      }
    },

    goToStep(step) {
      this.$router.push({
        name: `lessons-slug-enroll-${step}`,
        params: {
          slug: this.lesson.slug
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.enroll-lesson-form {
  &__border {
    max-width: 770px;
    margin: 0 auto;
  }

  &__fields {
    margin-bottom: 20px;
  }

  &__actions {
    &__submit {
      width: 100%;
    }
  }
}
</style>

<template>
  <v-form
    v-if="hasLesson"
    class="reschedule-enrollment-form"
    @submit.prevent="submit"
  >
    <div class="reschedule-enrollment-form__header">
      <slot name="header-before" />
      <h4 class="mb-6">
        Reschedule Lesson
      </h4>
      <slot name="header-after" />
    </div>

    <div class="reschedule-enrollment-form__fields">
      <v-row>
        <v-col cols="12" class="mt-4">
          <label>Reason for rescheduling</label>
          <SelectCancel
            v-model="form.reason"
            flat
            filled
            hide-details="auto"
            placeholder="Choose reason for rescheduling"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('reason') || hasError('form.reason', 'Reason')
            "
          />
        </v-col>

        <v-col cols="12" class="mt-4">
          <label>New schedule</label>
          <SelectSchedule
            v-model="form.new_schedule_id"
            flat
            filled
            hide-details="auto"
            :schedules="lesson.lesson_schedules"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('new_schedule_id') ||
                hasError('form.new_schedule_id', 'Schedule')
            "
          />
        </v-col>

        <v-col cols="12" class="mt-4">
          <label>Additional comment</label>
          <v-textarea
            v-model="form.remarks"
            type="text"
            flat
            filled
            hide-details="auto"
            placeholder="Additional comment"
            :no-resize="true"
            :maxlength="500"
            :counter="500"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('remarks') || hasError('form.remarks', 'Remarks')
            "
          />
        </v-col>
      </v-row>
    </div>

    <div class="reschedule-enrollment-form">
      <v-row>
        <v-col cols="6">
          <v-btn
            color="#E6F1F1"
            class="reschedule-enrollment-form__btn"
            depressed
            align="right"
            :disabled="form.$busy"
            :loading="form.$busy"
            @click="discardButton"
          >
            Discard
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn
            color="primary"
            class="reschedule-enrollment-form__btn"
            depressed
            type="submit"
            align="right"
            :disabled="form.$busy"
            :loading="form.$busy"
            @click="submit"
          >
            Reschedule
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script>
/**
 * ==================================================================================
 * Reschedule lesson enrollment form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { rescheduleEnrollmentForm } from '@/validations/lessonEnrollment/rescheduleEnrollment'
import SelectCancel from '@/components/fields/SelectCancel'
import SelectSchedule from '@/components/lessons/fields/SelectSchedule'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    SelectCancel,
    SelectSchedule
  },
  mixins: [validationMixin, SnackbarMixin],

  computed: {
    hasError,
    ...mapState({
      form: state => state.lessonEnrollment.enrollmentReschedule,
      enrollment: state => state.lessonEnrollment.lessonEnrollmentDetails,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  methods: {
    discardButton() {
      history.back()
    },

    reset() {
      this.$v.$reset()
      this.form.$reset()
    },

    async submit() {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('lessonEnrollment/rescheduleEnrollment', {
            referenceCode: this.enrollment.reference_code,
            form: this.form.$data()
          })
          .then(() => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            } else {
              this.reset()
              this.showSnackbar('Successfully re-scheduled your lesson')
              this.$router.push({
                name: 'my-lessons'
              })
            }
          })
      }
    }
  },

  validations() {
    return {
      form: rescheduleEnrollmentForm
    }
  }
}
</script>

<style lang="scss" scoped>
.reschedule-enrollment-form {
  max-width: 600px;
  margin: 0 auto;

  &__btn {
    min-width: 100% !important;
  }

  &__fields {
    margin-bottom: 25px;

    & label {
      font-weight: 700;
    }

    & p {
      font-size: 14px;
      font-weight: 400;
    }

    .col {
      padding-bottom: 0;
    }
  }

  &__actions {
    margin-top: 30px;

    &__submit {
    }
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .reschedule-enrollment-form {
    &__header {
      text-align: left;

      > * {
        font-size: 22px;
      }
    }
  }
}
</style>

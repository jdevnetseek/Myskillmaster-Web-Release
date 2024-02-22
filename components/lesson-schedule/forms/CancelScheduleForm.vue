<template>
  <v-form class="cancel-schedule-form" @submit.prevent="submit">
    <div class="cancel-schedule-form__header">
      <slot name="header-before" />
      <h4 class="mb-6">
        Cancel Lesson
      </h4>
      <slot name="header-after" />
    </div>

    <div class="cancel-schedule-form__fields">
      <v-row>
        <v-col cols="12" class="mt-4">
          <label>Reason for canceling</label>
          <SelectCancel
            v-model="form.cancellation_reason"
            flat
            filled
            hide-details="auto"
            :disabled="form.$busy"
            :error-messages="
              form.$getError('cancellation_reason') ||
                hasError('form.cancellation_reason', 'Reason')
            "
          />
        </v-col>

        <v-col cols="12" class="mt-4">
          <label>Additional comment</label>
          <v-textarea
            v-model="form.cancellation_remarks"
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
              form.$getError('cancellation_remarks') ||
                hasError('form.cancellation_remarks', 'Remarks')
            "
          />
        </v-col>
      </v-row>
    </div>

    <div class="cancel-schedule-form__actions">
      <v-row>
        <v-col cols="6">
          <v-btn
            color="#E6F1F1"
            class="cancel-schedule-form__btn"
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
            class="cancel-schedule-form__btn"
            depressed
            type="submit"
            align="right"
            :disabled="form.$busy"
            :loading="form.$busy"
            @click="submit"
          >
            Cancel Schedule
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-form>
</template>
<script>
/**
 * ==================================================================================
 * Cancel lesson schedule form
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { cancelScheduleForm } from '@/validations/lessonSchedule/cancelSchedule'
import SelectCancel from '@/components/fields/SelectCancel'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    SelectCancel
  },
  mixins: [validationMixin, SnackbarMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.lessonSchedule.scheduleCancel,
      schedule: state => state.lessonSchedule.lessonScheduleDetails
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

    async submit(e) {
      this.$v.$touch()
      this.form.$clearErrors()

      if (!this.form.$busy && !this.$v.$invalid) {
        await this.$store
          .dispatch('lessonSchedule/cancelSchedule', {
            scheduleId: this.schedule.id,
            form: this.form.$data()
          })
          .then((schedule) => {
            if (this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            } else {
              this.reset()
              this.showSnackbar('Successfully cancelled the schedule')
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
      form: cancelScheduleForm
    }
  }
}
</script>

<style lang="scss" scoped>
.cancel-schedule-form {
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
  .cancel-schedule-form {
    &__header {
      text-align: left;

      > * {
        font-size: 22px;
      }
    }
  }
}
</style>

<template>
  <div v-if="hasLesson" class="price-field">
    <LessonBanner
      :images="lesson.cover_photo"
      :is-small="true"
      class="price-field__banner"
    />
    <div class="price-field__details">
      <div
        v-for="(pricing, index) in prices"
        :key="index"
        class="price-field__details__price d-flex justify-space-between"
      >
        <div>
          <p>{{ pricing.header }}</p>
          <caption
            v-for="(subheader, subIndex) in pricing.subheaders"
            :key="subIndex"
          >
            {{
              subheader
            }}
          </caption>
        </div>
        <h6>{{ pricing.price }}</h6>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Price Field
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { find } from 'lodash'
import { DATETIME_FORMAT } from '@/utils/enums/LessonSchedule'
import DATE from '@/utils/Date'
import LessonBanner from '@/components/lessons/common/LessonBanner'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    LessonBanner
  },
  mixins: [validationMixin, SnackbarMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lesson,
      enrollForm: state => state.lesson.lessonEnroll,
      lesson: state => state.lesson.lessonDetails,
      lessonEnroll: state => state.lesson.lessonEnrollDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails',
      hasLessonEnroll: 'lesson/hasLessonEnrollDetails'
    }),

    prices() {
      return this.hasLessonEnroll
        ? [
            {
              header: this.lesson.title,
              subheaders: [
                `Schedule: ${this.schedule}`,
                `Master: ${this.lesson.master_profile.name}`,
                `Address: ${this.lesson.addressLabel}`
              ],
              price: this.lessonEnroll.priceLabel
            },
            {
              header: 'Fee',
              price: this.lessonEnroll.feeLabel
            },
            {
              header: 'Total',
              price: this.lessonEnroll.totalLabel
            }
          ]
        : []
    },

    schedule() {
      const schedule = find(this.lesson.lesson_schedules, {
        id: this.enrollForm.schedule_id
      })

      return schedule
        ? `${DATE.format(schedule.schedule_start, DATETIME_FORMAT)} (${
            schedule.lesson_duration
          } hr${schedule.lesson_duration > 1 ? 's' : ''})`
        : 'NA'
    }
  },

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      this.form.$clearErrors()

      if (this.hasLesson && !this.form.$busy) {
        await this.$store
          .dispatch('lesson/getEnrollDetails', {
            lesson_id: this.lesson.id
          })
          .then(() => {
            if (!this.form.$hasErrors()) {
              this.showSnackbar(this.form.$errorMessage, false)
            }
          })
      }
    }
  },

  validations() {
    return {}
  }
}
</script>
<style scoped lang="scss">
.price-field {
  &__details {
    margin-top: 25px;

    $margin: 20px;
    &__price {
      margin-bottom: $margin;

      &:last-child {
        padding-bottom: $margin;
        margin-bottom: $margin * 2;
        border-bottom: 1px solid $border-color;
      }

      p,
      caption,
      h6 {
        margin-bottom: 0;
      }

      caption {
        display: block;
        text-align: left;
        margin-top: 3px;
      }
    }
  }
}
</style>

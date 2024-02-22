<template>
  <div class="lesson-schedule-list">
    <h6
      class="lesson-schedule-list__btn d-inline-flex align-center mb-4"
      @click="toggleAdd"
    >
      <v-icon color="primary">
        mdi-plus
      </v-icon>
      Add lesson schedule
    </h6>
    <div class="lesson-schedule-list__list">
      <template v-if="form.lesson_schedules.length > 0">
        <LessonScheduleItem
          v-for="(schedule, index) in form.lesson_schedules"
          :key="index"
          :schedule="schedule"
          :error-messages="
            form.$getError(`lesson_schedules.${index}.schedule_start`)
          "
          class="lesson-schedule-list__list__item"
          @deleted="onDelete(`lesson_schedules.${index}.schedule_start`)"
        />
      </template>
      <template v-else>
        <div class="lesson-schedule-list__placeholder">
          <p class="mb-0">
            No schedules found
          </p>
        </div>
      </template>
    </div>
    <LessonScheduleForm v-model="showScheduleForm" :duration-hours="durationHours" />
    <ErrorMessage :error="errorMessages" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Schedule List
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import ErrorMessage from '@/components/fields/ErrorMessage'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import LessonScheduleItem from './fields/LessonScheduleItem'
import LessonScheduleForm from './forms/LessonScheduleForm'

export default {
  components: {
    LessonScheduleItem,
    LessonScheduleForm,
    ErrorMessage
  },
  mixins: [SnackbarMixin],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    errorMessages: {
      type: [String, Array],
      default: null
    },

    durationHours: {
      type: Number,
      default: 0
    }

  },

  data() {
    return {
      showScheduleForm: false
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      forUpdate: 'lesson/hasLessonDetails'
    })
  },

  watch: {
    'lesson.lesson_schedules'() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.forUpdate) {
        this.form.lesson_schedules = this.lesson.lesson_schedules || []
      } else {
        this.reset()
      }
    },

    reset() {
      /**
       * NOTE: Weird issue where the list doesn't get cleared (empty array)
       * w/o the next tick.
       */
      this.$nextTick(() => {
        this.form.lesson_schedules = []
      })
    },

    toggleAdd() {
      this.showScheduleForm = !this.showScheduleForm
    },

    onDelete(schedule) {
      if (Object.prototype.hasOwnProperty.call(this.form.$errors, schedule)) {
        delete this.form.$errors[schedule]
      }
    }
  }
}
</script>
<style scoped lang="scss">
.lesson-schedule-list {
  &__btn {
    display: inline-block;
    color: $primary;
    cursor: pointer;
  }

  &__placeholder {
    margin: 40px 0;
    text-align: center;

    > * {
      font-style: italic;
    }
  }

  &__list {
    max-height: 600px;
    overflow: hidden auto;

    &__item {
      &:not(:last-child) {
        margin-bottom: 15px;
      }
    }
  }
}
</style>

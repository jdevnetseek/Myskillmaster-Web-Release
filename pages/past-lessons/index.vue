<template>
  <div class="past-lessons screen-border">
    <v-card flat>
      <template v-if="!isEmpty">
        <LessonsList
          key="past-lessons"
          header="Past Lessons"
          :loading="pastLessonsLoading"
          :list="pastLessons"
          :orientation="orientation "
          :type="enrollmentType"
          :has-rating="false"
          @lesson-clicked="goToStudentLesson"
        />
        <LessonsList
          key="master-past-lessons"
          class="mt-6"
          header="Past Lessons Taught"
          :loading="masterPastLessonsLoading"
          :list="masterPastLessons"
          :orientation="orientation "
          :type="scheduleType"
          :has-rating="false"
          @lesson-clicked="goToMasterLesson"
        />
      </template>
      <template v-else-if="!isLoading">
        <div class="past-lessons__empty">
          <h5 class="mb-8">
            Past Lessons
          </h5>
          <p class="mb-0">
            No lessons found
          </p>
        </div>
      </template>
    </v-card>
  </div>
</template>
<script>
import { LANDSCAPE } from '@/utils/enums/Orientation'
import { ENROLLMENT, SCHEDULE } from '@/utils/enums/LessonCardType'
import LessonsList from '@/components/lessons/common/LessonsList'
export default {
  name: 'PastLessonsPage',

  components: {
    LessonsList
  },

  data() {
    return {
      masterPastLessons: [],
      masterPastLessonsLoading: false,
      pastLessonsLoading: false,
      pastLessons: []
    }
  },

  head() {
    return {
      title: 'Past Lessons | '
    }
  },

  computed: {
    orientation() {
      return LANDSCAPE
    },
    enrollmentType() {
      return ENROLLMENT
    },
    isEmpty() {
      return !this.pastLessons.length && !this.masterPastLessons.length
    },
    isLoading() {
      return this.pastLessonsLoading && this.masterPastLessonsLoading
    },
    scheduleType() {
      return SCHEDULE
    }
  },

  created() {
    this.getPastLessons()
    this.getMasterPastLessons()
  },

  methods: {
    async getPastLessons() {
      this.pastLessonsLoading = true
      try {
        const response = await this.$axios.$get('/student/past/lessons')
        this.pastLessons = response.data
      } catch (err) {
        this.showSnackbar('Unable to retrieve previous lessons', false)
      } finally {
        this.pastLessonsLoading = false
      }
    },
    async getMasterPastLessons() {
      this.masterPastLessonsLoading = true
      try {
        const response = await this.$axios.$get('/master/past/lessons')
        this.masterPastLessons = response.data
      } catch (err) {
        this.showSnackbar('Unable to retrieve previous lessons taught', false)
      } finally {
        this.masterPastLessonsLoading = false
      }
    },
    goToStudentLesson(lesson) {
      this.$router.push({
        name: 'past-lessons-student-reference_code',
        params: {
          reference_code: lesson.reference_code
        }
      })
    },
    goToMasterLesson(lesson) {
      this.$router.push({
        name: 'past-lessons-master-scheduleId',
        params: {
          scheduleId: lesson.id
        }
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.past-lessons {
  &__empty {
    p {
      text-align: center;
      margin: auto 0;
      font-style: italic;
    }
  }
}
</style>

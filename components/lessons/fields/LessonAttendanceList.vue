<template>
  <!-- Show list/list skeleton if loading or not empty -->
  <div
    v-if="list.length || isLoading"
    class="attendance-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div
      class="attendance-list__header d-flex justify-space-between align-center mb-3"
    >
      <h5>{{ header }}</h5>
    </div>
    <v-row class="attendance-list__list">
      <template v-if="list.length > 0">
        <v-col
          v-for="(enrollment, index) in list"
          :key="index"
          cols="12"
          md="6"
        >
          <LessonCard
            :orientation="landscape"
            :lesson="enrollment"
            :type="type"
            class="attendance-list__list__item"
            @click="goToLesson(enrollment)"
          />
        </v-col>
      </template>
      <template v-if="isLoading">
        <v-col v-for="n in skeletonCount" :key="n" cols="12" md="6">
          <LessonCardSkeleton :orientation="landscape" />
        </v-col>
      </template>
    </v-row>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Lesson Attendance List
 * ==================================================================================
 **/

import { LANDSCAPE } from '@/utils/enums/Orientation'
import { ENROLLMENT } from '@/utils/enums/LessonCardType'
import LessonCard from '@/components/lessons/cards/LessonCard'
import LessonCardSkeleton from '@/components/lessons/cards/LessonCardSkeleton'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'LessonAttendanceList',

  components: {
    LessonCard,
    LessonCardSkeleton
  },

  mixins: [SnackbarMixin],

  props: {
    header: {
      type: String,
      default: 'Did you attend this lesson?'
    },

    skeletonCount: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 0
      }
    },

    hasScreenMargin: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      isLoading: false,
      list: []
    }
  },

  computed: {
    landscape() {
      return LANDSCAPE
    },

    type() {
      return ENROLLMENT
    }
  },

  mounted() {
    this.getFinishedLessons()
  },

  methods: {
    goToLesson(enrollment) {
      this.$router.push({
        name: 'my-lessons-to-learn-reference_code',
        params: {
          reference_code: enrollment.reference_code
        }
      })
    },
    async getFinishedLessons() {
      this.isLoading = true
      try {
        const response = await this.$axios.$get('/finished/lessons')
        this.list = response.data
      } catch (err) {
        this.showSnackbar('Unable to retrieve previous lessons', false)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.attendance-list {
  &__header {
    &__btn {
      display: inline-block;
      color: $primary;
      cursor: pointer;
    }
  }

  &__list {
    &__item {
      cursor: pointer;
    }
  }
}
</style>

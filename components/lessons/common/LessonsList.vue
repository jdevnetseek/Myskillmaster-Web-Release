<template>
  <div
    v-if="list.length || loading"
    class="lessons-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div
      class="lessons-list__header d-flex justify-space-between align-center mb-3"
    >
      <h5>{{ header }}</h5>
    </div>
    <v-row class="lessons-list__list">
      <template v-if="list.length > 0">
        <v-col
          v-for="(lesson, index) in list"
          :key="index"
          cols="12"
          md="6"
        >
          <LessonCard
            :orientation="landscape"
            :lesson="lesson"
            :type="type"
            :has-rating="hasRating"
            class="lessons-list__list__item"
            @click="$emit('lesson-clicked', lesson)"
          />
        </v-col>
      </template>
      <template v-if="loading">
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
 * Lessons List
 * ==================================================================================
 **/

import { LANDSCAPE } from '@/utils/enums/Orientation'
import LessonCard from '@/components/lessons/cards/LessonCard'
import LessonCardSkeleton from '@/components/lessons/cards/LessonCardSkeleton'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'LessonList',

  components: {
    LessonCard,
    LessonCardSkeleton
  },

  mixins: [SnackbarMixin],

  props: {
    header: {
      type: String,
      default: ''
    },

    skeletonCount: {
      type: Number,
      default: 4,
      validator(value) {
        return value > 0
      }
    },

    hasRating: {
      type: Boolean,
      default: true
    },

    hasScreenMargin: {
      type: Boolean,
      default: true
    },

    loading: {
      type: Boolean,
      default: false
    },

    list: {
      type: Array,
      default: () => ([])
    },

    type: {
      type: String,
      default: 'lesson'
    },

    orientation: {
      type: String,
      default: 'landscape'
    }
  },

  computed: {
    landscape() {
      return LANDSCAPE
    }
  }
}
</script>
<style scoped lang="scss">
.lessons-list {
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

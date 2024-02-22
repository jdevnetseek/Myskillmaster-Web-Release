<template>
  <div
    class="my-lesson-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div
      class="my-lesson-list__header d-flex justify-space-between align-center mb-3"
    >
      <h5>{{ header }}</h5>
      <v-btn
        v-if="canAdd"
        color="primary"
        class="my-lesson-list__header__btn"
        @click="goToAdd"
      >
        <v-icon left>
          mdi-plus
        </v-icon>
        Add new lesson
      </v-btn>
    </div>
    <v-row
      v-infinite-scroll="fetch"
      :infinite-scroll-disabled="form.$busy"
      :infinite-scroll-immediate-check="true"
      class="my-lesson-list__list"
    >
      <template v-if="list.length > 0">
        <v-col v-for="(lesson, index) in list" :key="index" cols="12" md="6">
          <LessonCard
            :orientation="landscape"
            :lesson="lesson"
            class="my-lesson-list__list__item"
            @click="
              $router.push({
                name: 'lessons-slug',
                params: {
                  slug: lesson.slug,
                },
              })
            "
          />
        </v-col>
      </template>
      <template v-else-if="!form.$busy">
        <div class="my-lesson-list__list__placeholder">
          <p class="mb-0">
            No lessons found
          </p>
        </div>
      </template>
      <template v-if="form.$busy">
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
 * My Lesson List
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { LANDSCAPE } from '@/utils/enums/Orientation'
import SETTINGS from '@/utils/enums/Settings'
import LessonCard from '@/components/lessons/cards/LessonCard'
import LessonCardSkeleton from '@/components/lessons/cards/LessonCardSkeleton'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    LessonCard,
    LessonCardSkeleton
  },
  mixins: [SnackbarMixin],
  props: {
    header: {
      type: String,
      default: 'Listed Lessons'
    },

    fetchFilter: {
      type: Object,
      default: () => {}
    },

    limit: {
      type: Number,
      default: SETTINGS.pagination.itemsPerScroll,
      validator(value) {
        return value > 0
      }
    },

    include: {
      type: Array,
      default: () => ['cover', 'user.masterProfile', 'user.address']
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
    },

    canAdd: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.listing,
      list: state => state.lesson.list,
      meta: state => state.lesson.listMeta
    }),

    landscape() {
      return LANDSCAPE
    }
  },

  async mounted() {
    await this.fetch(1, true)
  },

  methods: {
    goToAdd() {
      this.$router.push({
        name: 'add-a-lesson-create'
      })
    },

    async fetch(page = null, initial = false) {
      this.form.$clearErrors()

      if (
        !initial &&
        (this.form.$busy || this.meta.current_page === this.meta.last_page)
      ) {
        return
      }

      const params = {
        ...this.fetchFilter,
        include: this.include,
        page: page || Math.min(this.meta.current_page + 1, this.meta.last_page),
        limit: this.limit,
        concat: true
      }

      await this.$store.dispatch('lesson/getList', params).then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.my-lesson-list {
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

    &__placeholder {
      width: 100%;
      text-align: center;
      margin: 40px auto;

      > * {
        font-style: italic;
      }
    }
  }
}
</style>

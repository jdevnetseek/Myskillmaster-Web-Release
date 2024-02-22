<template>
  <div
    class="my-enrollment-list"
    :class="{
      'screen-border': hasScreenMargin,
    }"
  >
    <div
      class="my-enrollment-list__header d-flex justify-space-between align-center mb-3"
    >
      <h5>{{ header }}</h5>
    </div>
    <v-row
      v-infinite-scroll="fetch"
      :infinite-scroll-disabled="form.$busy"
      class="my-enrollment-list__list"
    >
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
            class="my-enrollment-list__list__item"
            @click="
              $router.push({
                name: 'my-lessons-to-learn-reference_code',
                params: {
                  reference_code: enrollment.reference_code,
                },
              })
            "
          />
        </v-col>
      </template>
      <template v-else-if="!form.$busy">
        <div class="my-enrollment-list__list__placeholder">
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
import { ENROLLMENT } from '@/utils/enums/LessonCardType'
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
      default: 'Listed Schedules'
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
    }
  },

  computed: {
    ...mapState({
      form: state => state.lessonEnrollment.listing,
      list: state => state.lessonEnrollment.list,
      meta: state => state.lessonEnrollment.listMeta
    }),

    landscape() {
      return LANDSCAPE
    },

    type() {
      return ENROLLMENT
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
        include: this.include,
        page: page || Math.min(this.meta.current_page + 1, this.meta.last_page),
        limit: this.limit,
        concat: false
      }

      await this.$store
        .dispatch('lessonEnrollment/getList', params)
        .then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          }
        })
    }
  }
}
</script>
<style scoped lang="scss">
.my-enrollment-list {
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
      margin: 40px auto;

      > * {
        font-style: italic;
      }
    }
  }
}
</style>

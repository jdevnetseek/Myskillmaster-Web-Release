<template>
  <div class="view-lesson-page">
    <div class="view-lesson-page__header screen-border">
      <Back class="view-lesson-page__header__back my-5" />
      <Searchbar
        class="view-lesson-page__header__search mt-4 mb-2"
        :has-icon="true"
      />
    </div>
    <template v-if="hasLesson">
      <LessonBanner
        class="view-lesson-page__banner"
        :images="lesson.cover_photo"
      >
        <template #actions>
          <ReportButton
            v-if="lesson.is_reportable"
            :report-route="reportRoute"
          />
        </template>
      </LessonBanner>
      <div class="view-lesson-page__border screen-border">
        <LessonDetails :lesson="lesson" class="mb-7" />
        <MasterDetails
          :has-rating="true"
          :master="lesson.master_profile"
          :lesson="lesson"
        />
      </div>
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * View Lesson page
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import { truncate } from '@/utils/Helpers'
import IMAGE from '@/utils/Image'
import Back from '@/components/global/Back'
import Searchbar from '@/components/global/Searchbar'
import LessonBanner from '@/components/lessons/common/LessonBanner'
import LessonDetails from '@/components/lessons/common/LessonDetails'
import MasterDetails from '@/components/masters/common/MasterDetails'
import ReportButton from '@/components/report/ReportButton'

export default {
  name: 'ViewLessonPage',
  components: {
    Back,
    Searchbar,
    LessonBanner,
    LessonDetails,
    MasterDetails,
    ReportButton
  },
  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    const title = this.lesson ? this.lesson.title : null
    const description = this.lesson
      ? truncate(this.lesson.description, 300)
      : null
    const image =
      this.lesson && this.lesson.cover_photo.length
        ? IMAGE.url(this.lesson.cover_photo[0])
        : null

    return {
      title: `${title} | `,
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          content: title
        },
        {
          hid: 'description',
          name: 'description',
          content: description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          content: description
        },
        {
          hid: 'og:image',
          name: 'og:image',
          content: image
        }
      ]
    }
  },

  computed: {
    ...mapState({
      form: state => state.lesson.lesson,
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    }),

    reportRoute() {
      return `/lessons/${this.lesson.slug}/report`
    }
  },

  mounted() {
    this.refetch()
  },

  methods: {
    refetch() {
      if (!this.hasLesson) {
        this.$parent.$fetch()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.view-lesson-page {
  margin-bottom: 25px;

  > * {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  &__header {
    &__back {
    }

    &__search {
      display: none;
    }
  }

  &__border {
  }
}

@media (max-width: map-get($grid-breakpoints, 'md')) {
  .view-lesson-page {
    &__header {
      &__back {
        display: none;
      }

      &__search {
        display: block;
      }
    }
  }
}
</style>

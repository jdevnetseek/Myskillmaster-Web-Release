<template>
  <div class="view-enrollment-page">
    <div class="view-enrollment-page__header screen-border">
      <Back class="view-enrollment-page__header__back my-5" />
    </div>
    <template v-if="hasLessonEnrollment">
      <LessonBanner
        class="view-enrollment-page__banner"
        :images="enrollment.lesson.cover_photo"
      >
        <template #actions>
          <ReportButton
            v-if="lesson.is_reportable"
            :report-route="reportRoute"
          />
        </template>
      </LessonBanner>
      <div class="view-enrollment-page__border screen-border">
        <EnrollmentDetails :enrollment="enrollment" class="mb-7" />
        <MasterDetails
          :has-rating="true"
          :master="enrollment.master_profile"
          :lesson="enrollment.lesson"
          header="Master"
        />
      </div>
    </template>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Past Enrollment
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import Back from '@/components/global/Back'
import LessonBanner from '@/components/lessons/common/LessonBanner'
import EnrollmentDetails from '@/components/lesson-enrollment/common/EnrollmentDetails'
import MasterDetails from '@/components/masters/common/MasterDetails'
import ReportButton from '@/components/report/ReportButton'

export default {
  name: 'PastEnrollmentPage',
  components: {
    Back,
    LessonBanner,
    EnrollmentDetails,
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
    return {
      title: 'Past Lesson | '
    }
  },

  computed: {
    ...mapState({
      enrollment: state => state.lessonEnrollment.lessonEnrollmentDetails
    }),

    ...mapGetters({
      hasLessonEnrollment: 'lessonEnrollment/hasEnrollmentDetails'
    }),

    lesson() {
      return this.enrollment?.lesson || {}
    },

    reportRoute() {
      return `/lessons/${this.lesson.slug}/report`
    }
  }
}
</script>
<style scoped lang="scss">
.view-enrollment-page {
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
  .view-enrollment-page {
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

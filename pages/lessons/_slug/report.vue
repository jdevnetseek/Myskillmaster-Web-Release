<template>
  <div class="report-form screen-border">
    <div class="report-form__border">
      <ReportForm v-if="!fetchState" :lesson="lesson" />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import ReportForm from '@/components/report/ReportForm'

export default {
  name: 'ReportPage',
  components: {
    ReportForm
  },

  props: {
    fetchState: {
      type: Boolean,
      default: false
    }
  },

  head() {
    return {
      title: 'Report lesson | '
    }
  },

  computed: {
    ...mapState({
      lesson: state => state.lesson.lessonDetails
    }),

    ...mapGetters({
      hasLesson: 'lesson/hasLessonDetails'
    })
  },

  watch: {
    fetchState: {
      handler(value) {
        if (!value) {
          this.validate()
        }
      },
      immediate: true
    }
  },

  methods: {
    validate() {
      if (this.hasLesson && !this.lesson.is_reportable) {
        this.$nuxt.error({
          statusCode: 404,
          message: 'Page not found'
        })
      }
    }
  }
}
</script>
<style scoped lang="scss">
.report-form {
  &__border {
    max-width: 770px;
    margin: 0 auto;
  }
}
</style>

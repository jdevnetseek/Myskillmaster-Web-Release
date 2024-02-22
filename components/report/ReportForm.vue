<template>
  <div>
    <div>
      <h5 class="mb-3">
        Report Lesson
      </h5>
      <p>Why do you want to report this lesson? You can choose more than 1 option.</p>
    </div>
    <ReportReasons v-model="form.reason_ids" />
    <ReportFileUpload v-model="form.attachments" />
    <v-btn
      color="primary"
      depressed
      block
      :disabled="isSubmitButtonDisabled || isLoading"
      :loading="isLoading"
      @click="submit"
    >
      Submit
    </v-btn>
  </div>
</template>
<script>
import { parseToFormData } from '@/utils/Helpers'
import ReportFileUpload from '@/components/report/ReportFileUpload'
import ReportReasons from '@/components/report/ReportReasons'
import SnackbarMixin from '@/utils/mixins/Snackbar'
export default {
  name: 'ReportForm',

  components: {
    ReportFileUpload,
    ReportReasons
  },

  mixins: [SnackbarMixin],

  props: {
    lesson: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isLoading: false,
      form: {
        reason_ids: [],
        attachments: []
      }
    }
  },

  computed: {
    isSubmitButtonDisabled() {
      return !this.form.reason_ids.length
    }
  },

  methods: {
    getFormData() {
      const images = this.form.attachments.filter(
        image => image.delete || image.file
      )
      const parsedData = JSON.parse(JSON.stringify(this.form))
      const formData = new FormData()

      parsedData.attachments = images
      parseToFormData(formData, parsedData)

      return formData
    },
    async submit() {
      this.isLoading = true
      try {
        await this.$axios.$post(`/lessons/${this.lesson.id}/report`, this.getFormData())
        this.showSnackbar('Lesson reported')
        this.$router.push({
          name: 'lessons-slug',
          params: {
            slug: this.lesson.slug
          }
        })
      } catch (err) {
        this.showSnackbar(
          'Error submitting report form',
          false
        )
      }
      this.isLoading = false
    }
  }
}
</script>

<template>
  <LessonForm>
    <p
      v-if="redirectFromMaster"
      slot="header-before"
      class="text-subtitle font-color-tertiary mb-0"
    >
      Step 2 of 2
    </p>
  </LessonForm>
</template>
<script>
/**
 * ==================================================================================
 * Add a lesson: Lesson form
 * ==================================================================================
 **/

import { mapState, mapGetters } from 'vuex'
import SnackbarMixin from '@/utils/mixins/Snackbar'
import LessonForm from '~/components/lessons/forms/LessonForm'

export default {
  components: {
    LessonForm
  },
  mixins: [SnackbarMixin],

  async fetch() {
    this.form.$clearErrors()

    await this.$store
      .dispatch('subscription/checkSubscriptionLimit')
      .then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(
            'Exceeded maximum no. of lessons, please check your subscription limit.',
            false
          )
        }
      })
  },
  head() {
    return {
      title: 'Add a lesson: Create | '
    }
  },

  computed: {
    ...mapState({
      form: state => state.subscription.subscription
    }),

    ...mapGetters({
      hasMasterProfile: 'user/hasMasterProfile'
    }),

    redirectFromMaster() {
      return !!this.$route.query.from
    }
  },

  created() {
    this.$store.commit('lesson/clearLessonDetails')
    this.validate()
  },

  methods: {
    validate() {
      if (!this.hasMasterProfile) {
        this.$router.replace({
          name: 'add-a-lesson'
        })
      }
    }
  }
}
</script>

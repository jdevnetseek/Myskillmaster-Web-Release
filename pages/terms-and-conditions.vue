<template>
  <div class="privacy-policy-page screen-border text-justify">
    <h3>Terms and Conditions</h3>
    <!-- eslint-disable vue/no-v-html -->
    <div v-if="!form.$busy && hasContent" v-html="sanitizedContent" />
    <!--eslint-enable-->
    <v-skeleton-loader
      v-else
      type="list-item-two-line, list-item-three-line, list-item-two-line, list-item-three-line"
    />
  </div>
</template>

<script>
/**
 * ==================================================================================
 * Terms page
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import CONTENT from '@/utils/Content'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  mixins: [SnackbarMixin],
  layout: 'empty',
  head() {
    return {
      title: 'Terms and Conditions | '
    }
  },
  computed: {
    ...mapState({
      form: state => state.terms.terms,
      terms: state => state.terms.termsDetails
    }),

    sanitizedContent() {
      return this.hasContent ? CONTENT.sanitize(this.terms.content) : ''
    },

    hasContent() {
      return !!(this.terms && this.terms.content)
    }
  },

  mounted() {
    this.fetchTerms()
  },

  methods: {
    async fetchTerms() {
      if (this.form.$busy) {
        return
      }

      this.form.$clearErrors()

      await this.$store.dispatch('terms/getTermsDetails').then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.privacy-policy-page {
  //
}
</style>

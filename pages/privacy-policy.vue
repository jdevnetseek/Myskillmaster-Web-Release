<template>
  <div class="privacy-policy-page screen-border text-justify">
    <h3>Privacy Policy</h3>
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
 * Privacy Policy page
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
      title: 'Privacy Policy | '
    }
  },
  computed: {
    ...mapState({
      form: state => state.privacyPolicy.privacyPolicy,
      privacyPolicy: state => state.privacyPolicy.privacyPolicyDetails
    }),

    sanitizedContent() {
      return this.hasContent ? CONTENT.sanitize(this.privacyPolicy.content) : ''
    },

    hasContent() {
      return !!(this.privacyPolicy && this.privacyPolicy.content)
    }
  },

  mounted() {
    this.fetchPrivacyPolicy()
  },

  methods: {
    async fetchPrivacyPolicy() {
      if (this.form.$busy) {
        return
      }

      this.form.$clearErrors()

      await this.$store
        .dispatch('privacyPolicy/getPrivacyPolicyDetails')
        .then(() => {
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

<template>
  <v-card class="privacy-policy-form">
    <v-card-title class="d-flex justify-space-between">
      <h6>Privacy Policy</h6>
      <v-btn
        text
        color="primary"
        class="v-size--small"
        :loading="form.$busy"
        :disabled="form.$busy"
        @click="submit"
      >
        Edit
      </v-btn>
    </v-card-title>
    <v-card-text>
      <ContentEditor v-model="form.content" :disabled="form.$busy" />
    </v-card-text>
  </v-card>
</template>
<script>
/**
 * ==================================================================================
 * Privacy Policy form
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import ContentEditor from '@/components/fields/ContentEditor'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ContentEditor
  },
  mixins: [SnackbarMixin],
  computed: {
    ...mapState({
      form: state => state.privacyPolicy.privacyPolicy,
      privacyPolicy: state => state.privacyPolicy.privacyPolicyDetails
    })
  },

  watch: {
    privacyPolicy() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.privacyPolicy) {
        this.form.content = this.privacyPolicy.content
      }
    },

    async submit() {
      if (this.form.$busy) {
        return
      }

      this.form.$clearErrors()

      await this.$store
        .dispatch('privacyPolicy/update', this.form.$data())
        .then(() => {
          if (this.form.$hasErrors()) {
            this.showSnackbar(this.form.$errorMessage, false)
          } else {
            this.showSnackbar('Privacy Policy updated successfully!')
          }
        })
    }
  }
}
</script>
<style scoped lang="scss">
.privacy-policy-form {
  width: 100%;
}
</style>
